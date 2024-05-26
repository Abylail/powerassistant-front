<template>
  <div
      class="product-view"
      :style="{background}"
  >
    <div class="product-view__main-info">
      <span>{{ props.product.name }}</span>
      <base-icon class="product-view__icon" name="mdi-cube-scan"/>
    </div>
    <base-cut-text
        class="product-view__description"
        v-if="props.product.description"
        :text="props.product.description"
    />
  </div>
</template>

<script setup>
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";
import BaseCutText from "../../base/BaseCutText";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const background = computed(() => props.product.image ? `url(${props.product.image})` : null);
</script>

<style lang="scss" scoped>
.product-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  margin: .5rem 0;
  padding: 1rem;
  min-height: 4rem;
  border-radius: .5rem;
  background: $color--black;
  color: $color--gray-light;

  &__main-info {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
    font-weight: bold;
  }

  &__description {
    font-size: $fs--mini;
    color: $color--gray-light
  }
}
</style>