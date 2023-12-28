<template>
    <div class="auth-layout-wrapper">
        <div class="auth-layout-top">
            <span>dandang apps</span>
        </div>
        <div class="auth-layout-content">
            <router-view></router-view>
        </div>
        <div class="auth-layout-bottom">
            <AppFooter />
        </div>
    </div>
</template>

<script setup>
import AppFooter from "../AppFooter.vue";
</script>
