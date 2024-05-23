<template>
  <div
      class="message-content"
      v-html="message"
  />
</template>

<script setup>
import {computed} from "vue";
import {marked} from "marked";
import DOMPurify from "dompurify";

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const message = computed(() => DOMPurify.sanitize(marked(props.content)))
</script>

<style lang="scss" scoped>
.message-content {
  background-color: $color--dark;
  color: $color--white;
  padding: 1rem;
  max-width: 75%;
  border-radius: 1rem;

  ::v-deep {
    a {
      color: $color--blue;
      font-weight: bold;
    }
  }
}
</style>