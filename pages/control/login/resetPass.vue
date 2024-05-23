<template>
  <div class="reset-pass">

    <h1 class="reset-pass__title">Смена пароля</h1>

    <!-- Отправка смс кода -->
    <div class="pretty-box" v-if="step === 1">
      <base-input
          title="Ваш сотовый номер"
          v-model="authForm.phone"
          phone
      />

      <base-button
          class="reset-pass__submit"
          :disabled="!canSendSms"
          :loading="isLoading"
          full-width
          @click="sendOtp()"
      >Отправить смс</base-button>

      <div>
        <base-button
            class="reset-pass__extra-action"
            type="naked"
            full-width
            @click="goLogin()"
        >У меня есть аккаунт</base-button>
      </div>
    </div>

    <div class="pretty-box" v-else-if="step === 2">
      <otp-input
          v-model="authForm.otp"
          :error="error"
          @submit="checkOtp()"
      />

      <div class="reset-pass__text">Введите код из смс</div>

      <div class="reset-pass__error" v-if="error">{{ error }}</div>
    </div>

    <div class="pretty-box" v-else-if="step === 3">
      <base-input
          title="Придумайте новый пароль"
          v-model="authForm.password"
          password
      />

      <base-input
          title="Повторите пароль"
          v-model="authForm.rePassword"
          password
      />

      <base-button
          class="reset-pass__submit"
          :disabled="!canSubmit"
          :loading="isLoading"
          full-width
          @click="submitHandle()"
      >Сменить пароль</base-button>

      <div class="reset-pass__error" v-if="error">{{ error }}</div>
    </div>

  </div>
</template>

<script setup>
import {computed, nextTick, ref} from "vue";
import BaseInput from "../../../components/base/BaseInput";
import {useRoute, useRouter} from "nuxt/app";
import {phonePreparing, phoneRawValidation, phoneValidation} from "../../../helpers/phone";
import BaseButton from "../../../components/base/BaseButton";
import {useAuthStore} from "../../../store/auth";
import OtpInput from "../../../components/common/auth/otpInput";

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

const step = ref(1);

const authForm = ref({
  phone: phoneValidation(route.query.phone) ? route.query.phone : "",
  otp: null,
  password: null,
  rePassword: null,
  first_name: null,
  last_name: null,
});

const error = ref(null);

const isLoading = ref(false);

// Можно ли отправлять
const canSendSms = computed(() => phoneRawValidation(authForm.value.phone));
const canVerifySms = computed(() => authForm.value.otp?.length === 4);
const canSubmit = computed(() => canSendSms.value && canVerifySms.value && authForm.value.password && authForm.value.password === authForm.value.rePassword);

const sendOtp = async () => {
  if (!canSendSms.value) return;
  isLoading.value = true;
  await authStore.sendOtp(phonePreparing(authForm.value.phone));
  step.value++;
  isLoading.value = false;
}

const checkOtp = async () => {
  if (!canVerifySms.value) return;
  error.value = null;
  isLoading.value = true;
  const isSuccess = await authStore.checkOtp({phone: phonePreparing(authForm.value.phone), otp: authForm.value.otp});
  if (isSuccess) step.value++;
  else {
    error.value = "Неверный код";
    authForm.value.otp = null;
  }
  isLoading.value = false;
}

const submitHandle = async () => {
  if (!canSubmit.value) return;
  error.value = null;
  isLoading.value = true;
  const isSuccess = await authStore.resetPass({...authForm.value, phone: phonePreparing(authForm.value.phone)});
  if (isSuccess) {
    nextTick(() => router.push(`/control/login?phone=${phonePreparing(authForm.value.phone)}`))
  }
  else error.value = "Кажется вы что то забыли"
  isLoading.value = false;
}

const goLogin = () => {
  router.push("/control/login");
}
</script>

<style lang="scss" scoped>
.reset-pass {

  &__title {
    text-align: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
    color: $color--white;
  }

  &__text {
    text-align: center;
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