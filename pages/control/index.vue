<template>
  <div class="control-page">

    <div class="control-page__loader-wrapper" :class="{'control-page__loader-wrapper--active': isLoading}">
      <div class="control-page__loader"/>
    </div>

    <div class="control-page__background"/>


    <div class="control-page__box pretty-box">

      <div class="control-page__avatar">
        <span v-if="!businessInfo.avatar">{{ businessInfo.title?.[0] || "?" }}</span>
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

const isLoading = ref(false);

const saveInfo = async () => {
  isLoading.value = true;
  await businessStore.updateBusiness(businessInfo.value);
  isLoading.value = false;
}

let timeout = null;
watch(() => businessInfo, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => saveInfo(), 2000)
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
    height: 200px;
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