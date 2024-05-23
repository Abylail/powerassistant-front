<template>
  <div class="login">

    <h1 class="login__title">Вход</h1>
    <div class="pretty-box">
      <base-input
          title="Ваш сотовый номер"
          v-model="authForm.phone"
          phone
      />
      <base-input
          title="Пароль"
          v-model="authForm.password"
          password
      />

      <base-button
          class="login__submit"
          :disabled="!canSubmit"
          :loading="isLoading"
          full-width
          @click="goControl()"
      >Войти</base-button>

      <div class="login__error" v-if="error">{{ error }}</div>

      <div>
        <base-button
          class="login__extra-action"
          type="naked"
          full-width
          @click="goResetPass()"
        >Забыли пароль?</base-button>

        <base-button
          class="login__extra-action"
          type="naked"
          full-width
          @click="goRegistration()"
        >У меня нет аккаунта</base-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseInput from "../../../components/base/BaseInput";
import {useRoute, useRouter} from "nuxt/app";
import {phonePreparing, phoneRawValidation, phoneValidation} from "../../../helpers/phone";
import BaseButton from "../../../components/base/BaseButton";
import {useAuthStore} from "../../../store/auth";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const authForm = ref({
  phone: phoneValidation(route.query.phone) ? route.query.phone : "",
  password: null,
});

const error = ref(null);

const isLoading = ref(false);

// Можно ли отправлять
const canSubmit = computed(() => phoneRawValidation(authForm.value.phone) && authForm.value.password);

const goControl = async () => {
  error.value = null;
  isLoading.value = true;
  const isSuccess = await authStore.login({phone: phonePreparing(authForm.value.phone), password: authForm.value.password});
  if (isSuccess) router.push("/control")
  else error.value = "Неверный пароль"
  isLoading.value = false;
}

const goResetPass = () => {
  router.push(`/control/login/resetPass?phone=${route.query.phone}`);
}

const goRegistration = () => {
  router.push("/control/login/registration");
}
</script>

<style lang="scss" scoped>
.login {

  &__title {
    text-align: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
    color: $color--white;
  }

  &__error {
    color: $color--red;
    font-weight: bold;
    text-align: center;
  }

  &__extra-action {
    margin-bottom: 0;
    line-height: 1rem;
  }

}
</style>