<template>
    <router-view></router-view>
    <Toast :position="position()" />
</template>
<script setup>
const position = () => {
    if (window.innerWidth < 992) return "top-center";
};
</script>
