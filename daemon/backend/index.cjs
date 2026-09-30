/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/market/src/backend/install_command.ts"
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createInstallCommandClass = createInstallCommandClass;
const fs_extra_1 = __importDefault(__webpack_require__("fs-extra"));
/**
 * The `install` instance preset: wipe the instance directory and reinstall it
 * from a market package. The daemon core has no implementation of its own — the
 * preset exists only while this plugin is loaded.
 */
function createInstallCommandClass(ctx, QuickInstallTask) {
    const { Command: InstanceCommand, Instance } = ctx.instances;
    const $t = ctx.i18n.$t;
    return class MarketInstallCommand extends InstanceCommand {
        installTask;
        constructor() {
            super("MarketInstallCommand");
        }
        stopped(instance) {
            instance.asynchronousTask = undefined;
            instance.setLock(false);
            instance.status(Instance.STATUS_STOP);
        }
        async exec(instance, params) {
            if (instance.status() !== Instance.STATUS_STOP)
                return instance.failure(new Error($t("TXT_CODE_general_update.statusErr_notStop")));
            if (instance.asynchronousTask)
                return instance.failure(new Error($t("TXT_CODE_general_update.statusErr_otherProgress")));
            if (!params)
                throw new Error("MarketInstallCommand: No params");
            try {
                instance.setLock(true);
                instance.status(Instance.STATUS_BUSY);
                instance.println($t("TXT_CODE_1704ea49"), $t("TXT_CODE_cbc235ad"));
                if (instance.hasCwdPath()) {
                    await fs_extra_1.default.remove(instance.absoluteCwdPath());
                    await fs_extra_1.default.mkdirs(instance.absoluteCwdPath());
                }
                instance.println($t("TXT_CODE_1704ea49"), $t("TXT_CODE_906c5d6a"));
                if (params.dockerOptional && instance.config.processType === "docker") {
                    params.setupInfo.docker = {
                        ...params.setupInfo.docker,
                        ...params.dockerOptional
                    };
                    params.setupInfo.processType = "docker";
                }
                // "params" was already matched against the catalogue by the panel's
                // POST /api/market/install_instance, so no caller-supplied start
                // command can reach this point.
                this.installTask = new QuickInstallTask(instance.config.nickname, params.targetLink, params.setupInfo, instance);
                instance.asynchronousTask = this;
                instance.println($t("TXT_CODE_1704ea49"), $t("TXT_CODE_b9ca022b"));
                await this.installTask?.start();
                await this.installTask?.wait();
            }
            catch (err) {
                instance.println($t("TXT_CODE_general_update.update"), $t("TXT_CODE_general_update.error", { err }));
            }
            finally {
                this.stopped(instance);
            }
        }
        async stop(instance) {
            instance.println($t("TXT_CODE_general_update.update"), $t("TXT_CODE_general_update.killProcess"));
            this.stopped(instance);
            await this.installTask?.stop();
            this.installTask = undefined;
        }
    };
}


/***/ },

/***/ "./plugins/market/src/backend/quick_install.ts"
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createQuickInstallTaskClass = createQuickInstallTaskClass;
const fs_extra_1 = __importDefault(__webpack_require__("fs-extra"));
/** Market package configuration and legacy reinstall behavior. */
function createQuickInstallTaskClass(ctx) {
    const { InstallTask, fileManager } = ctx.instances;
    const $t = ctx.i18n.$t;
    return class QuickInstallTask extends InstallTask {
        static TYPE = "QuickInstallTask";
        async onStart() {
            if (this.instance.config.processType === "docker" &&
                this.buildParams?.processType !== "docker") {
                this.instance.println("ERROR", $t("TXT_CODE_f8145844"));
                await this.stop();
                return;
            }
            await super.onStart();
        }
        async installationConfig() {
            const files = fileManager(this.instance.instanceUuid);
            const bundledConfig = "mcsmanager-config.json";
            ctx.logger.info($t("TXT_CODE_e5ba712d"), this.instance.config.nickname);
            if (this.buildParams?.startCommand || !fs_extra_1.default.existsSync(files.toAbsolutePath(bundledConfig)))
                return this.buildParams || {};
            return JSON.parse(await files.readFile(bundledConfig));
        }
        updateFailed(error) {
            // Market templates historically report update failures in the console
            // while leaving the installed package available for manual configuration.
            this.instance.println("ERROR", `\n========================================
${$t("TXT_CODE_47d56d0d")}
${error.message}
========================================\n`);
        }
    };
}


