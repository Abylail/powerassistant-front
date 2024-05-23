<template>
  <div class="main-page">

    <div class="main-page__container container">
      <div class="typewriter-container main-page__title-container">
        <h1 class="main-page__title typewriter-text">Power Assistant</h1>
      </div>
      <p class="main-page__description">Ваш личный ассистент на базе искусственного интеллекта.</p>
    </div>

    <business-widget
        :info="businessStore.getInfo"
        :background="false"
    />

    <div class="pretty-box">
      <h2 class="pretty-box__title">Создай своего ассистента</h2>
      <base-input
          title="Ваш сотовый номер"
          v-model="phone"
          phone
      />
      <base-button :disabled="!phoneValid" :loading="phoneLoading" full-width @click="goControl()">Создать / Войти</base-button>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../components/base/BaseInput";
import {computed, ref} from "vue";
import BaseButton from "../components/base/BaseButton";
import {phonePreparing, phoneRawValidation} from "../helpers/phone";
import {useAuthStore} from "../store/auth";
import {useRouter} from "nuxt/app";
import BusinessWidget from "../components/common/business/businessWidget";
import {useBusinessStore} from "../store/business";
const phone = ref(null);
const phoneLoading = ref(false);
const phoneValid = computed(() => phoneRawValidation(phone.value));

const authStore = useAuthStore();
const router = useRouter();

const businessStore = useBusinessStore();
await businessStore.fetchBusiness("me")

// Перейти в кабинет
const goControl = async () => {
  if (!phoneValid.value) return;
  const _phone = phonePreparing(phone.value)
  phoneLoading.value = true;
  const isRegistered = await authStore.isRegistered(_phone);
  if (isRegistered) await router.push(`/control/login?phone=${_phone}`);
  else await router.push(`/control/login/registration?phone=${_phone}`);
  phoneLoading.value = false;
}
</script>

<style lang="scss">
.main-page {
  min-height: 100vh;
  color: $color--white;
  position: relative;
  z-index: 1;
  padding-bottom: 4rem;

  &__title-container {
    max-width: 185px;
  }

  &__title {
    font-size: $fs--title;
    font-weight: normal;
  }

  &__description {
    margin-top: 2rem;
    font-size: $fs--big-title;
    font-weight: bold;
  }

  &__container {
    padding-top: 5rem;
    padding-bottom: 7rem;
  }
}
</style>