# @elementspanel/epanel-plugin-mcsm-market

上游 MCSM 的应用市场相关组件

插件 ID 为 `mcsm-market`，同时提供面板端（`panel/`）和守护进程端（`daemon/`）。

在 ElementsPanel 工作区中执行 `npm run build --workspace=@elementspanel/epanel-plugin-mcsm-market` 构建插件。发布包包含两端的插件清单和编译产物。

前端通过 `@elements-panel/sdk` 使用面板服务；通用界面组件和弹窗辅助代码保留在插件内，沿用 ElementsPanel 的 Apache-2.0 许可。构建脚本保留插件的 `apply` / `inject` 导出，并生成 `panel/frontend/assets/style.css`。