/***/ },

/***/ "./plugins/market/src/i18n/index.ts"
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.localeMessages = void 0;
const de_DE_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/de_DE.json"));
const en_US_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/en_US.json"));
const es_ES_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/es_ES.json"));
const fr_FR_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/fr_FR.json"));
const ja_JP_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/ja_JP.json"));
const ko_KR_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/ko_KR.json"));
const pt_BR_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/pt_BR.json"));
const ru_RU_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/ru_RU.json"));
const th_TH_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/th_TH.json"));
const tr_TR_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/tr_TR.json"));
const zh_CN_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/zh_CN.json"));
const zh_TW_json_1 = __importDefault(__webpack_require__("./plugins/market/src/i18n/zh_TW.json"));
// The lines a package install prints into the instance console. Registered with
// the daemon's i18next instance at setup, so the daemon catalogue carries
// nothing market-specific.
exports.localeMessages = {
    de_de: de_DE_json_1.default,
    en_us: en_US_json_1.default,
    es_es: es_ES_json_1.default,
    fr_fr: fr_FR_json_1.default,
    ja_jp: ja_JP_json_1.default,
    ko_kr: ko_KR_json_1.default,
    pt_br: pt_BR_json_1.default,
    ru_ru: ru_RU_json_1.default,
    th_th: th_TH_json_1.default,
    tr_tr: tr_TR_json_1.default,
    zh_cn: zh_CN_json_1.default,
    zh_tw: zh_TW_json_1.default
};


/***/ },

/***/ "fs-extra"
(module) {

module.exports = require("fs-extra");

/***/ },

/***/ "./plugins/market/src/i18n/de_DE.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"Instanz -Update fehlgeschlagen! \\nGrund:","TXT_CODE_906c5d6a":"Löschung abgeschlossen!","TXT_CODE_b9ca022b":"Instanzdateien werden installiert, bitte warten Sie geduldig ...","TXT_CODE_cbc235ad":"Die vorhandenen Dateien der Instanz werden gelöscht. Bitte warten Sie geduldig ...","TXT_CODE_e5ba712d":"Build-Server als Standardpaket:","TXT_CODE_f8145844":"Diese Anwendungsvorlage kann nicht zur Neuinstallation verwendet werden. \\nMit Docker -Containern erstellte Instanzen können nicht als normale Vorlagen neu installiert werden. \\nBitte wählen Sie ein voreingestelltes Paket mit dem Docker -Label zur Neuinstallation aus. \\nWenn Sie andere Vorlagen installieren müssen, wenden Sie sich bitte an den Administrator, um die Containerisierungseinstellungen der Instanz manuell auszuschalten."}');

/***/ },

/***/ "./plugins/market/src/i18n/en_US.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"Instance update failed! Reason:","TXT_CODE_906c5d6a":"Deletion Completed!","TXT_CODE_b9ca022b":"Installing instance files, please wait patiently...","TXT_CODE_cbc235ad":"Clearing the existing files of the instance, please wait patiently...","TXT_CODE_e5ba712d":"Building the server as a preset package:","TXT_CODE_f8145844":"This application template cannot be used for reinstallation. Instances created using Docker containers cannot be reinstalled as normal templates. Please select a preset package with the Docker label for reinstallation. If you do need to install other templates, please contact the administrator to manually turn off the containerization settings of the instance."}');

