<template>
    <TambahProduk v-if="selectedProduct" :selectedProduct="selectedProduct" />
    <div v-else></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/ProductStore";
import TambahProduk from "./TambahProduk.vue";

const productStore = useProductStore();
const route = useRoute();
const selectedProduct = ref();

onMounted(async () => {
    await productStore.GET__PRODUCTS_BY_ID(route.params.id);
    selectedProduct.value = productStore.selectedProduct;
});

//
</script>
