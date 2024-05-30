<template>
  <div class="default-layout">
    <main class="default-layout__main">
      <slot/>
      <a class="default-layout__logo" href="/me">Power Assistant AI</a>
    </main>
  </div>

</template>

<script setup>
useSeoMeta({
  title: "Power Assistant",
  ogTitle: "Power Assistant",
  description: "ИИ чат для вашего бизнеса за минуту",
  ogDescription: "ИИ чат для вашего бизнеса за минуту",
})
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;

  &__main {
    position: relative;
    z-index: 1;
    height: 100%;
  }

  &__logo {
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 0;
    color: $color--black;
    font-size: $fs--title;
    font-weight: bold;
    text-align: center;
    padding: 2rem;
    cursor: pointer;
  }

}
</style>