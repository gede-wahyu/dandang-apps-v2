<template>
    <div class="layout-sidebar-content">
        <router-link to="/" class="layout-comp-logo">
            <img src="/icon.png" alt="teh-dandang-icon" />
            <span>teh dandang</span>
        </router-link>

        <AppMenu />
    </div>
</template>

<script setup>
import AppMenu from "./AppMenu.vue";
</script>
