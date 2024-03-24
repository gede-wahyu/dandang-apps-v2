<template>
    <li
        :class="{
            'layout-root-menuitem': root,
            'layout-submenu-item': !root,
            'hide-unauthorize-root': root && isAllChildNotAuthorize(item),
            'hide-unauthorize-routename':
                !root && !authStore.isAuthorize(item.to.name),
        }"
    >
        <div v-if="root && item.visible !== false" class="layout-root-label">
            {{ item.label }}
        </div>
        <a
            v-if="(!item.to || item.items) && item.visible !== false"
            :href="item.url"
            :class="item.class"
            :target="item.target"
            @click="itemClick($event, item)"
        >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            <span class="material-symbols-outlined"> expand_more </span>
        </a>
        <router-link
            v-if="item.to && !item.items"
            :to="item.to"
            :class="{ 'active-menuitem': checkActiveRoute(item) }"
            @click="itemClick($event, item, index)"
        >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            <span>
                <!-- <span v-if="item.block" class="material-symbols-outlined">
                    block
                </span> -->
            </span>
        </router-link>
        <Transition
            v-if="item.items && item.visible !== false"
            name="layout-submenu"
        >
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <AppMenuItem
                    v-for="(child, i) in item.items"
                    :index="i"
                    :item="child"
                    :root="false"
                    :parentItemKey="itemKey"
                />
            </ul>
        </Transition>
    </li>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { useLayoutStore } from "../store/LayoutStore";
import { useAuthStore } from "../store/AuthStore";

const route = useRoute();
const layoutStore = useLayoutStore();
const authStore = useAuthStore();
const itemKey = ref(null);
const isActiveMenu = ref(false);

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
    parentItemKey: {
        type: String,
        default: null,
    },
});

watch(
    () => layoutStore.layoutState.activeMenuTree,
    (newVal) => {
        isActiveMenu.value =
            newVal === itemKey.value || newVal.startsWith(itemKey.value + "-");
    }
);
onBeforeMount(() => {
    itemKey.value = props.parentItemKey
        ? props.parentItemKey + "-" + props.index
        : String(props.index);

    const activeTree = layoutStore.layoutState.activeMenuTree;

    isActiveMenu.value =
        activeTree === itemKey.value || activeTree
            ? activeTree.startsWith(itemKey.value + "-")
            : false;
});

const itemClick = (event, item) => {
    if ((item.to || item.url) && layoutStore.isSidebarActive)
        layoutStore.toggleMenu();

    const foundItemKey = item.items
        ? isActiveMenu.value
            ? props.parentItemKey
            : itemKey.value
        : itemKey.value;

    layoutStore.layoutState.activeMenuTree = foundItemKey;
};

const checkActiveRoute = (item) => {
    if (route.name === item.to.name) {
        layoutStore.setActiveMenuItem(item.to.name);
        layoutStore.setActivePageName(item.label);
        return true;
    }
};

const isAllChildNotAuthorize = (_item) => {
    return !_item.items
        .map((i) => authStore.isAuthorize(i.to.name))
        .reduce((result, j) => result || j);
};

//
</script>
<style scoped>
.hide-unauthorize-root {
    display: none !important;
}
.hide-unauthorize-routename {
    display: none;
}
</style>
