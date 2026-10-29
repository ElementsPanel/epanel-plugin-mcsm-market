# @elementspanel/epanel-plugin-mcsm-market

上游 MCSM 的应用市场相关组件

插件 ID 为 `mcsm-market`，同时提供面板端（`panel/`）和守护进程端（`daemon/`）。

全部元数据以根 `package.json` 为准，包括版本、`elementspanel.id` 和 `elementspanel.dual`；两端 `plugin.json` 只定义入口。加载优先级、前端依赖和 CSS 路径记录在 `elementspanel.panel` 中，构建脚本同步更新其中的 `styles`。

完整构建逻辑直接位于本包 `package.json.scripts.build` 中，构建工具由本包的 `devDependencies` 提供。在插件目录执行 `npm run build`，或在 ElementsPanel 工作区执行 `npm run build --workspace=@elementspanel/epanel-plugin-mcsm-market`；`prepack` 在打包发布前调用同一脚本。发布包包含两端的插件清单和编译产物。

前端通过 `@elements-panel/sdk` 使用面板服务；通用界面组件和弹窗辅助代码保留在插件内，沿用 ElementsPanel 的 Apache-2.0 许可。构建脚本保留插件的 `apply` / `inject` 导出，并生成 `panel/frontend/assets/style.css`。
