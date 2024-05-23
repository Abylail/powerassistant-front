<template>
  <div class="base-scroll-pagination" :ref="el => scrollComponent = el">
    <slot/>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";

const emits = defineEmits(["paginate"])

const scrollComponent = ref(null);
const handleScroll = (e) => setTimeout(() => {
  let element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    emits("paginate")
  }
})

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style scoped>

</style>