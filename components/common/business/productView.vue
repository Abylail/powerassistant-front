<template>
  <div
      class="product-view"
      :style="{backgroundImage}"
  >
    <div class="product-view__main-info">
      <div>
        {{ props.product.name }} -
        <span>{{ props.product.price }}{{ props.product.priceCurrency }}</span>
      </div>
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
import {getImageUrl} from "~/helpers/methods";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const backgroundImage = computed(() => props.product.imageUrl ? `url(${getImageUrl(props.product.imageUrl)})` : null);
</script>

<style lang="scss" scoped>
.product-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  //box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);
  margin: .5rem 0;
  padding: .5rem 1rem;
  aspect-ratio: 4/1;
  border-radius: .5rem;
  background-color: $color--black;
  background-size: cover;
  background-position: center;
  color: $color--gray-light;
  box-shadow: inset 0px -50px 20px 0px rgba(0,0,0,0.75);

  &__main-info {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: white;
    font-weight: 600;
  }

  &__description {
    font-size: $fs--mini;
    color: $color--gray-light
  }
}
</style>