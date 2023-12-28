<template>
    <span
        class="span-nav-button toggle-menu-button"
        role="button"
        tabindex="0"
        @click="onToggleMenu()"
    >
        <span class="material-symbols-outlined"> menu </span>
    </span>
    <div class="layout-help-nav">
        <span
            class="span-nav-button left-labeled"
            role="button"
            tabindex="0"
            @click="router.push({ name: 'transaction-add' })"
        >
            <span>Buat Transaksi</span>
            <span class="material-symbols-outlined"> add_notes </span>
        </span>
        <span
            class="span-nav-button left-labeled"
            role="button"
            tabindex="0"
            @click="router.push({ name: 'notif' })"
        >
            <span>Notifikasi</span>
            <span class="material-symbols-outlined"> notifications </span>
        </span>
        <span
            class="span-nav-button left-labeled"
            role="button"
            tabindex="0"
            @click="router.push({ name: 'user' })"
        >
            <span>{{ displayUsername() }}</span>
            <span class="material-symbols-outlined"> person </span>
        </span>
    </div>
</template>

<script setup>
import { useLayoutStore } from "../store/LayoutStore";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/AuthStore";

const layoutStore = useLayoutStore();
const router = useRouter();
const authStore = useAuthStore();

const displayUsername = () => {
    if (authStore.auth)
        if (authStore.auth.user) return authStore.auth.user.nama;
        else return "Username";
    else return "Username";
};

const onToggleMenu = () => {
    layoutStore.toggleMenu();
};

//
</script>
