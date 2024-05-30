<template>
  <a
      class="link-view"
      :href="props.link.link"
      :style="{backgroundImage}"
      target="_blank"
  >
    <div class="link-view__info">
      <span>{{ props.link.name }}</span>
      <base-icon class="link-view__icon" name="mdi-link"/>
    </div>
  </a>
</template>

<script setup>
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";
import {getImageUrl} from "~/helpers/methods";

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
})

const backgroundImage = computed(() => props.link.imageUrl ? `url(${getImageUrl(props.link.imageUrl)})` : null);
</script>

<style lang="scss" scoped>
.link-view {
  display: flex;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  margin: .5rem 0;
  padding: .5rem 1rem;
  aspect-ratio: 4/1;
  border-radius: .5rem;
  background: $color--black;
  color: white;
  font-weight: bold;

  &__info {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>