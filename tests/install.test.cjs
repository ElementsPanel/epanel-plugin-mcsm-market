const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");
const { createHash } = require("node:crypto");
const { EventEmitter } = require("node:events");
const { Readable, PassThrough } = require("node:stream");
const { test } = require("node:test");

const workspace = path.resolve(__dirname, "..");
const root = path.resolve(workspace, "../..");
const panelRequire = Module.createRequire(path.join(root, "panel/package.json"));
const daemonRequire = Module.createRequire(path.join(root, "daemon/package.json"));
const frontendRequire = Module.createRequire(path.join(root, "frontend/package.json"));
const ts = panelRequire("typescript");
const vue = frontendRequire("vue");
const translate = (key) => key;
const logger = { info() {}, error() {} };

// Execute source in memory with network/process boundaries replaced. No build,
// HTTP server, Minecraft binary or installer is needed for these regressions.
function load(filename, overrides = {}, source) {
  filename = path.resolve(root, filename);
  const mod = new Module(filename, module);
  const localRequire = Module.createRequire(filename);
  mod.require = (id) => Object.hasOwn(overrides, id) ? overrides[id]
    : filename.startsWith(path.join(workspace, "daemon") + path.sep) && !id.startsWith(".")
    ? daemonRequire(id) : localRequire(id);
  mod._compile(
    ts.transpileModule(source ?? fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true
      },
      fileName: filename + ".ts"
    }).outputText,
    filename
  );
  return mod.exports;
}

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
const settle = () => new Promise((resolve) => setImmediate(resolve));
async function until(predicate) {
  for (let i = 0; i < 100; i++) {
    if (predicate()) return;
    await settle();
  }
  assert.fail("Operation did not settle");
}
function directory(t) {
  const parent = path.resolve(os.tmpdir());
  const cwd = fs.mkdtempSync(path.join(parent, "elements-minecraft-test-"));
  t.after(() => {
    assert.equal(path.dirname(cwd), parent);
    assert.ok(path.basename(cwd).startsWith("elements-minecraft-test-"));
    fs.rmSync(cwd, { recursive: true, force: true });
  });
  return cwd;
}

const catalog = load("panel/plugins/instance/src/minecraft.ts");
const javaCommands = load("common/src/java.ts");
const install = load("daemon/plugins/instance/src/backend/minecraft_install.ts", {
  "../../../../../common/src/java": javaCommands
});
const { AsyncTask, TaskCenter } = load(
  "daemon/plugins/instance/src/backend/service/async_task_core.ts",
  {
    "../runtime": { logger }
  }
);