/***/ },

/***/ "./plugins/market/src/i18n/es_ES.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"¡Falló la actualización de la instancia! \\nRazón:","TXT_CODE_906c5d6a":"Eliminación completada!","TXT_CODE_b9ca022b":"Instalando archivos de instancia, espere pacientemente...","TXT_CODE_cbc235ad":"Borrando los archivos existentes de la instancia, espere pacientemente...","TXT_CODE_e5ba712d":"Construyendo el servidor como paquete predeterminado:","TXT_CODE_f8145844":"Esta plantilla de aplicación no se puede utilizar para la reinstalación. \\nLas instancias creadas con contenedores Docker no se pueden reinstalar como plantillas normales. \\nSeleccione un paquete preestablecido con la etiqueta Docker para la reinstalación. \\nSi necesita instalar otras plantillas, comuníquese con el administrador para apagar manualmente la configuración de contenedorización de la instancia."}');

/***/ },

/***/ "./plugins/market/src/i18n/fr_FR.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"La mise à jour de l\'instance a échoué! \\nRaison:","TXT_CODE_906c5d6a":"Suppression terminée !","TXT_CODE_b9ca022b":"Installation des fichiers d\'instance, veuillez patienter patiemment...","TXT_CODE_cbc235ad":"Effacement des fichiers existants de l\'instance, veuillez patienter patiemment...","TXT_CODE_e5ba712d":"Construire le serveur comme package par défaut :","TXT_CODE_f8145844":"Ce modèle d\'application ne peut pas être utilisé pour la réinstallation. \\nLes instances créées à l\'aide de conteneurs Docker ne peuvent pas être réinstallées comme modèles normaux. \\nVeuillez sélectionner un package prédéfini avec l\'étiquette Docker pour la réinstallation. \\nSi vous avez besoin d\'installer d\'autres modèles, veuillez contacter l\'administrateur pour désactiver manuellement les paramètres de contenerisation de l\'instance."}');

/***/ },

/***/ "./plugins/market/src/i18n/ja_JP.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"インスタンスの更新に失敗しました！\\n理由：","TXT_CODE_906c5d6a":"削除が完了しました！","TXT_CODE_b9ca022b":"インスタンス ファイルをインストールしています。しばらくお待ちください...","TXT_CODE_cbc235ad":"インスタンスの既存のファイルをクリアしています。しばらくお待ちください...","TXT_CODE_e5ba712d":"サーバーをデフォルトのパッケージとして構築する:","TXT_CODE_f8145844":"このアプリケーションテンプレートは、再インストールに使用できません。 \\nDockerコンテナを使用して作成されたインスタンスは、通常のテンプレートとして再インストールすることはできません。\\n再インストールするために、Dockerラベル付きのプリセットパッケージを選択してください。\\n他のテンプレートをインストールする必要がある場合は、管理者に連絡して、インスタンスのコンテナ化設定を手動でオフにしてください。"}');

/***/ },

/***/ "./plugins/market/src/i18n/ko_KR.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"인스턴스 업데이트가 실패했습니다! \\n이유:","TXT_CODE_906c5d6a":"삭제 완료!","TXT_CODE_b9ca022b":"인스턴스 파일을 설치 중입니다. 잠시 기다려 주십시오...","TXT_CODE_cbc235ad":"인스턴스의 기존 파일을 지우는 중입니다. 잠시 기다려 주십시오...","TXT_CODE_e5ba712d":"기본 패키지로 서버 구축:","TXT_CODE_f8145844":"이 응용 프로그램 템플릿은 재설치에 사용할 수 없습니다. \\nDocker 컨테이너를 사용하여 생성 된 인스턴스는 일반 템플릿으로 다시 설치할 수 없습니다. \\n재설치를 위해 Docker 레이블이있는 사전 설정 패키지를 선택하십시오. \\n다른 템플릿을 설치 해야하는 경우 관리자에게 연락하여 인스턴스의 컨테이너화 설정을 수동으로 끄십시오."}');

