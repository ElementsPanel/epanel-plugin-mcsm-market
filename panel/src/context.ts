import { ctx, type PanelFrontendPluginContext } from "@elements-panel/sdk";

let context = ctx;

export function setPluginContext(value: PanelFrontendPluginContext) {
  context = value;
}

export function getPluginContext() {
  return context;
}
