<template>
    <TambahSaler v-if="selectedSales" :selectedSales="selectedSales" />
    <div v-else></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSalesStore } from "../store/SalesStore";
import TambahSaler from "./TambahSaler.vue";

const salesStore = useSalesStore();
const route = useRoute();
const selectedSales = ref();

onMounted(async () => {
    await salesStore.GET__SALES_BY_ID(route.params.id);
    selectedSales.value = salesStore.selectedSales;
});

//
</script>
