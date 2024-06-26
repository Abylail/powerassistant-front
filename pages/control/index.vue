<template>
  <div class="control-page">

    <div class="control-page__loader-wrapper" :class="{'control-page__loader-wrapper--active': isLoading}">
      <div class="control-page__loader"/>
    </div>

    <div class="control-page__save" :class="{'control-page__save--active': canSave}">
      <base-button type="default-light" full-width @click="saveInfo()">Сохранить</base-button>
    </div>

    <div class="control-page__background" :style="{backgroundImage: imageBackground}"/>


    <div class="control-page__box pretty-box">

      <div class="control-page__avatar" :style="{backgroundImage: imageAvatar}">
        <span v-if="!businessInfo.avatar && !businessInfo.avatarBuffer">{{ businessInfo.title?.[0] || "?" }}</span>
      </div>

      <base-input
          title="Название страницы*"
          v-model="businessInfo.title"
      />

      <base-input
          title="Код страницы*"
          v-model="businessInfo.code"
      />

      <div v-if="businessInfo.code" class="control-page__text">
        Ссылка на вашу страницу: <a :href="`/${businessInfo.code}`">https://powerassistant.ai/{{businessInfo.code}}</a>
      </div>

      <div v-if="businessInfo.code" class="control-page__text">
        Ссылка на чат вашего ассистента: <a :href="`/${businessInfo.code}/chat`">https://powerassistant.ai/{{businessInfo.code}}/chat</a>
      </div>

      <base-textarea
          title="Краткое описание страницы"
          v-model="businessInfo.short_description"
      />

      <base-input
          title="Текст кнопки (переход в чат)"
          v-model="businessInfo.chatButtonLabel"
      />

      <div class="control-page__subtitle">Картинки</div>

      <base-image-input
          title="Сменить главную картинку"
          v-model="businessInfo.avatar"
          v-model:buffer="businessInfo.avatarBuffer"
          :show-preview="false"
      />

      <base-image-input
          title="Сменить заднюю картинку"
          v-model="businessInfo.backgroundImage"
          v-model:buffer="businessInfo.backgroundImageBuffer"
          :show-preview="false"
      />

      <div class="control-page__subtitle">Соц сети</div>

      <base-input
          title="Ссылка на сайт"
          v-model="businessInfo.webSite"
      />

      <base-input
          title="Instagram (username)"
          v-model="businessInfo.instagram"
      />

      <base-input
          title="Ссылка на LinkedIn"
          v-model="businessInfo.linkedIn"
      />

      <div class="control-page__subtitle">Ссылки</div>
      <links v-model="businessInfo.links"/>

      <div class="control-page__subtitle">Ваши продукты</div>
      <products v-model="businessInfo.products"/>
    </div>

    <div class="pretty-box">
      <div class="pretty-box__title">Настройки чата</div>

      <base-select
          title="Роль ассистента"
          v-model="businessInfo.assistant_role_id"
          :options="businessStore.getDict('assistantRole')"
          item-text="title"
          item-value="id"
      />

      <base-textarea
          title="Опишите подробно вашу деятельность"
          v-model="businessInfo.description"
      />

      <div class="control-page__subtitle">Виджеты</div>

      <widgets v-model="businessInfo.widgets" :list="businessStore.getDict('widget')"/>
    </div>
  </div>
</template>

<script setup>

import {useBusinessControlStore} from "../../store/control/business";
import {computed, ref, watch} from "vue";
import BaseInput from "../../components/base/BaseInput";
import BaseTextarea from "../../components/base/BaseTextarea";
import BaseSelect from "../../components/base/BaseSelect";
import Links from "../../components/common/control/links";
import Widgets from "../../components/common/control/widgets";
import Products from "../../components/common/control/products";
import {getImageUrl} from "~/helpers/methods";

definePageMeta({
  middleware: "auth"
})

const businessStore = useBusinessControlStore();
await Promise.all([
    businessStore.fetchBusiness(),
    businessStore.fetchDict("assistantRole"),
    businessStore.fetchDict("widget"),
])

const assistantRoles = computed(() => businessStore.getDict("assistantRole"))

const businessInfo = ref(JSON.parse(JSON.stringify(businessStore.getInfo)));

const imageAvatar = computed(() => {
  if (businessInfo.value.avatarBuffer) return `url(${businessInfo.value.avatarBuffer})`;
  if (businessInfo.value.avatar) return `url(${getImageUrl(businessInfo.value.avatar)})`;
  return null;
})

const imageBackground = computed(() => {
  if (businessInfo.value.backgroundImageBuffer) return `url(${businessInfo.value.backgroundImageBuffer})`;
  if (businessInfo.value.backgroundImage) return `url(${getImageUrl(businessInfo.value.backgroundImage)})`;
  return null;
})

const isLoading = ref(false);

const canSave = ref(false);
const saveInfo = async () => {
  canSave.value = false;
  isLoading.value = true;
  await businessStore.updateBusiness(businessInfo.value);
  isLoading.value = false;
}

watch(() => businessInfo, () => {
  canSave.value = true;
}, {
  deep: true
})
</script>

<style lang="scss" scoped>
.control-page {
  padding-bottom: 100px;

  &__box {
    position: relative;
    z-index: 1;
    padding-top: 100px;
  }

  &__background {
    aspect-ratio: 5/3;
    background-size: cover;
    background-position: center;
    margin-bottom: -1rem;
    width: 100%;
    max-width: calc(500px + 2*1rem);
    margin-left: auto !important;
    margin-right: auto !important;
  }

  &__avatar {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    top: -75px;
    width: 150px;
    height: 150px;
    border: 0.25rem solid white;
    border-radius: 50%;
    overflow: hidden;
    background-color: $color--black;
    color: $color--white;
    line-height: 150px;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    background-size: cover;
    background-position: center;
  }

  &__text {
    color: $color--black;
    font-weight: bold;
    margin-top: 2rem;
  }

  &__subtitle {
    color: $color--black;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  a {
    display: block;
    color: $color--blue;
  }

  &__save {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 4rem);
    height: 2.5rem;
    width: 15rem;
    z-index: 10;
    transition: .15s;

    &--active {
      transform: translate(-50%, -1.5rem);
    }
  }

  &__divider {
    padding: .5rem;
  }

  &__loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, -4rem);
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: $color--gray-light;
    z-index: 10;
    transition: .15s;
    border: 0.2rem solid $color--black;

    &--active {
      transform: translate(-50%, 2rem);
    }
  }

  &__loader {
    width: 1.5rem;
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background:
        linear-gradient(0deg ,rgb(0 0 0/50%) 30%,#0000 0 70%,rgb(0 0 0/100%) 0) 50%/8% 100%,
        linear-gradient(90deg,rgb(0 0 0/25%) 30%,#0000 0 70%,rgb(0 0 0/75% ) 0) 50%/100% 8%;
    background-repeat: no-repeat;
    animation: spin 1s infinite steps(12);

    &::before, &::after {
      content: "";
      grid-area: 1/1;
      border-radius: 50%;
      background: inherit;
      opacity: 0.915;
      transform: rotate(30deg);
    }

    &::after {
      opacity: 0.83;
      transform: rotate(60deg);
    }
  }

}

@keyframes spin {
  100% {transform: rotate(1turn)}
}
</style>