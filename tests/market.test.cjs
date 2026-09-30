const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const workspace = path.resolve(__dirname, '..');
const host = path.resolve(workspace, '../..');
const hostRequire = Module.createRequire(path.join(host, 'panel/package.json'));
const ts = hostRequire('typescript');

// Exercise source against host contracts without a build, server or network.
function load(filename, overrides = {}) {
  const mod = new Module(filename, module);
  mod.require = id => {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id.endsWith('.vue')) return { name: path.basename(id) };
    if (id.startsWith('.')) {
      const target = path.resolve(path.dirname(filename), id);
      if (fs.existsSync(target + '.ts')) return load(target + '.ts', overrides);
      if (fs.existsSync(path.join(target, 'index.ts'))) return load(path.join(target, 'index.ts'), overrides);
      return require(target);
    }
    return hostRequire(id);
  };
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
  }).outputText, filename);
  return mod.exports;
}
const source = relative => path.join(workspace, relative);

for (const order of [['app', 'plugins'], ['plugins', 'app']]) {
  test(`settings migrate independently in ${order.join(' / ')} load order`, async () => {
    const legacy = { presetPackAddr: 'https://example.test/templates.json', allowUsePreset: true, pluginMarketAddr: 'https://plugins.test' };
    const records = new Map([['MarketSettings', legacy]]);
    const storage = {
      async load(category) { return records.get(category) ?? null; },
      async store(category, id, data) { records.set(category, { ...data }); }
    };
    const context = { storage: { getStorage: () => storage }, logger: { info() {}, warn() {} } };
    const locations = {
      app: source('panel/src/backend/service/market_settings.ts'),
      plugins: path.join(host, 'panel/plugins/market/src/backend/service/market_settings.ts')
    };
    for (const name of order) await load(locations[name]).initMarketSettings(context);
    assert.deepEqual(records.get('McsmMarketSettings'), { presetPackAddr: legacy.presetPackAddr, allowUsePreset: true });
    assert.deepEqual(records.get('PluginMarketSettings'), { pluginMarketAddr: legacy.pluginMarketAddr });
    assert.equal(records.get('MarketSettings'), legacy);
    records.set('McsmMarketSettings', { presetPackAddr: 'https://new.test', allowUsePreset: false });
    const restarted = load(locations.app);
    await restarted.initMarketSettings(context);
    assert.equal(restarted.marketSettings().presetPackAddr, 'https://new.test');
  });
}

test('application frontend owns only app routes and preserves its service contract', () => {
  const routes = [], desktop = [], actions = [], services = [];
  const plugin = load(source('panel/src/frontend.ts'), {
    '@/lang/i18n': { t: key => key },
    '@/stores/useAppStateStore': { useAppStateStore: () => ({ isAdmin: { value: true } }) },
    './api': {}, './hooks/useMarketPackages': { useMarketPackages() {} },
    './market-dialog': { openMarketDialog() {} },
    './runtime': { getAllowUsePreset: () => false, refreshMarketPermission() {} }
  });
  plugin.apply({
    i18n: { define() {} }, set: (name, value) => services.push([name, value]),
    routes: { add: route => routes.push(route.path) },
    desktop: { app: value => desktop.push(value) },
    actions: { terminal: value => actions.push(value) }, on() {}
  });
  assert.deepEqual(routes, ['/quickstart/minecraft', '/market', '/market/editor']);
  assert.deepEqual(desktop.map(item => item.id), ['market']);
  assert.equal(actions[0].id, 'market-reinstall');
  assert.equal(services[0][0], 'market');
  assert.equal(typeof services[0][1].openMarketDialog, 'function');
});

test('reinstall uses the trusted catalogue and keeps caller permissions', async () => {
  const routes = new Map();
  const settings = { allowUsePreset: false };
  const trusted = { title: 'Pack', description: 'Official', command: 'trusted-command' };
  const requests = [];
  const middleware = async () => {};
  const plugin = load(source('panel/src/backend/index.ts'), {
    './service/market_settings': { initMarketSettings: async () => {}, marketSettings: () => settings, saveMarketSettings: async () => {} },
    './service/market_service': { getAppMarketList: async () => ({ packages: [trusted] }), clearMarketCache: async () => {} }
  });
  await plugin.apply({
    i18n: { define() {}, $t: key => key }, logger: { warn() {} },
    roles: { USER: 1, ADMIN: 10 }, identity: { of: ctx => ({ elevated: ctx.admin, role: ctx.admin ? 10 : 1 }) },
    middleware: { permission: () => middleware, validator: () => middleware, speedLimit: () => middleware, instanceAccess: middleware },
    koa: { router: () => Object.fromEntries(['get', 'post', 'put'].map(method => [method, (route, ...handlers) => routes.set(method + route, handlers)])) },
    settingsForm: { declare() {} },
    remote: { services: { getInstance: id => id }, Request: class { async request(...args) { requests.push(args); } } }
  });
  assert.deepEqual([...routes.keys()], ['get/config', 'get/packages', 'post/install_instance', 'put/settings']);
  const install = routes.get('post/install_instance').at(-1);
  const request = { admin: false, query: { daemonId: 'node', uuid: 'instance' }, request: { body: { title: 'Pack', description: 'Official', command: 'untrusted' } } };
  await install(request);
  assert.equal(request.status, 403);
  assert.equal(requests.length, 0);
  request.admin = true;
  await install(request);
  assert.equal(requests[0][1].parameter, trusted);
  assert.equal(requests[0][1].role, 10);
});

test('both sides are discoverable as one external package', () => {
  const discovery = load(path.join(host, 'common/src/plugin_manifest.ts'));
  for (const side of ['panel', 'daemon']) {
    const roots = discovery.discoverExternalPluginRoots(host, side);
    const plugins = discovery.discoverPluginsFromRoots(roots, { entryFields: ['backend'] });
    const plugin = plugins.find(item => item.manifest.id === 'epanel-plugin-mcsm-market');
    assert.ok(plugin, `${side} must be discovered`);
    assert.equal(plugin.manifest.backend, 'src/backend/index.ts');
  }
});

test("market reset clears platform/language filters and returns all languages", () => {
  const { useMarketPackages } = load(source("panel/src/hooks/useMarketPackages.ts"), {
    vue: Module.createRequire(path.join(host, "frontend/package.json"))("vue"),
    "@/lang/i18n": { t: key => key, getCurrentLang: () => "zh_cn" },
    "@/tools/validator": {},
    "@/types/const": { SEARCH_ALL_KEY: "ALL" },
    "@/tools/vuetifyModal": {},
    "../api": { quickInstallListAddr: () => ({}) }
  });
  const market = useMarketPackages();
  market.packages.value = ["zh_cn", "en_us", "ja_jp"].map((language) => ({
    language,
    gameType: "test",
    platform: "linux"
  }));
  market.searchForm.platform = "windows";
  market.handleReset();
  assert.equal(market.searchForm.platform, "ALL");
  assert.equal(market.getFilteredPackages().length, 3);
});

