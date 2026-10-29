import { usePluginService } from "@elements-panel/sdk";
import { computed, ref } from "vue";
import InputDialog from "./components/InputDialog.vue";
import { getPluginContext } from "./context";
import { useMountComponent } from "./hooks/useMountComponent";
import { useDefineApi } from "./request";
import type { ComputedNodeInfo } from "./types";

export const t = (...args: any[]): string => getPluginContext().i18n.translate(...args);
export const getCurrentLang = (): string => getPluginContext().i18n.getCurrentLang();

export const router = {
  get currentRoute() {
    return getPluginContext().vue.router.currentRoute;
  },
  push: (...args: any[]) => getPluginContext().vue.router.push(...args)
};

const identity = ref<{ permission?: number; token?: string }>();
const isAdmin = computed(() => !usePluginService("user") || identity.value?.permission === 10);

export function useAppStateStore() {
  return { isAdmin };
}

export async function getUserInfo(signal?: AbortSignal) {
  const user = getPluginContext().get("user");
  if (!user) {
    identity.value = undefined;
    return undefined;
  }
  try {
    const info = (await user.api.userInfoApi().execute({ signal })).value;
    if (!info?.uuid || !info.token) throw new Error("User session is unavailable.");
    identity.value = info;
    return info;
  } catch (error) {
    identity.value = undefined;
    throw error;
  }
}

function instance() {
  const service = getPluginContext().get("instance");
  if (!service) throw new Error('Panel frontend plugin "instance" is not loaded.');
  return service;
}

export const createAsyncTask = () => instance().api.createAsyncTask();
export const getDockerHubImagePlatforms = () => instance().api.getDockerHubImagePlatforms();

export async function openNodeSelectDialog(targetPlatforms?: string[]) {
  const dialog = useMountComponent({ targetPlatforms }).load<any>(
    instance().components.NodeSelectDialog
  );
  return dialog.openDialog() as Promise<ComputedNodeInfo | undefined>;
}

export const uploadFile = useDefineApi<{ data: FormData }, string>({
  method: "POST",
  url: "/api/overview/upload_assets"
});

export function useAppToolsStore() {
  return {
    openInputDialog: (title: string) =>
      useMountComponent({ title }).load<InstanceType<typeof InputDialog>>(InputDialog).openDialog()
  };
}