/***/ },

/***/ "./plugins/market/src/i18n/pt_BR.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"A atualização da instância falhou! \\nRazão:","TXT_CODE_906c5d6a":"Exclusão Concluída!","TXT_CODE_b9ca022b":"Instalando arquivos de instância, por favor, aguarde pacientemente...","TXT_CODE_cbc235ad":"Limpando os arquivos existentes da instância, por favor, aguarde pacientemente...","TXT_CODE_e5ba712d":"Construindo o servidor como um pacote pré-definido:","TXT_CODE_f8145844":"Este modelo de aplicativo não pode ser usado para reinstalação. \\nInstâncias criadas usando recipientes do Docker não podem ser reinstaladas como modelos normais. \\nSelecione um pacote predefinido com o rótulo do Docker para reinstalação. \\nSe você precisar instalar outros modelos, entre em contato com o administrador para desativar manualmente as configurações de contêiner da instância."}');

/***/ },

/***/ "./plugins/market/src/i18n/ru_RU.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"Обновление экземпляра не удалось! \\nПричина:","TXT_CODE_906c5d6a":"Удаление завершено!","TXT_CODE_b9ca022b":"Установка файлов экземпляра, пожалуйста, подождите...","TXT_CODE_cbc235ad":"Очистка существующих файлов экземпляра, пожалуйста, подождите...","TXT_CODE_e5ba712d":"Сборка сервера как предустановленного пакета:","TXT_CODE_f8145844":"Этот шаблон приложения не может быть использован для переустановки. \\nЭкземпляры, созданные с использованием контейнеров Docker, не могут быть переустановлены как обычные шаблоны. \\nПожалуйста, выберите предустановленный пакет с меткой Docker для переустановки. \\nЕсли вам нужно установить другие шаблоны, пожалуйста, свяжитесь с администратором, чтобы вручную отключить настройки контейнеризации экземпляра."}');

/***/ },

/***/ "./plugins/market/src/i18n/th_TH.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"การอัปเดตอินสแตนซ์ล้มเหลว! \\nเหตุผล:","TXT_CODE_906c5d6a":"ลบเสร็จสมบูรณ์!","TXT_CODE_b9ca022b":"กำลังติดตั้งไฟล์อินสแตนซ์ โปรดรอสักครู่...","TXT_CODE_cbc235ad":"กำลังล้างไฟล์ที่มีอยู่ของอินสแตนซ์ กรุณารอสักครู่...","TXT_CODE_e5ba712d":"กำลังสร้างเซิร์ฟเวอร์เป็นแพ็คเกจที่ตั้งค่าไว้ล่วงหน้า:","TXT_CODE_f8145844":"เทมเพลตแอปพลิเคชันนี้ไม่สามารถใช้สำหรับการติดตั้งใหม่ \\nอินสแตนซ์ที่สร้างขึ้นโดยใช้คอนเทนเนอร์ Docker ไม่สามารถติดตั้งใหม่เป็นเทมเพลตปกติได้ \\nโปรดเลือกแพ็คเกจที่ตั้งไว้ล่วงหน้าพร้อมฉลาก Docker สำหรับการติดตั้งใหม่ \\nหากคุณต้องการติดตั้งเทมเพลตอื่น ๆ โปรดติดต่อผู้ดูแลระบบเพื่อปิดการตั้งค่าคอนเทนเนอร์ของอินสแตนซ์ด้วยตนเอง"}');

/***/ },

