<template>
  <div class="links-control">

    <div v-for="(link, index) in links" :key="index">

      <div class="links-control__link-view" v-if="editLink.index !== index">
        <link-view :link="link"/>
        <div class="links-control__link-actions">
          <button class="links-control__link-action" @click="editLinkHandle(index, link)">
            <base-icon name="mdi-pencil"/>
          </button>
          <button class="links-control__link-action" @click="removeLinkHandle(index)">
            <base-icon name="mdi-delete" color="red"/>
          </button>
        </div>
      </div>

      <div v-else class="links-control__form">
        <base-input
            title="Ссылка (https://...)*"
            v-model="editLink.data.link"
        />
        <base-input
            title="Название ссылки*"
            v-model="editLink.data.name"
        />
        <base-input
            title="Описание ссылки"
            v-model="editLink.data.description"
        />
        <base-button :disabled="!linkValidated" type="outline" full-width @click="saveLink()">Сохранить ссылку</base-button>
        <base-button type="naked" full-width @click="cancelEdit()">Отмена</base-button>
      </div>
    </div>

    <base-button v-if="canAddLink" type="outline" full-width @click="addLinkHandle()">+ Добавить ссылку</base-button>

  </div>
</template>

<script setup>
import LinkView from "../business/linkView";
import BaseButton from "../../base/BaseButton";
import {ref, reactive, computed} from "vue";
import BaseInput from "../../base/BaseInput";
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

// Редактирование ссылки
const editLink = reactive({
  index: null,
  data: null,
})

// Ссылки
const links = computed(() => {
  let _links = [];
  if (Array.isArray(props.modelValue)) _links = [...props.modelValue];
  if (Number.isInteger(editLink.index) && editLink.data) {
    if (!props.modelValue?.[editLink.index]) _links = [..._links, editLink.data];
    else _links[editLink.index] = editLink.data;
  }  return _links;
})


const canAddLink = computed(() => !editLink.data && (props.modelValue?.length || 0) < 10);

const addLinkHandle = () => {
  editLink.index = links.value.length;
  editLink.data = {};
}
const editLinkHandle = (index, data) => {
  editLink.index = index;
  editLink.data = JSON.parse(JSON.stringify(data));
}
const removeLinkHandle = (index) => {
  if (!confirm("Вы точно хотите удалить ссылку?")) return;
  let newValue = props.modelValue.slice();
  newValue.splice(index, 1);
  emit("update:modelValue", newValue);

}
const linkValidated = computed(() => !!editLink.data?.name && !!editLink.data?.link);

// Сохранить ссылку
const saveLink = () => {
  emit("update:modelValue", links.value.slice());
  editLink.index = null;
  editLink.data = null;
}

const cancelEdit = () => {
  editLink.index = null;
  editLink.data = null;
}
</script>

<style lang="scss" scoped>
.links-control {

  &__form {
    padding: .25rem .5rem;
    border-radius: 1rem;
    border: 1px solid $color--gray-light;
  }

  &__link-view {
    display: flex;
    & > *:first-child {flex: 1}
  }

  &__link-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__link-action {
    margin: 0 .5rem;
  }

}
</style>