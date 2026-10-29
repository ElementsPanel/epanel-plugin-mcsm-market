import { createVNode, render, type Component, type ComponentPublicInstance } from "vue";
import { getPluginContext } from "../context";

// Render with the panel application's context, including its Vuetify and i18n providers.
export function useMountComponent(data: object = {}) {
  const loadApp = <T = ComponentPublicInstance>(component: Component) => {
    const context = getPluginContext();
    const div = document.createElement("div");
    document.body.appendChild(div);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let release: (() => void) | undefined;
    let destroyed = false;
    const cleanup = () => {
      if (destroyed) return;
      destroyed = true;
      clearTimeout(timer);
      render(null, div);
      div.remove();
      release?.();
    };
    const destroy = (delay = 1000) => {
      if (delay <= 0) cleanup();
      else if (!timer && !destroyed) timer = setTimeout(cleanup, delay);
    };
    const vnode = createVNode(component, { ...data, destroyComponent: destroy });
    vnode.appContext = context.vue.app._context;
    try {
      render(vnode, div);
      release = context.effect(() => cleanup);
      return {
        component: (vnode.component?.exposed ?? vnode.component?.proxy) as T,
        destroyFc: cleanup
      };
    } catch (error) {
      cleanup();
      throw error;
    }
  };
  return { loadApp, load: <T>(component: Component) => loadApp<T>(component).component };
}
