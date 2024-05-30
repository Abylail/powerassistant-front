<template>
  <div class="base-image-input">

    <div class="base-image-input__box" v-if="props.showPreview && (props.modelValue || props.buffer)">
      <img class="base-image-input__image" v-if="props.buffer" :src="props.buffer"/>
      <img class="base-image-input__image" v-else-if="props.modelValue" :src="getImageUrl(props.modelValue)"/>
      <base-button type="naked-blue" size="mini" @click.stop="inputElement.click()">Изменить картинку</base-button>
    </div>

    <!-- Добавить фото -->
    <div class="base-image-input__box" v-else @click="inputElement.click()">
      <base-loader v-if="isLoading"/>
      <div v-else>{{ title }}</div>
    </div>

    <div class="base-image-input__error" v-if="error">
      {{ error }}
    </div>

    <input
        v-show="false"
        :accept="props.accept"
        ref="inputElement"
        type="file"
        @input="inputHandle($event?.target?.files[0])"
    />
  </div>
</template>

<script setup>
import {fileToBase64, resizeImage} from "~/helpers/file";
import {useRuntimeConfig} from "nuxt/app";
import {getImageUrl} from "~/helpers/methods";

const emit = defineEmits(["update:modelValue", "update:buffer"]);
const props = defineProps({
  title: {
    type: String,
    default: "Выберите картинку"
  },
  modelValue: {
    type: String,
    default: null
  },
  buffer: {
    type: String,
    default: null
  },
  accept: {
    type: String,
    default: "image/png, image/gif, image/jpeg"
  },
  maxWidth: {
    type: Number,
    default: 600
  },
  showPreview: {
    type: Boolean,
    default: true
  }
})

const inputElement = ref(null);
const isLoading = ref(false);
const error = ref(null);

const config = useRuntimeConfig();

const inputHandle = async (file) => {
  if (!file) return;
  isLoading.value = true;
  const base64File = await fileToBase64(file);
  if (!base64File) {
    isLoading.value = false;
    error.value = "Поврежденный файл"
  }
  const optimizedImage = await resizeImage(base64File, props.maxWidth)
  isLoading.value = false;

  inputElement.value.value = "";
  emit("update:buffer", optimizedImage);
}
</script>

<style lang="scss" scoped>
.base-image-input {
  margin: 8px 0;

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
    padding: 8px;
    border: 1px solid $color--gray-light;
    background-color: $color--gray-light;
    min-height: 18px;
    color: $color--dark;
    overflow: hidden;
    cursor: pointer;
  }

  &__image {
    height: 100px;
    width: 100%;
    object-fit: cover;
  }

  &__error {
    text-align: center;
    color: $color--red;
  }

}
</style>