"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// daemon/src/backend/index.ts
var backend_exports = {};
__export(backend_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(backend_exports);

// daemon/src/i18n/de_DE.json
var de_DE_default = {
  TXT_CODE_47d56d0d: "Instanz -Update fehlgeschlagen! \nGrund:",
  TXT_CODE_906c5d6a: "L\xF6schung abgeschlossen!",
  TXT_CODE_b9ca022b: "Instanzdateien werden installiert, bitte warten Sie geduldig ...",
  TXT_CODE_cbc235ad: "Die vorhandenen Dateien der Instanz werden gel\xF6scht. Bitte warten Sie geduldig ...",
  TXT_CODE_e5ba712d: "Build-Server als Standardpaket:",
  TXT_CODE_f8145844: "Diese Anwendungsvorlage kann nicht zur Neuinstallation verwendet werden. \nMit Docker -Containern erstellte Instanzen k\xF6nnen nicht als normale Vorlagen neu installiert werden. \nBitte w\xE4hlen Sie ein voreingestelltes Paket mit dem Docker -Label zur Neuinstallation aus. \nWenn Sie andere Vorlagen installieren m\xFCssen, wenden Sie sich bitte an den Administrator, um die Containerisierungseinstellungen der Instanz manuell auszuschalten."
};

// daemon/src/i18n/en_US.json
var en_US_default = {
  TXT_CODE_47d56d0d: "Instance update failed! Reason:",
  TXT_CODE_906c5d6a: "Deletion Completed!",
  TXT_CODE_b9ca022b: "Installing instance files, please wait patiently...",
  TXT_CODE_cbc235ad: "Clearing the existing files of the instance, please wait patiently...",
  TXT_CODE_e5ba712d: "Building the server as a preset package:",
  TXT_CODE_f8145844: "This application template cannot be used for reinstallation. Instances created using Docker containers cannot be reinstalled as normal templates. Please select a preset package with the Docker label for reinstallation. If you do need to install other templates, please contact the administrator to manually turn off the containerization settings of the instance."
};

// daemon/src/i18n/es_ES.json
var es_ES_default = {
  TXT_CODE_47d56d0d: "\xA1Fall\xF3 la actualizaci\xF3n de la instancia! \nRaz\xF3n:",
  TXT_CODE_906c5d6a: "Eliminaci\xF3n completada!",
  TXT_CODE_b9ca022b: "Instalando archivos de instancia, espere pacientemente...",
  TXT_CODE_cbc235ad: "Borrando los archivos existentes de la instancia, espere pacientemente...",
  TXT_CODE_e5ba712d: "Construyendo el servidor como paquete predeterminado:",
  TXT_CODE_f8145844: "Esta plantilla de aplicaci\xF3n no se puede utilizar para la reinstalaci\xF3n. \nLas instancias creadas con contenedores Docker no se pueden reinstalar como plantillas normales. \nSeleccione un paquete preestablecido con la etiqueta Docker para la reinstalaci\xF3n. \nSi necesita instalar otras plantillas, comun\xEDquese con el administrador para apagar manualmente la configuraci\xF3n de contenedorizaci\xF3n de la instancia."
};

// daemon/src/i18n/fr_FR.json
var fr_FR_default = {
  TXT_CODE_47d56d0d: "La mise \xE0 jour de l'instance a \xE9chou\xE9! \nRaison:",
  TXT_CODE_906c5d6a: "Suppression termin\xE9e\xA0!",
  TXT_CODE_b9ca022b: "Installation des fichiers d'instance, veuillez patienter patiemment...",
  TXT_CODE_cbc235ad: "Effacement des fichiers existants de l'instance, veuillez patienter patiemment...",
  TXT_CODE_e5ba712d: "Construire le serveur comme package par d\xE9faut\xA0:",
  TXT_CODE_f8145844: "Ce mod\xE8le d'application ne peut pas \xEAtre utilis\xE9 pour la r\xE9installation. \nLes instances cr\xE9\xE9es \xE0 l'aide de conteneurs Docker ne peuvent pas \xEAtre r\xE9install\xE9es comme mod\xE8les normaux. \nVeuillez s\xE9lectionner un package pr\xE9d\xE9fini avec l'\xE9tiquette Docker pour la r\xE9installation. \nSi vous avez besoin d'installer d'autres mod\xE8les, veuillez contacter l'administrateur pour d\xE9sactiver manuellement les param\xE8tres de contenerisation de l'instance."
};

// daemon/src/i18n/ja_JP.json
var ja_JP_default = {
  TXT_CODE_47d56d0d: "\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u306E\u66F4\u65B0\u306B\u5931\u6557\u3057\u307E\u3057\u305F\uFF01\n\u7406\u7531\uFF1A",
  TXT_CODE_906c5d6a: "\u524A\u9664\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\uFF01",
  TXT_CODE_b9ca022b: "\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9 \u30D5\u30A1\u30A4\u30EB\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3044\u307E\u3059\u3002\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044...",
  TXT_CODE_cbc235ad: "\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u306E\u65E2\u5B58\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u30AF\u30EA\u30A2\u3057\u3066\u3044\u307E\u3059\u3002\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044...",
  TXT_CODE_e5ba712d: "\u30B5\u30FC\u30D0\u30FC\u3092\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30D1\u30C3\u30B1\u30FC\u30B8\u3068\u3057\u3066\u69CB\u7BC9\u3059\u308B:",
  TXT_CODE_f8145844: "\u3053\u306E\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u306F\u3001\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306B\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093\u3002 \nDocker\u30B3\u30F3\u30C6\u30CA\u3092\u4F7F\u7528\u3057\u3066\u4F5C\u6210\u3055\u308C\u305F\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u306F\u3001\u901A\u5E38\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3068\u3057\u3066\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002\n\u518D\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u305F\u3081\u306B\u3001Docker\u30E9\u30D9\u30EB\u4ED8\u304D\u306E\u30D7\u30EA\u30BB\u30C3\u30C8\u30D1\u30C3\u30B1\u30FC\u30B8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002\n\u4ED6\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u5FC5\u8981\u304C\u3042\u308B\u5834\u5408\u306F\u3001\u7BA1\u7406\u8005\u306B\u9023\u7D61\u3057\u3066\u3001\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u306E\u30B3\u30F3\u30C6\u30CA\u5316\u8A2D\u5B9A\u3092\u624B\u52D5\u3067\u30AA\u30D5\u306B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
};

// daemon/src/i18n/ko_KR.json
var ko_KR_default = {
  TXT_CODE_47d56d0d: "\uC778\uC2A4\uD134\uC2A4 \uC5C5\uB370\uC774\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4! \n\uC774\uC720:",
  TXT_CODE_906c5d6a: "\uC0AD\uC81C \uC644\uB8CC!",
  TXT_CODE_b9ca022b: "\uC778\uC2A4\uD134\uC2A4 \uD30C\uC77C\uC744 \uC124\uCE58 \uC911\uC785\uB2C8\uB2E4. \uC7A0\uC2DC \uAE30\uB2E4\uB824 \uC8FC\uC2ED\uC2DC\uC624...",
  TXT_CODE_cbc235ad: "\uC778\uC2A4\uD134\uC2A4\uC758 \uAE30\uC874 \uD30C\uC77C\uC744 \uC9C0\uC6B0\uB294 \uC911\uC785\uB2C8\uB2E4. \uC7A0\uC2DC \uAE30\uB2E4\uB824 \uC8FC\uC2ED\uC2DC\uC624...",
  TXT_CODE_e5ba712d: "\uAE30\uBCF8 \uD328\uD0A4\uC9C0\uB85C \uC11C\uBC84 \uAD6C\uCD95:",
  TXT_CODE_f8145844: "\uC774 \uC751\uC6A9 \uD504\uB85C\uADF8\uB7A8 \uD15C\uD50C\uB9BF\uC740 \uC7AC\uC124\uCE58\uC5D0 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \nDocker \uCEE8\uD14C\uC774\uB108\uB97C \uC0AC\uC6A9\uD558\uC5EC \uC0DD\uC131 \uB41C \uC778\uC2A4\uD134\uC2A4\uB294 \uC77C\uBC18 \uD15C\uD50C\uB9BF\uC73C\uB85C \uB2E4\uC2DC \uC124\uCE58\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \n\uC7AC\uC124\uCE58\uB97C \uC704\uD574 Docker \uB808\uC774\uBE14\uC774\uC788\uB294 \uC0AC\uC804 \uC124\uC815 \uD328\uD0A4\uC9C0\uB97C \uC120\uD0DD\uD558\uC2ED\uC2DC\uC624. \n\uB2E4\uB978 \uD15C\uD50C\uB9BF\uC744 \uC124\uCE58 \uD574\uC57C\uD558\uB294 \uACBD\uC6B0 \uAD00\uB9AC\uC790\uC5D0\uAC8C \uC5F0\uB77D\uD558\uC5EC \uC778\uC2A4\uD134\uC2A4\uC758 \uCEE8\uD14C\uC774\uB108\uD654 \uC124\uC815\uC744 \uC218\uB3D9\uC73C\uB85C \uB044\uC2ED\uC2DC\uC624."
};

// daemon/src/i18n/pt_BR.json
var pt_BR_default = {
  TXT_CODE_47d56d0d: "A atualiza\xE7\xE3o da inst\xE2ncia falhou! \nRaz\xE3o:",
  TXT_CODE_906c5d6a: "Exclus\xE3o Conclu\xEDda!",
  TXT_CODE_b9ca022b: "Instalando arquivos de inst\xE2ncia, por favor, aguarde pacientemente...",
  TXT_CODE_cbc235ad: "Limpando os arquivos existentes da inst\xE2ncia, por favor, aguarde pacientemente...",
  TXT_CODE_e5ba712d: "Construindo o servidor como um pacote pr\xE9-definido:",
  TXT_CODE_f8145844: "Este modelo de aplicativo n\xE3o pode ser usado para reinstala\xE7\xE3o. \nInst\xE2ncias criadas usando recipientes do Docker n\xE3o podem ser reinstaladas como modelos normais. \nSelecione um pacote predefinido com o r\xF3tulo do Docker para reinstala\xE7\xE3o. \nSe voc\xEA precisar instalar outros modelos, entre em contato com o administrador para desativar manualmente as configura\xE7\xF5es de cont\xEAiner da inst\xE2ncia."
};

// daemon/src/i18n/ru_RU.json
var ru_RU_default = {
  TXT_CODE_47d56d0d: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C! \n\u041F\u0440\u0438\u0447\u0438\u043D\u0430:",
  TXT_CODE_906c5d6a: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E!",
  TXT_CODE_b9ca022b: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435...",
  TXT_CODE_cbc235ad: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435...",
  TXT_CODE_e5ba712d: "\u0421\u0431\u043E\u0440\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043A\u0430\u043A \u043F\u0440\u0435\u0434\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u0430\u043A\u0435\u0442\u0430:",
  TXT_CODE_f8145844: "\u042D\u0442\u043E\u0442 \u0448\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438. \n\u042D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u044B, \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0435 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u043E\u0432 Docker, \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0435\u0440\u0435\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B. \n\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043F\u0430\u043A\u0435\u0442 \u0441 \u043C\u0435\u0442\u043A\u043E\u0439 Docker \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438. \n\u0415\u0441\u043B\u0438 \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u043C, \u0447\u0442\u043E\u0431\u044B \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u0430."
};

// daemon/src/i18n/th_TH.json
var th_TH_default = {
  TXT_CODE_47d56d0d: "\u0E01\u0E32\u0E23\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2D\u0E34\u0E19\u0E2A\u0E41\u0E15\u0E19\u0E0B\u0E4C\u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27! \n\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25:",
  TXT_CODE_906c5d6a: "\u0E25\u0E1A\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C!",
  TXT_CODE_b9ca022b: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E2D\u0E34\u0E19\u0E2A\u0E41\u0E15\u0E19\u0E0B\u0E4C \u0E42\u0E1B\u0E23\u0E14\u0E23\u0E2D\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48...",
  TXT_CODE_cbc235ad: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E25\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E2D\u0E34\u0E19\u0E2A\u0E41\u0E15\u0E19\u0E0B\u0E4C \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48...",
  TXT_CODE_e5ba712d: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1E\u0E47\u0E04\u0E40\u0E01\u0E08\u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E44\u0E27\u0E49\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32:",
  TXT_CODE_f8145844: "\u0E40\u0E17\u0E21\u0E40\u0E1E\u0E25\u0E15\u0E41\u0E2D\u0E1B\u0E1E\u0E25\u0E34\u0E40\u0E04\u0E0A\u0E31\u0E19\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E43\u0E0A\u0E49\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E43\u0E2B\u0E21\u0E48 \n\u0E2D\u0E34\u0E19\u0E2A\u0E41\u0E15\u0E19\u0E0B\u0E4C\u0E17\u0E35\u0E48\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E36\u0E49\u0E19\u0E42\u0E14\u0E22\u0E43\u0E0A\u0E49\u0E04\u0E2D\u0E19\u0E40\u0E17\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C Docker \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E17\u0E21\u0E40\u0E1E\u0E25\u0E15\u0E1B\u0E01\u0E15\u0E34\u0E44\u0E14\u0E49 \n\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E1E\u0E47\u0E04\u0E40\u0E01\u0E08\u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E44\u0E27\u0E49\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E09\u0E25\u0E32\u0E01 Docker \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E43\u0E2B\u0E21\u0E48 \n\u0E2B\u0E32\u0E01\u0E04\u0E38\u0E13\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E40\u0E17\u0E21\u0E40\u0E1E\u0E25\u0E15\u0E2D\u0E37\u0E48\u0E19 \u0E46 \u0E42\u0E1B\u0E23\u0E14\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E04\u0E2D\u0E19\u0E40\u0E17\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C\u0E02\u0E2D\u0E07\u0E2D\u0E34\u0E19\u0E2A\u0E41\u0E15\u0E19\u0E0B\u0E4C\u0E14\u0E49\u0E27\u0E22\u0E15\u0E19\u0E40\u0E2D\u0E07"
};

// daemon/src/i18n/tr_TR.json
var tr_TR_default = {
  TXT_CODE_47d56d0d: "\xD6rnek g\xFCncellemesi ba\u015Far\u0131s\u0131z oldu! \nSebep:",
  TXT_CODE_906c5d6a: "Silme \u0130\u015Flemi Tamamland\u0131!",
  TXT_CODE_b9ca022b: "\xD6rnek dosyalar\u0131 y\xFCkleniyor, l\xFCtfen sab\u0131rla bekleyin...",
  TXT_CODE_cbc235ad: "\xD6rne\u011Fin mevcut dosyalar\u0131 temizleniyor, l\xFCtfen sab\u0131rla bekleyin...",
  TXT_CODE_e5ba712d: "Sunucuyu \xF6nceden ayarlanm\u0131\u015F bir paket olarak olu\u015Fturma:",
  TXT_CODE_f8145844: "Bu uygulama \u015Fablonu yeniden y\xFCkleme i\xE7in kullan\u0131lamaz. \nDocker kaplar\u0131 kullan\u0131larak olu\u015Fturulan \xF6rnekler normal \u015Fablonlar olarak yeniden y\xFCklenemez. \nYeniden y\xFCkleme i\xE7in Docker etiketine sahip \xF6nceden ayarlanm\u0131\u015F bir paket se\xE7in. \nDi\u011Fer \u015Fablonlar\u0131 y\xFCklemeniz gerekiyorsa, \xF6rne\u011Fin kapsay\u0131c\u0131l\u0131k ayarlar\u0131n\u0131 manuel olarak kapatmak i\xE7in l\xFCtfen y\xF6neticiyle ileti\u015Fime ge\xE7in."
};

// daemon/src/i18n/zh_CN.json
var zh_CN_default = {
  TXT_CODE_47d56d0d: "\u5B9E\u4F8B\u66F4\u65B0\u5931\u8D25\uFF01\u539F\u56E0\uFF1A",
  TXT_CODE_906c5d6a: "\u5220\u9664\u5B8C\u6210\uFF01",
  TXT_CODE_b9ca022b: "\u6B63\u5728\u5B89\u88C5\u5B9E\u4F8B\u6587\u4EF6\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...",
  TXT_CODE_cbc235ad: "\u6B63\u5728\u6E05\u7A7A\u5B9E\u4F8B\u73B0\u6709\u6587\u4EF6\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...",
  TXT_CODE_e5ba712d: "\u6B63\u5728\u4EE5\u9884\u8BBE\u5305\u7684\u65B9\u5F0F\u6784\u5EFA\u670D\u52A1\u5668\uFF1A",
  TXT_CODE_f8145844: "\u65E0\u6CD5\u4F7F\u7528\u6B64\u5E94\u7528\u6A21\u677F\u91CD\u65B0\u5B89\u88C5\uFF0C\u4F7F\u7528 Docker \u5BB9\u5668\u521B\u5EFA\u7684\u5B9E\u4F8B\u65E0\u6CD5\u91CD\u88C5\u4E3A\u666E\u901A\u6A21\u677F\uFF0C\u8BF7\u9009\u62E9\u542B Docker \u6807\u7B7E\u7684\u9884\u8BBE\u5305\u8FDB\u884C\u91CD\u88C5\u3002\u5982\u679C\u4F60\u786E\u5B9E\u9700\u8981\u5B89\u88C5\u5176\u4ED6\u6A21\u677F\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u624B\u52A8\u5173\u95ED\u5B9E\u4F8B\u7684\u5BB9\u5668\u5316\u8BBE\u7F6E\u3002"
};

// daemon/src/i18n/zh_TW.json
var zh_TW_default = {
  TXT_CODE_47d56d0d: "\u5BE6\u4F8B\u66F4\u65B0\u5931\u6557\uFF01\u539F\u56E0\uFF1A",
  TXT_CODE_906c5d6a: "\u522A\u9664\u5B8C\u6210\uFF01",
  TXT_CODE_b9ca022b: "\u6B63\u5728\u5B89\u88DD\u5BE6\u4F8B\u6A94\u6848\uFF0C\u8ACB\u8010\u5FC3\u7B49\u5F85...",
  TXT_CODE_cbc235ad: "\u6B63\u5728\u6E05\u7A7A\u5BE6\u4F8B\u73FE\u6709\u6A94\u6848\uFF0C\u8ACB\u8010\u5FC3\u7B49\u5F85...",
  TXT_CODE_e5ba712d: "\u6B63\u5728\u4EE5\u9810\u8A2D\u5957\u4EF6\u7684\u65B9\u5F0F\u5EFA\u7F6E\u4F3A\u670D\u5668\uFF1A",
  TXT_CODE_f8145844: "\u6B64\u61C9\u7528\u6A21\u677F\u4E0D\u80FD\u7528\u65BC\u91CD\u65B0\u5B89\u88DD\u3002\u4F7F\u7528 Docker \u5BB9\u5668\u5EFA\u7ACB\u7684\u5BE6\u4F8B\u4E0D\u80FD\u4F5C\u70BA\u666E\u901A\u6A21\u677F\u91CD\u65B0\u5B89\u88DD\u3002\u8ACB\u9078\u64C7\u5E36\u6709 Docker \u6A19\u7C64\u7684\u9810\u8A2D\u5305\u9032\u884C\u91CD\u65B0\u5B89\u88DD\u3002\u5982\u679C\u60A8\u78BA\u5BE6\u9700\u8981\u5B89\u88DD\u5176\u4ED6\u6A21\u677F\uFF0C\u8ACB\u806F\u7E6B\u7BA1\u7406\u54E1\u624B\u52D5\u95DC\u9589\u5BE6\u4F8B\u7684\u5BB9\u5668\u5316\u8A2D\u5B9A\u3002"
};

// daemon/src/i18n/index.ts
var localeMessages = {
  de_de: de_DE_default,
  en_us: en_US_default,
  es_es: es_ES_default,
  fr_fr: fr_FR_default,
  ja_jp: ja_JP_default,
  ko_kr: ko_KR_default,
  pt_br: pt_BR_default,
  ru_ru: ru_RU_default,
  th_th: th_TH_default,
  tr_tr: tr_TR_default,
  zh_cn: zh_CN_default,
  zh_tw: zh_TW_default
};

// daemon/src/backend/install_command.ts
var import_fs_extra = __toESM(require("fs-extra"));
function createInstallCommandClass(ctx, QuickInstallTask) {
  const { Command: InstanceCommand, Instance } = ctx.instances;
  const $t = ctx.i18n.$t;
  return class MarketInstallCommand extends InstanceCommand {
    installTask;
    constructor() {
      super("MarketInstallCommand");
    }
    stopped(instance) {
      instance.asynchronousTask = void 0;
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
          await import_fs_extra.default.remove(instance.absoluteCwdPath());
          await import_fs_extra.default.mkdirs(instance.absoluteCwdPath());
        }
        instance.println($t("TXT_CODE_1704ea49"), $t("TXT_CODE_906c5d6a"));
        if (params.dockerOptional && instance.config.processType === "docker") {
          params.setupInfo.docker = {
            ...params.setupInfo.docker,
            ...params.dockerOptional
          };
          params.setupInfo.processType = "docker";
        }
        this.installTask = new QuickInstallTask(
          instance.config.nickname,
          params.targetLink,
          params.setupInfo,
          instance
        );
        instance.asynchronousTask = this;
        instance.println($t("TXT_CODE_1704ea49"), $t("TXT_CODE_b9ca022b"));
        await this.installTask?.start();
        await this.installTask?.wait();
      } catch (err) {
        instance.println(
          $t("TXT_CODE_general_update.update"),
          $t("TXT_CODE_general_update.error", { err })
        );
      } finally {
        this.stopped(instance);
      }
    }
    async stop(instance) {
      instance.println(
        $t("TXT_CODE_general_update.update"),
        $t("TXT_CODE_general_update.killProcess")
      );
      this.stopped(instance);
      await this.installTask?.stop();
      this.installTask = void 0;
    }
  };
}

// daemon/src/backend/quick_install.ts
var import_fs_extra2 = __toESM(require("fs-extra"));
function createQuickInstallTaskClass(ctx) {
  const { InstallTask, fileManager } = ctx.instances;
  const $t = ctx.i18n.$t;
  return class QuickInstallTask extends InstallTask {
    static TYPE = "QuickInstallTask";
    async onStart() {
      if (this.instance.config.processType === "docker" && this.buildParams?.processType !== "docker") {
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
      if (this.buildParams?.startCommand || !import_fs_extra2.default.existsSync(files.toAbsolutePath(bundledConfig)))
        return this.buildParams || {};
      return JSON.parse(await files.readFile(bundledConfig));
    }
    updateFailed(error) {
      this.instance.println(
        "ERROR",
        `
========================================
${$t("TXT_CODE_47d56d0d")}
${error.message}
========================================
`
      );
    }
  };
}

// daemon/src/backend/index.ts
var inject = ["i18n", "instances", "tasks", "presets"];
function apply(ctx) {
  ctx.i18n.define(localeMessages);
  const QuickInstallTask = createQuickInstallTaskClass(ctx);
  const MarketInstallCommand = createInstallCommandClass(ctx, QuickInstallTask);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apply,
  inject
});