function taskFixture(t, options = {}) {
  const cwd = directory(t);
  const bytes = Buffer.from("test download; never executed");
  const chmods = [];
  const fse = Module.createRequire(path.join(root, "daemon/package.json"))("fs-extra");
  const fixtureInstall = load("daemon/plugins/instance/src/backend/minecraft_install.ts", {
    "../../../../../common/src/java": javaCommands,
    "fs-extra": {
      ...fse,
      chmod: async (file, mode) => {
        chmods.push({ file, mode });
        await fse.chmod(file, mode);
      }
    }
  });
  const output = [],
    updates = [],
    unzips = [],
    downloads = [];
  const instance = {
    instanceUuid: "instance",
    config: { cwd, processType: "general", startCommand: "", updateCommand: "", stopCommand: "^c" },
    absoluteCwdPath() {
      return this.config.cwd;
    },
    status(value) {
      if (value != null) this.currentStatus = value;
      return this.currentStatus;
    },
    print(text) {
      output.push(String(text));
    },
    println(level, text) {
      output.push(`${level}: ${text}`);
    },
    resetConfigWithoutDocker() {
      this.config.startCommand = "";
      this.config.updateCommand = "";
    },
    parameters(config) {
      Object.assign(this.config, config);
    }
  };
  const ctx = {
    tasks: { AsyncTask },
    i18n: { $t: translate },
    logger,
    instances: {
      Instance: { STATUS_BUSY: 2, STATUS_STOP: 0 },
      Config: class {},
      Command: class {},
      UpdateAction: class extends AsyncTask {
        constructor(instance) {
          super();
          this.instance = instance;
        }
        async onStart() {
          updates.push(this.instance.config.updateCommand);
          await options.update?.(this.instance, updates.length);
          await this.stop();
        }
        async onStop() {}
        async onError() {}
      },
      fileManager: () => ({
        toAbsolutePath: (file) => path.join(cwd, file),
        readFile: (file) => fse.readFile(path.join(cwd, file), "utf8"),
        unzip: async (file) => {
          unzips.push(file);
          return options.unzip ? options.unzip(cwd) : true;
        }
      }),
      headers: () => ({}),
      subsystem: {
        createInstance: (config) => {
          Object.assign(instance.config, config, { cwd });
          return instance;
        }
      }
    }
  };
  const { createInstanceInstallTaskClass } = load(
    "daemon/plugins/instance/src/backend/install_task.ts",
    {
      axios: async (config) => {
        downloads.push(config);
        await options.download?.();
        return { data: options.stream || Readable.from(bytes), headers: {} };
      }
    }
  );
  ctx.instances.InstallTask = createInstanceInstallTaskClass(ctx, ctx.instances);
  const minecraftPlugin = load("daemon/plugins/instance/src/backend/minecraft_task.ts", {
    "./minecraft_install": {
      ...fixtureInstall,
      validateMinecraftInstall: (selection, url, translate) =>
        fixtureInstall.validateMinecraftInstall(
          selection,
          url,
          translate,
          options.platform ?? "linux",
          "x64"
        ),
      minecraftStartCommand: (cwd, selection, translate) =>
        fixtureInstall.minecraftStartCommand(cwd, selection, translate, options.platform ?? "linux")
    }
  });
  const Task = minecraftPlugin.createMinecraftInstallTaskClass(ctx);
  const create = (minecraft, config = {}) => {
    const task = new Task(
      "Test",
      "https://cdn.example/server/jar?signature=abc",
      {
        nickname: "Test",
        startCommand: "",
        updateCommand: "",
        cwd: "",
        type: "minecraft/java",
        ...config
      },
      minecraft
    );
    task.on("error", () => {});
    return task;
  };
  return {
    create,
    cwd,
    bytes,
    instance,
    output,
    updates,
    unzips,
    downloads,
    ctx,
    chmods,
    minecraftPlugin,
    createInstanceInstallTaskClass
  };
}

const paper = { server: "paper", version: "1.21.4", kind: "jar", javaPath: "/java path/bin/java" };

