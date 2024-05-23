<template>
  <div class="base-loader" :class="{'base-loader--center-horizontal': props.centerHorizontal}"/>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "basketball",
    validator: t => ["basketball"].includes(t)
  },
  size: {
    type: [Number, String],
    default: 50
  },
  centerHorizontal: {
    type: Boolean,
    default: false
  }
})

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
  margin: 'auto',
  display: 'inline-block'
}))
</script>

<style lang="scss" scoped>
.base-loader {
  display: inline-block;
  height: 15px;
  aspect-ratio: 5;
  background: radial-gradient(closest-side at 37.5% 50%,white 100%,#0000) 0/calc(80%/3) 100%;
  animation: loader .75s infinite;

  &--center-horizontal {
    display: block;
    text-align: center;
  }

}

@keyframes loader {
  100% {background-position: 36.36%}
}
</style>