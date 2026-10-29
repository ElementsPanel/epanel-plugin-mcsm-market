import { defineComponent, h, ref } from "vue";
import { VSnackbar } from "vuetify/components";
import AppDialog from "./components/AppDialog.vue";
import { useMountComponent } from "./hooks/useMountComponent";

function toast(color: string, content: unknown) {
  const open = ref(true);
  const host = useMountComponent().loadApp(defineComponent({
    setup: () => () => h(VSnackbar, {
      modelValue: open.value,
      "onUpdate:modelValue": (value: boolean) => { open.value = value; },
      color,
      timeout: 5000,
      location: "top center",
      onAfterLeave: () => host.destroyFc()
    }, { default: () => String(content ?? "") })
  }));
  return { close: () => { open.value = false; } };
}

export const message = {
  info: (content: unknown) => toast("info", content),
  success: (content: unknown) => toast("success", content),
  warning: (content: unknown) => toast("warning", content),
  error: (content: unknown) => toast("error", content)
};

export function reportErrorMsg(error: unknown) {
  message.error(error instanceof Error ? error.message : String(error ?? ""));
}

export const notifyDesktopError = reportErrorMsg;

export const Modal = {
  error: ({ title, content }: { title: string; content: string }) => {
    const open = ref(true);
    const host = useMountComponent().loadApp(defineComponent({
      setup: () => () => h(AppDialog, {
        open: open.value,
        "onUpdate:open": (value: boolean) => { open.value = value; },
        title,
        compact: true,
        showCancel: false,
        onOk: () => { open.value = false; },
        onAfterClose: () => host.destroyFc()
      }, { default: () => content })
    }));
    return { destroy: () => host.destroyFc() };
  }
};
