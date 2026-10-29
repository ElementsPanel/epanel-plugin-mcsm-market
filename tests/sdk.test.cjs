const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const { JSDOM } = require("jsdom");
const { transformSync } = require("esbuild");

const dom = new JSDOM("<!doctype html><html><body></body></html>");
for (const key of ["window", "document", "Element", "HTMLElement", "SVGElement", "Node"])
  global[key] = dom.window[key];
const vue = require("vue");
const source = path.resolve(__dirname, "../panel/src");

function loader(overrides) {
  const cache = new Map();
  function load(filename) {
    filename = path.resolve(filename);
    if (cache.has(filename)) return cache.get(filename).exports;
    const mod = new Module(filename, module);
    cache.set(filename, mod);
    mod.require = (id) => {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (id.endsWith(".vue")) return {};
      if (id.startsWith(".")) return load(path.resolve(path.dirname(filename), `${id}.ts`));
      return require(id);
    };
    mod._compile(transformSync(fs.readFileSync(filename, "utf8"), {
      loader: "ts", format: "cjs", target: "es2022"
    }).code, filename);
    return mod.exports;
  }
  return (name) => load(path.join(source, name));
}

function fixture() {
  const users = vue.shallowRef({
    api: { userInfoApi: () => ({ execute: async () => ({
      value: { uuid: "alice", token: "alice-token", permission: 10 }
    }) }) }
  });
  const requests = [];
  let respond = async () => ({ data: { status: 200, data: true } });
  const instanceApi = { createAsyncTask: () => ({ task: true }) };
  const context = {
    get: (name) => name === "user" ? users.value : name === "instance" ? { api: instanceApi } : undefined
  };
  const load = loader({
    "@elements-panel/sdk": { ctx: context, usePluginService: (name) => context.get(name) },
    "./hooks/useMountComponent": {},
    axios: { create: () => ({ request: async (config) => {
      requests.push(config);
      return respond(config);
    } }) }
  });
  return { users, requests, instanceApi, load, respond: (callback) => { respond = callback; } };
}

test("panel requests obtain the current account token and preserve a deployment prefix", async () => {
  const f = fixture();
  const { useDefineApi } = f.load("request.ts");
  const call = useDefineApi({ url: "/api/market/settings", method: "PUT" })();
  const signal = new AbortController().signal;
  await call.execute({ data: { allowUsePreset: true }, signal });
  assert.equal(f.requests[0].url, "./api/market/settings");
  assert.equal(f.requests[0].headers.Authorization, "Bearer alice-token");
  assert.equal(f.requests[0].signal, signal);
  f.users.value = { api: { userInfoApi: () => ({ execute: async () => ({
    value: { uuid: "bob", token: "bob-token", permission: 1 }
  }) }) } };
  await call.execute();
  assert.equal(f.requests[1].headers.Authorization, "Bearer bob-token");
  assert.equal(f.load("host.ts").useAppStateStore().isAdmin.value, false);
  assert.deepEqual(f.load("host.ts").createAsyncTask(), { task: true });
});

test("an unavailable session prevents a write, and an unguarded panel omits authentication", async () => {
  const f = fixture();
  const call = f.load("request.ts").useDefineApi({ url: "/api/market/settings", method: "PUT" })();
  f.users.value = { api: { userInfoApi: () => ({ execute: async () => ({ value: undefined }) }) } };
  await assert.rejects(call.execute(), /session is unavailable/);
  assert.equal(f.requests.length, 0);
  assert.equal(call.isLoading.value, false);
  f.users.value = undefined;
  await call.execute();
  assert.equal(Object.hasOwn(f.requests[0].headers, "Authorization"), false);
});

test("overlapping requests retain the latest state and return each invocation's result", async () => {
  const f = fixture();
  const waiting = [];
  f.respond(() => new Promise((resolve) => waiting.push(resolve)));
  const call = f.load("request.ts").useDefineApi({ url: "/api/market/packages" })();
  const first = call.execute();
  const second = call.execute();
  await new Promise((resolve) => setImmediate(resolve));
  waiting[1]({ data: { status: 200, data: "new" } });
  assert.equal((await second).value, "new");
  waiting[0]({ data: { status: 200, data: "old" } });
  assert.equal((await first).value, "old");
  assert.equal(call.state.value, "new");
  f.respond(async () => ({ data: { status: 403, data: "Forbidden" } }));
  await assert.rejects(call.execute(), /Forbidden/);
  assert.equal(call.isReady.value, false);
  assert.equal(call.isLoading.value, false);
});

test("plugin dialogs inherit panel providers and finish their promises when unloaded", async () => {
  const app = vue.createApp({});
  const provider = Symbol("panel-provider");
  app.provide(provider, "shared value");
  const effects = new Set();
  const context = {
    vue: { app },
    effect(callback) {
      const cleanup = callback();
      const release = () => { if (effects.delete(release)) cleanup(); };
      effects.add(release);
      return release;
    }
  };
  const load = loader({ "@elements-panel/sdk": { ctx: context } });
  const { useDialog } = load("hooks/useDialog.ts");
  const { useMountComponent } = load("hooks/useMountComponent.ts");
  let inherited;
  const dialog = vue.defineComponent({
    props: ["destroyComponent"],
    setup(props, { expose }) {
      inherited = vue.inject(provider);
      expose(useDialog(props));
      return () => vue.h("div", "dialog");
    }
  });
  const mounted = useMountComponent().loadApp(dialog);
  const result = mounted.component.openDialog();
  assert.equal(inherited, "shared value");
  assert.equal(effects.size, 1);
  for (const release of effects) release();
  assert.equal(await result, undefined);
  assert.equal(effects.size, 0);
  assert.equal(document.body.children.length, 0);
  mounted.destroyFc();
});
