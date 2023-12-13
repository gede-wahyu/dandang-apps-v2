<template>
    <span
        class="layout-nav-button toggle-menu-button"
        role="button"
        tabindex="0"
        @click="onToggleMenu()"
    >
        <span class="material-symbols-outlined"> menu </span>
    </span>
    <div class="layout-help-nav">
        <span
            class="layout-nav-button nav-button-labeled"
            role="button"
            tabindex="0"
        >
            <span>Buat Transaksi</span>
            <span class="material-symbols-outlined"> add_notes </span>
        </span>
        <span
            class="layout-nav-button nav-button-labeled"
            role="button"
            tabindex="0"
        >
            <span>Notifikasi</span>
            <span class="material-symbols-outlined"> notifications </span>
        </span>
        <span
            class="layout-nav-button nav-button-labeled"
            role="button"
            tabindex="0"
        >
            <span>username</span>
            <span class="material-symbols-outlined"> person </span>
        </span>
    </div>
</template>

<script setup>
import { useLayoutStore } from "../store/LayoutStore";
const layoutStore = useLayoutStore();
const onToggleMenu = () => {
    layoutStore.toggleMenu();
};
</script>
