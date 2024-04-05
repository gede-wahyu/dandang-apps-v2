<template>
    <TambahDepo v-if="selectedDepo" :selectedDepo="selectedDepo" />
    <div v-else></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDepoStore } from "../store/DepoStore";
import TambahDepo from "./TambahDepo.vue";

const depoStore = useDepoStore();
const route = useRoute();
const selectedDepo = ref();

onMounted(async () => {
    await depoStore.GET__DEPO_BY_ID(route.params.id);
    selectedDepo.value = depoStore.selectedDepo;
});

//
</script>
