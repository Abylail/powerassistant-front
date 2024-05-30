<template>
  <div class="products-control">
    <div v-for="(product, index) in products" :key="index">

      <div class="products-control__view" v-if="editProduct.index !== index">
        <product-view :product="product"/>
        <div class="products-control__actions">
          <button class="products-control__action" @click="editProductHandle(index, product)">
            <base-icon name="mdi-pencil"/>
          </button>
          <button class="products-control__action" @click="removeProductHandle(index)">
            <base-icon name="mdi-delete" color="red"/>
          </button>
        </div>
      </div>

      <div v-else class="products-control__form">
        <base-input
            title="Название*"
            v-model="editProduct.data.name"
        />
        <base-textarea
            title="Описание продукта"
            v-model="editProduct.data.description"
        />
        <base-input
            title="Цена"
            v-model="editProduct.data.price"
            number
        />
        <base-input
            title="Валюта"
            v-model="editProduct.data.priceCurrency"
        />
        <base-input
            title="Ссылка (если есть)"
            v-model="editProduct.data.link"
        />
        <base-button :disabled="!productValidated" type="outline" full-width @click="save()">Сохранить продукт</base-button>
        <base-button type="naked" full-width @click="cancelEdit()">Отмена</base-button>
      </div>
    </div>

    <base-button v-if="canAdd" type="outline" full-width @click="addHandle()">+ Добавить продукт</base-button>
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import {reactive, computed} from "vue";
import BaseInput from "../../base/BaseInput";
import BaseIcon from "../../base/BaseIcon";
import ProductView from "../business/productView";
import BaseTextarea from "../../base/BaseTextarea";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

// Редактирование ссылки
const editProduct = reactive({
  index: null,
  data: null,
})

// Ссылки
const products = computed(() => {
  let _products = [];
  if (Array.isArray(props.modelValue)) _products = [...props.modelValue];
  if (Number.isInteger(editProduct.index) && editProduct.data) {
    if (!props.modelValue?.[editProduct.index]) _products = [..._products, editProduct.data];
    else _products[editProduct.index] = editProduct.data;
  }
  return _products;
})


const canAdd = computed(() => !editProduct.data && (props.modelValue?.length || 0) < 10);

const addHandle = () => {
  editProduct.index = products.value.length;
  editProduct.data = {
    priceCurrency: "Тенге"
  };
}
const editProductHandle = (index, data) => {
  editProduct.index = index;
  editProduct.data = JSON.parse(JSON.stringify(data));
}
const removeProductHandle = (index) => {
  if (!confirm("Вы точно хотите удалить продукт?")) return;
  let newValue = props.modelValue.slice();
  newValue.splice(index, 1);
  emit("update:modelValue", newValue);

}
const productValidated = computed(() => !!editProduct.data?.name);

// Сохранить ссылку
const save = () => {
  emit("update:modelValue", products.value.slice());
  editProduct.index = null;
  editProduct.data = null;
}

const cancelEdit = () => {
  editProduct.index = null;
  editProduct.data = null;
}
</script>

<style lang="scss" scoped>
.products-control {

  &__form {
    padding: .25rem .5rem;
    border-radius: 1rem;
    border: 1px solid $color--gray-light;
  }

  &__view {
    display: flex;
    & > *:first-child {flex: 1}
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__action {
    margin: 0 .5rem;
  }

}
</style>