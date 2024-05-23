<template>
  <div class="business-widget__background" v-if="props.background" />
  <div class="business-widget pretty-box" v-if="props.info">

    <div class="business-widget__avatar">
      <span v-if="!props.info.avatar">{{ props.info.title?.[0] }}</span>
    </div>

    <h1 class="pretty-box__title business-widget__title">{{ props.info.title }}</h1>
    <pre class="business-widget__description">{{ props.info.short_description }}</pre>

    <base-button type="outline-black" full-width @click="goChat()">{{ props.info.chatButtonLabel || "Напишите нам" }}</base-button>

    <div class="business-widget__short-links" v-if="shortLinks.length">
      <a class="business-widget__short-link" v-for="(shortLink, index) in shortLinks" :key="index" :href="shortLink.link" target="_blank">
        <base-icon :name="shortLink.icon"/>
      </a>
    </div>

    <link-view
        v-for="linkInfo in props.info.links"
        :link="linkInfo"
    />
  </div>
</template>

<script setup>

import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";
import BaseButton from "../../base/BaseButton";
import {useRouter} from "nuxt/app";
import Widgets from "../widgets/widgets";
import LinkView from "./linkView";

const props = defineProps({
  info: {
    type: Object,
    default: null
  },
  background: {
    type: Boolean,
    default: true
  }
})

// Короткие ссылки
const shortLinks = computed(() => {
  let links = [];
  if (props.info?.instagram) links.push({icon: "mdi-instagram", link: `https://instagram.com/${props.info?.instagram}`});
  if (props.info?.webSite) links.push({icon: "mdi-web", link: props.info?.webSite});
  if (props.info?.linkedId) links.push({icon: "mdi-linkedin", link: props.info?.linkedId});
  return links;
})

const router = useRouter();
const goChat = () => {
  router.push(`/${props.info.code}/chat`);
}
</script>

<style lang="scss" scoped>
.business-widget {
  position: relative;
  padding-top: 100px;

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

  &__title {
    text-align: center;
    margin-bottom: 1rem;
  }

  &__description {
    text-align: center;
    white-space: pre-wrap;
  }

  &__short-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  &__short-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: $color--black;
    color: $color--white;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
  }

}
</style>