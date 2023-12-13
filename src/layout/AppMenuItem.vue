<template>
    <li :class="{ 'layout-root-menuitem': root, 'layout-submenu-item': !root }">
        <div v-if="root" class="layout-root-label">{{ item.label }}</div>
        <router-link
            v-if="item.to && !item.items"
            :to="item.to"
            :class="{ 'active-menuitem': checkActiveRoute(item) }"
            @click="itemClick($event, item, index)"
        >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            <span></span>
        </router-link>
        <Transition
            v-if="item.items && item.visible !== false"
            name="layout-submenu"
        >
            <ul class="layout-submenu">
                <AppMenuItem
                    v-for="(child, i) in item.items"
                    :index="i"
                    :item="child"
                    :root="false"
                />
            </ul>
        </Transition>
    </li>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useLayoutStore } from "../store/LayoutStore";

const route = useRoute();
const layoutStore = useLayoutStore();

const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
    index: {
        type: Number,
        default: 0,
    },
    root: {
        type: Boolean,
        default: true,
    },
});

const itemClick = (event, item) => {
    if (item.to && layoutStore.isSidebarActive) layoutStore.toggleMenu();
};

const checkActiveRoute = (item) => {
    if (route.name === item.to.name) {
        layoutStore.setActiveMenuItem(item.to.name);
        layoutStore.setActivePageName(item.label);
        return true;
    }
};

//
</script>