/***/ "./plugins/market/src/i18n/tr_TR.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"Örnek güncellemesi başarısız oldu! \\nSebep:","TXT_CODE_906c5d6a":"Silme İşlemi Tamamlandı!","TXT_CODE_b9ca022b":"Örnek dosyaları yükleniyor, lütfen sabırla bekleyin...","TXT_CODE_cbc235ad":"Örneğin mevcut dosyaları temizleniyor, lütfen sabırla bekleyin...","TXT_CODE_e5ba712d":"Sunucuyu önceden ayarlanmış bir paket olarak oluşturma:","TXT_CODE_f8145844":"Bu uygulama şablonu yeniden yükleme için kullanılamaz. \\nDocker kapları kullanılarak oluşturulan örnekler normal şablonlar olarak yeniden yüklenemez. \\nYeniden yükleme için Docker etiketine sahip önceden ayarlanmış bir paket seçin. \\nDiğer şablonları yüklemeniz gerekiyorsa, örneğin kapsayıcılık ayarlarını manuel olarak kapatmak için lütfen yöneticiyle iletişime geçin."}');

/***/ },

/***/ "./plugins/market/src/i18n/zh_CN.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"实例更新失败！原因：","TXT_CODE_906c5d6a":"删除完成！","TXT_CODE_b9ca022b":"正在安装实例文件，请耐心等待...","TXT_CODE_cbc235ad":"正在清空实例现有文件，请耐心等待...","TXT_CODE_e5ba712d":"正在以预设包的方式构建服务器：","TXT_CODE_f8145844":"无法使用此应用模板重新安装，使用 Docker 容器创建的实例无法重装为普通模板，请选择含 Docker 标签的预设包进行重装。如果你确实需要安装其他模板，请联系管理员手动关闭实例的容器化设置。"}');

/***/ },

/***/ "./plugins/market/src/i18n/zh_TW.json"
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"TXT_CODE_47d56d0d":"實例更新失敗！原因：","TXT_CODE_906c5d6a":"刪除完成！","TXT_CODE_b9ca022b":"正在安裝實例檔案，請耐心等待...","TXT_CODE_cbc235ad":"正在清空實例現有檔案，請耐心等待...","TXT_CODE_e5ba712d":"正在以預設套件的方式建置伺服器：","TXT_CODE_f8145844":"此應用模板不能用於重新安裝。使用 Docker 容器建立的實例不能作為普通模板重新安裝。請選擇帶有 Docker 標籤的預設包進行重新安裝。如果您確實需要安裝其他模板，請聯繫管理員手動關閉實例的容器化設定。"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inject = void 0;
exports.apply = apply;
const i18n_1 = __webpack_require__("./plugins/market/src/i18n/index.ts");
const install_command_1 = __webpack_require__("./plugins/market/src/backend/install_command.ts");
const quick_install_1 = __webpack_require__("./plugins/market/src/backend/quick_install.ts");
// Daemon side of the app market. It owns both ways a package reaches an
// instance: `quick_install` builds a brand-new instance around a package, and
// the `install` preset reinstalls an existing one. The daemon core keeps
// neither, so a daemon without this plugin simply cannot install packages.
exports.inject = ["i18n", "instances", "tasks", "presets"];
function apply(ctx) {
    ctx.i18n.define(i18n_1.localeMessages);
    const QuickInstallTask = (0, quick_install_1.createQuickInstallTaskClass)(ctx);
    const MarketInstallCommand = (0, install_command_1.createInstallCommandClass)(ctx, QuickInstallTask);
    const ADMIN_ROLE = 10;
    ctx.presets.register("install", () => new MarketInstallCommand());
    ctx.tasks.register("quick_install", {
        type: QuickInstallTask.TYPE,
        // The instance does not exist yet: the task creates it around the package.
        requiresInstance: false,
        requiredRole: ADMIN_ROLE,
        create: (_instance, parameter) => {
            const newInstanceName = String(parameter?.newInstanceName ?? "");
            const targetLink = String(parameter?.targetLink ?? "");
            if (!newInstanceName)
                throw new Error("Instance name is empty!");
            ctx.logger.info(`Quick install: Name: ${newInstanceName} | Download: ${targetLink}`);
            return new QuickInstallTask(newInstanceName, targetLink, parameter?.setupInfo);
        }
    });
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.cjs.map