test("the instance plugin installs Minecraft before market loads and while market is unloaded", async (t) => {
  const daemonRequire = Module.createRequire(path.join(root, "daemon/package.json"));
  const { Context, Service } = daemonRequire("cordis");
  let downloadGate;
  const f = taskFixture(t, { download: async () => downloadGate?.promise });
  const ctx = new Context();
  t.after(() => ctx.stop());
  class Translations extends Service {
    messages = [];
    constructor(ctx) {
      super(ctx, "i18n", true);
    }
    define(locales) {
      return this.ctx.effect(() => {
        this.messages.push(locales.en_us);
        return () => this.messages.splice(this.messages.indexOf(locales.en_us), 1);
      });
    }
    $t = (key) => this.messages.find((messages) => messages[key])?.[key] || key;
  }
  ctx.plugin(Translations);
  const { FeaturesService, OverviewService } = load(
    "daemon/plugins/runtime/src/backend/registries.ts"
  );
  ctx.plugin(FeaturesService);
  ctx.plugin(OverviewService);
  ctx.set("settings", { config: {} });
  ctx.set("storage", {});
  ctx.set("transfer", {});
  ctx.set("protocol", {});
  ctx.set("files", { getFileManager: f.ctx.instances.fileManager });
  const registries = load("daemon/plugins/instance/src/backend/registries.ts", {
    "./service/async_task_core": { AsyncTask, TaskCenter }
  });
  const instancePlugin = load("daemon/plugins/instance/src/backend/index.ts", {
    "./tools/steam_cmd": { initSteamCmd() {} },
    "./service/version_adapter": { migrateConfig() {} },
    "./runtime": { setPluginContext() {} },
    "./service/router": { routerApp: { dispose() {} } },
    "./registries": registries,
    "../i18n": load("daemon/plugins/instance/src/i18n/index.ts"),
    "./install_task": { createInstanceInstallTaskClass: f.createInstanceInstallTaskClass },
    "./minecraft_task": f.minecraftPlugin,
    "./service/system_instance": {
      default: {
        ...f.ctx.instances.subsystem,
        loadInstances() {},
        getInstances: () => [],
        exit: async () => {}
      }
    },
    "./entity/instance/instance": { default: f.ctx.instances.Instance },
    "./entity/instance/Instance_config": { default: f.ctx.instances.Config },
    "./entity/commands/base/command": { default: f.ctx.instances.Command },
    "./service/instance_update_action": { InstanceUpdateAction: f.ctx.instances.UpdateAction },
    "./entity/commands/base/command_parser": { commandStringToArray: () => [] },
    "./entity/commands/dispatcher": { default: class {} },
    "./service/docker_service": { DockerManager: class {} },
    "./routers/Instance_router": {},
    "./routers/instance_event_router": { registerInstanceEvents: () => () => {} },
    "./routers/schedule_router": {},
    "./routers/environment_router": {},
    "./service/system_instance_control": { default: { dispose() {} } }
  });
  const instanceScope = ctx.plugin(instancePlugin);
  await ctx.start();
  await until(() => ctx.tasks?.get("minecraft_install"));
  const minecraft = ctx.tasks.get("minecraft_install");
  const parameters = {
    newInstanceName: "Independent Minecraft",
    targetLink: "https://cdn.example/server.jar",
    setupInfo: { type: "minecraft/java", startCommand: "", updateCommand: "" },
    minecraft: paper
  };
  assert.equal(ctx.features.has("minecraftInstall"), true);
  assert.equal(ctx.tasks.get("quick_install"), undefined);
  assert.equal(ctx.presets.entries().has("install"), false);
  const first = minecraft.create(undefined, parameters);
  await first.start();
  assert.equal(first.status(), AsyncTask.STATUS_STOP);
  assert.equal(first.type, "MinecraftInstallTask");
  assert.ok(first.taskId.startsWith("MinecraftInstallTask-"));
  assert.equal(fs.existsSync(path.join(f.cwd, "server.jar")), true);

  const marketPlugin = load(path.join(workspace, "daemon/src/backend/index.ts"), {
    "../i18n": load(path.join(workspace, "daemon/src/i18n/index.ts")),
    "./quick_install": load(path.join(workspace, "daemon/src/backend/quick_install.ts")),
    "./install_command": load(path.join(workspace, "daemon/src/backend/install_command.ts"))
  });
  const marketScope = ctx.plugin(marketPlugin);
  await until(() => ctx.tasks.get("quick_install"));
  assert.equal(ctx.presets.entries().has("install"), true);
  assert.equal(ctx.tasks.get("quick_install").type, "QuickInstallTask");
  assert.equal(ctx.tasks.get("minecraft_install"), minecraft);
  downloadGate = deferred();
  const active = minecraft.create(undefined, parameters);
  ctx.tasks.Center.addTask(active);
  await until(() => f.downloads.length === 2);
  await marketScope.dispose();
  assert.equal(ctx.tasks.get("quick_install"), undefined);
  assert.equal(ctx.presets.entries().has("install"), false);
  assert.equal(ctx.tasks.get("minecraft_install"), minecraft);
  assert.equal(ctx.features.has("minecraftInstall"), true);
  assert.equal(active.status(), AsyncTask.STATUS_RUNNING);
  assert.notEqual(
    ctx.i18n.$t("TXT_CODE_minecraft.hashMismatch"),
    "TXT_CODE_minecraft.hashMismatch"
  );
  assert.notEqual(ctx.i18n.$t("TXT_CODE_e166bc2f"), "TXT_CODE_e166bc2f");
  assert.equal(ctx.i18n.$t("TXT_CODE_cbc235ad"), "TXT_CODE_cbc235ad");
  downloadGate.resolve();
  await active.wait();
  await until(() => !f.instance.asynchronousTask);
  const after = minecraft.create(undefined, parameters);
  await after.start();
  assert.equal(after.status(), AsyncTask.STATUS_STOP);
  assert.equal(f.instance.config.startCommand, '"/java path/bin/java" -jar server.jar nogui');

  await instanceScope.dispose();
  assert.equal(ctx.features.has("minecraftInstall"), false);
  assert.equal(ctx.instances, undefined);
  assert.equal(ctx.tasks, undefined);
  assert.equal(ctx.i18n.$t("TXT_CODE_minecraft.hashMismatch"), "TXT_CODE_minecraft.hashMismatch");
});

