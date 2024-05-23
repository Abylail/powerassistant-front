<template>
  <header class="chat-header">
    <nuxt-link :to="`/${props.info.code}`">
      <div class="chat-header__avatar" v-if="props.info.avatar"/>
      <div class="chat-header__text">{{ props.info.title }}</div>
    </nuxt-link>
    <div class="chat-header__typing" :class="{'chat-header__typing--active': props.isTyping}">Печатает ...</div>
  </header>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
  isTyping: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  font-size: $fs--default;
  border-bottom: 2px solid $color--black;
  position: relative;

  &__text {
    color: $color--white;
    font-weight: bold;
    font-size: $fs--title;
  }

  &__typing {
    position: absolute;
    font-size: $fs--mini;
    color: $color--gray-dark;
    bottom: 0.3rem;
    opacity: 0;

    &--active {
      transition-delay: 2s;
      transition: .15s;
      opacity: 1;
    }
  }

}
</style>