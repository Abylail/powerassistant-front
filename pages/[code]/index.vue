<template>
  <div class="business-info">
    <business-widget :info="businessStore.getInfo"/>
  </div>
</template>

<script setup>
import {useBusinessStore} from "../../store/business";
import {useRoute} from "nuxt/app";
import BusinessWidget from "../../components/common/business/businessWidget";

const route = useRoute();

const businessStore = useBusinessStore();
await businessStore.fetchBusiness(route.params.code);

useSeoMeta({
  title: businessStore.getInfo?.title || "Power Assistant",
  ogTitle: businessStore.getInfo?.title || "Power Assistant",
  description: businessStore.getInfo?.description || "AI assistant",
  ogDescription: businessStore.getInfo?.description || "AI assistant",
})
</script>

<style lang="scss" scoped>
.business-info {
  padding-bottom: 4rem;
}
</style>