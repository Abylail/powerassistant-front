<template>
  <div class="widget-control">
    <div class="widget-control__list">
      <button
          class="widget-control__widget"
          :class="{'widget-control__widget--selected': isSelected(widget)}"
          v-for="widget in widgets" :key="widget.code"
          @click="addToggle(widget)"
      >
        <span>{{ widget.title }}</span>
        <base-icon class="widget-control__widget-icon-add" name="mdi-plus"/>
        <base-icon class="widget-control__widget-icon-added" name="mdi-check"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  list: {
    type: Array,
    required: true
  }
})

const isSelected = widget => props.modelValue?.includes(widget.code);
const widgets = computed(() => props.list || []);
const addToggle = widget => {
  if (!isSelected(widget)) emit("update:modelValue", [...(props.modelValue || []), widget.code]);
  else {
    const removeIndex = props.modelValue.indexOf(widget.code);
    let newList = props.modelValue.slice();
    newList.splice(removeIndex, 1);
    emit("update:modelValue", newList)
  }
}
</script>

<style lang="scss" scoped>
.widget-control {

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
  }

  &__widget-icon-added {
    display: none;
  }

  &__widget {
    display: flex;
    align-self: center;
    justify-content: center;
    gap: .2rem;
    white-space: nowrap;
    border: 0.1rem solid transparent;
    color: $color--black;
    background: $color--gray-light;
    padding: .2rem .5rem;
    border-radius: 1rem;
    font-weight: bold;
    font-size: $fs--mini;
    line-height: 24px;

    &--selected {
      border: 0.1rem solid $color--blue;
      color: $color--blue;
      background: $color--blue-light;
      .widget-control__widget-icon-add {display: none}
      .widget-control__widget-icon-added {display: block}
    }
  }

}
</style>