<template>
    <span
        class="layout-config-button span-nav-button"
        role="button"
        tabindex="0"
        @click="openConfig()"
    >
        <span class="material-symbols-outlined"> tune </span>
    </span>
    <div class="layout-configmenu" :class="configClass">
        <div class="header">
            <h5>Konfigurasi</h5>
            <span
                class="span-nav-button"
                role="button"
                tabindex="0"
                @click="layoutStore.layoutState.configMenuActive = false"
            >
                <span class="material-symbols-outlined"> close </span>
            </span>
        </div>
        <span>Konfigurasi tampilan dasar aplikasi.</span>
        <div class="config">
            <!-- buat radio button -->
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useLayoutStore } from "../store/LayoutStore";

const layoutStore = useLayoutStore();
const configClass = computed(() => {
    return {
        "layout-configmenu-active": layoutStore.layoutState.configMenuActive,
    };
});
const outsideClickListener = ref(null);

watch(
    () => layoutStore.layoutState.configMenuActive,
    (newVal) => {
        if (newVal) {
            bindOutsideClickListener();
        } else {
            unbindOutsideClickListener();
        }
    }
);

const openConfig = () => {
    layoutStore.layoutState.configMenuActive = true;
};
const bindOutsideClickListener = () => {
    if (outsideClickListener.value) return;
    outsideClickListener.value = (event) => {
        if (isOutsideClicked(event)) {
            layoutStore.layoutState.configMenuActive = false;
        }
    };
    document.addEventListener("click", outsideClickListener.value);
};
const unbindOutsideClickListener = () => {
    if (!outsideClickListener.value) return;
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
};
const isOutsideClicked = (event) => {
    const sideBarEl = document.querySelector(".layout-configmenu");
    const toggleMenuButton = document.querySelector(".layout-config-button");
    return !(
        sideBarEl.isSameNode(event.target) ||
        sideBarEl.contains(event.target) ||
        toggleMenuButton.isSameNode(event.target) ||
        toggleMenuButton.contains(event.target)
    );
};
//
</script>
