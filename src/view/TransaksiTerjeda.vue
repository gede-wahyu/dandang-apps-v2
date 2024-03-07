<template>
    <h5 class="page-title">Transaksi Tertunda</h5>
    <span class="page-subtitle">Daftar transaksi yang belum tuntas.</span>
    <div class="d-card"></div>

    <UnderDevelopment
        msg="Saat ini menu Transaksi Tertunda sedang dalam tahap development."
    />
</template>

<script setup>
import UnderDevelopment from "./UnderDevelopment.vue";
</script>

<style scoped lang="scss">
.d-card {
    height: 35rem;
}
</style>
