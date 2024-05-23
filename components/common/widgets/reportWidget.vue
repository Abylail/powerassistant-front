<template>
  <base-backdrop :active="props.show" title="Сообщить о проблеме" @update:active="emit('update:show', $event)">
    <div class="widget__form">
      <base-input
          title="Ваш номер"
          v-model="form.phone"
          phone
      />
      <base-input
          title="Ваш номер"
          v-model="form.name"
      />
      <base-textarea
          title="Опишите проблему"
          v-model="form.error"
      />
      <div class="widget__actions">
        <base-button full-width @click="submitHandle()">Отправить</base-button>
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import {ref} from "vue";
import {useBusinessChatStore} from "../../../store/business/chat";
import BaseInput from "../../base/BaseInput";
import BaseTextarea from "../../base/BaseTextarea";
import BaseButton from "../../base/BaseButton";
const emit = defineEmits(["update:show"])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const chatStore = useBusinessChatStore();

const form = ref(chatStore.getWidgetToCall?.arguments ? JSON.parse(chatStore.getWidgetToCall.arguments) : {});

const submitHandle = () => {
  chatStore.widgetClose(form.value);
}
</script>

<style scoped>

</style>