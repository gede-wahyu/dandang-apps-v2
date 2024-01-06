<template>
    <div class="layout-config">
        <AppConfig />
    </div>
    <div class="layout-wrapper" :class="containerClass">
        <div class="layout-sidebar">
            <AppSidebar />
        </div>
        <div class="layout-container">
            <div class="layout-topbar">
                <AppTopbar />
            </div>
            <div class="layout-content">
                <router-view></router-view>
            </div>
            <div class="layout-footer">
                <AppFooter />
            </div>
        </div>
    </div>
</template>

<script setup>
import AppTopbar from "./AppTopbar.vue";
import AppSidebar from "./AppSidebar.vue";
import AppFooter from "./AppFooter.vue";
import AppConfig from "./AppConfig.vue";
import { computed, watch, ref } from "vue";
import { useLayoutStore } from "../store/LayoutStore";

const layoutStore = useLayoutStore();
const containerClass = computed(() => {
    return {
        "layout-staticmenu-active":
            layoutStore.layoutConfig.menuMode === "static",
        "layout-overlaymenu-active":
            layoutStore.layoutConfig.menuMode === "overlay",
        "layout-staticmenu-desktop-inactive":
            layoutStore.layoutState.staticMenuDesktopInactive,
        "layout-staticmenu-mobile":
            layoutStore.layoutState.staticMenuMobileActive,
        "layout-menustyle-sticky":
            layoutStore.layoutConfig.menuStyle === "sticky" ||
            window.innerWidth < 992,
        "layout-menustyle-boxes":
            layoutStore.layoutConfig.menuStyle === "boxes" &&
            window.innerWidth >= 992,
        "layout-activemenustyle-rounded-right":
            layoutStore.layoutConfig.activeMenuStyle === "rounded-right",
        "layout-activemenustyle-rounded-all":
            layoutStore.layoutConfig.activeMenuStyle === "rounded-all",
        "layout-activemenustyle-full-width":
            layoutStore.layoutConfig.activeMenuStyle === "full-width",
        "layout-activemenustyle-pill-right":
            layoutStore.layoutConfig.activeMenuStyle === "pill-right",
        "layout-activemenustyle-pill-all":
            layoutStore.layoutConfig.activeMenuStyle === "pill-all",
    };
});
const outsideClickListener = ref(null);

watch(
    () => layoutStore.isSidebarActive,
    (newVal) => {
        if (newVal) {
            bindOutsideClickListener();
        } else {
            unbindOutsideClickListener();
        }
    }
);

const bindOutsideClickListener = () => {
    if (outsideClickListener.value) return;
    outsideClickListener.value = (event) => {
        if (isOutsideClicked(event)) {
            layoutStore.layoutState.staticMenuMobileActive = false;
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
    const sideBarEl = document.querySelector(".layout-sidebar");
    const toggleMenuButton = document.querySelector(".toggle-menu-button");
    return !(
        sideBarEl.isSameNode(event.target) ||
        sideBarEl.contains(event.target) ||
        toggleMenuButton.isSameNode(event.target) ||
        toggleMenuButton.contains(event.target)
    );
};

//
</script>
