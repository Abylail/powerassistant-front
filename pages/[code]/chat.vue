<template>
  <div class="business-chat">
    <chat-header :info="businessStore.getInfo" :is-typing="isLoading"/>

    <div class="business-chat__content" ref="chatElement">
        <div class="business-chat__chat">
        <div
            class="business-chat__message"
            :class="`business-chat__message--${message.type}`"
            v-for="(message, index) in messages" :key="index"
        >
          <message-content :content="message.text"/>
        </div>
      </div>
    </div>

    <div class="business-chat__tool" @keydown.down.enter="sendMessage()">
      <input
          class="business-chat__tool-input"
          v-model="message"
          autofocus
      />
      <button class="business-chat__tool-send" :class="{'business-chat__tool-send--disabled': !canSend}" @click="sendMessage()">
        <base-icon name="mdi-send"/>
      </button>
    </div>
  </div>

  <widgets/>
</template>

<script setup>
import ChatHeader from "../../components/common/chat/chatHeader";
import {navigateTo, useRoute} from "nuxt/app";
import {useBusinessStore} from "../../store/business";
import BaseIcon from "../../components/base/BaseIcon";
import {computed, nextTick, ref} from "vue";
import {useBusinessChatStore} from "../../store/business/chat";
import Widgets from "../../components/common/widgets/widgets";
import MessageContent from "../../components/common/chat/messageContent";

const chatStore = useBusinessChatStore();
const messages = computed(() => chatStore.getMessages);
const chatElement = ref(null);

const route = useRoute();

const businessStore = useBusinessStore();
await businessStore.fetchBusiness(route.params.code);

if (!businessStore.getInfo) navigateTo("/404")

const isLoading = ref(false);

const message = ref(null);
const canSend = computed(() => message.value && !isLoading.value);

// Скролю чат вниз
const scrollBottom = () => {
  if (!chatElement.value) return;
  chatElement.value?.scrollTo({
    top: chatElement.value.scrollHeight,
    behavior: 'smooth'
  });
}

// Отправить сообщение
const sendMessage = async () => {
  if (!canSend.value) return;
  isLoading.value = true;
  const _message = message.value;
  message.value = null;
  nextTick(() => scrollBottom());
  await chatStore.sendMessage(route.params.code, _message);
  isLoading.value = false;
  scrollBottom();
}

</script>

<style lang="scss" scoped>
.business-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;

  &__content {
    height: 100%;
    flex: 1;
    max-width: $max-width;
    width: 100%;
    margin: 0 auto;
    overflow-y: auto;
  }

  &__chat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1rem;
  }

  &__tool {
    display: flex;
    flex-direction: row;
    padding: 1rem 1rem 2rem;
    gap: 1rem;
    background-color: black;
    max-width: $max-width;
    width: calc(100% - 2rem);
    margin: 0 auto;
  }

  &__tool-send {
    background-color: $color--gray-light;
    width: 2.45rem;
    height: 2.45rem;
    border-radius: 0.5rem;
    transition: .15s;

    &--disabled {
      background-color: $color--black;
    }
  }

  &__tool-input {
    flex: 1;
    color: $color--white;
    font-size: $fs--default;
    line-height: 1.25rem;
    border: 0.1rem solid $color--black;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  &__message {
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
    &--user {justify-content: flex-end}
    &--assistant {justify-content: flex-start;}
  }
}
</style>