<template>
  <report-widget v-if="widgetName === 'report'" :show="show" @update:show="s => show = s"/>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import ReportWidget from "./reportWidget";
import {useBusinessChatStore} from "../../../store/business/chat";

const chatStore = useBusinessChatStore();
const widget = computed(() => chatStore.getWidgetToCall);

const widgetName = ref("");
const show = computed({
  get: () => !!chatStore.getWidgetToCall,
  set: (val) => {
    if (val) return;
    chatStore.widgetClose();
  }
})

watch(() => chatStore.getWidgetToCall, () => {
  if (chatStore.getWidgetToCall?.name) widgetName.value = chatStore.getWidgetToCall.name;
}, {immediate: true})
</script>

<style scoped>

</style>