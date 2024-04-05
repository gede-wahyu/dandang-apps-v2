<template>
    <TambahPelanggan v-if="selectedCust" :selectedCust="selectedCust" />
    <div v-else></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCustomerStore } from "../store/CustomerStore";
import TambahPelanggan from "./TambahPelanggan.vue";

const route = useRoute();
const custStore = useCustomerStore();
const selectedCust = ref();

onMounted(async () => {
    await custStore.GET__CUST_BY_ID(route.params.id);
    selectedCust.value = custStore.selectedCust;
});

//
</script>