test("market packages retain bundled config, explicit overrides and nonfatal update failures", async (t) => {
  const f = taskFixture(t, {
    update: async () => {
      throw new Error("template update failed");
    }
  });
  const { createQuickInstallTaskClass } = load(
    path.join(workspace, "daemon/src/backend/quick_install.ts")
  );
  const QuickInstallTask = createQuickInstallTaskClass(f.ctx);
  fs.writeFileSync(
    path.join(f.cwd, "mcsmanager-config.json"),
    JSON.stringify({
      startCommand: "bundled start",
      updateCommand: "bundled update"
    })
  );
  const bundled = new QuickInstallTask("Market", "https://cdn.example/package.zip", {});
  await bundled.start();
  assert.equal(bundled.type, "QuickInstallTask");
  assert.equal(bundled.status(), AsyncTask.STATUS_STOP);
  assert.equal(f.instance.config.startCommand, "bundled start");
  assert.deepEqual(f.unzips, ["mcsm_install_package.zip"]);
  assert.deepEqual(f.updates, ["bundled update"]);
  assert.ok(f.output.some((line) => line.includes("template update failed")));
  const explicit = new QuickInstallTask("Market", undefined, { startCommand: "explicit start" });
  await explicit.start();
  assert.equal(f.instance.config.startCommand, "explicit start");
  assert.equal(explicit.status(), AsyncTask.STATUS_STOP);
});

test("the market reinstall preset retains the current instance and releases its lock", async (t) => {
  const f = taskFixture(t);
  f.instance.setLock = (locked) => {
    f.instance.locked = locked;
  };
  f.instance.hasCwdPath = () => true;
  f.instance.status(0);
  fs.writeFileSync(path.join(f.cwd, "old-file.txt"), "old contents");
  const { createQuickInstallTaskClass } = load(
    path.join(workspace, "daemon/src/backend/quick_install.ts")
  );
  const QuickInstallTask = createQuickInstallTaskClass(f.ctx);
  const { createInstallCommandClass } = load(
    path.join(workspace, "daemon/src/backend/install_command.ts")
  );
  const Command = createInstallCommandClass(f.ctx, QuickInstallTask);
  await new Command().exec(f.instance, {
    targetLink: "https://cdn.example/package.zip",
    setupInfo: { startCommand: "new start", processType: "general" }
  });
  assert.equal(fs.existsSync(path.join(f.cwd, "old-file.txt")), false);
  assert.equal(f.instance.instanceUuid, "instance");
  assert.equal(f.instance.config.startCommand, "new start");
  assert.equal(f.instance.locked, false);
  assert.equal(f.instance.asynchronousTask, undefined);
  assert.equal(f.instance.status(), 0);
  assert.equal(f.unzips.length, 1);

  f.instance.config.processType = "docker";
  const incompatible = new QuickInstallTask(
    "Market",
    undefined,
    { processType: "general" },
    f.instance
  );
  await incompatible.start();
  assert.equal(f.instance.config.processType, "docker");
  assert.ok(f.output.some((line) => line.includes("TXT_CODE_f8145844")));
});

