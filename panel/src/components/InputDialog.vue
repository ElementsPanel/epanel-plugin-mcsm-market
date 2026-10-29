<script setup lang="ts">
import { ref } from "vue";
import { VTextField } from "vuetify/components";
import AppDialog from "./AppDialog.vue";
import { useDialog } from "../hooks/useDialog";

const props = defineProps<{ title: string; destroyComponent?: (delay?: number) => void }>();
const value = ref("");
const { isVisible, openDialog, submit, cancel } = useDialog<string>(props);
defineExpose({ openDialog });
</script>

<template>
  <AppDialog v-model:open="isVisible" :title="title" compact @ok="submit(value)" @cancel="cancel">
    <VTextField v-model="value" autofocus hide-details @keyup.enter="submit(value)" />
  </AppDialog>
</template>
