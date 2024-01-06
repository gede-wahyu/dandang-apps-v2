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
        <div class="configs">
            <h6>Tema</h6>
            <div class="config">
                <div class="config-opt">
                    <RadioButton
                        v-model="theme"
                        inputId="theme-1"
                        name="theme"
                        value="light-theme"
                        @update:modelValue="setTheme()"
                    />
                    <label for="theme-1">Tema Terang</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="theme"
                        inputId="theme-2"
                        name="theme"
                        value="dark-theme"
                        @update:modelValue="setTheme()"
                    />
                    <label for="theme-2">Tema Gelap</label>
                </div>
            </div>

            <h6>Tone</h6>
            <div class="config">
                <div class="config-opt">
                    <RadioButton
                        v-model="tone"
                        inputId="tone-1"
                        name="tone"
                        value="tone-green"
                        @update:modelValue="setTone()"
                    />
                    <label for="tone-1">Hijau</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="tone"
                        inputId="tone-2"
                        name="tone"
                        value="tone-blue"
                        @update:modelValue="setTone()"
                    />
                    <label for="tone-2">Biru</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="tone"
                        inputId="tone-3"
                        name="tone"
                        value="tone-orange"
                        @update:modelValue="setTone()"
                    />
                    <label for="tone-3">Oranye</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="tone"
                        inputId="tone-4"
                        name="tone"
                        value="tone-red"
                        @update:modelValue="setTone()"
                    />
                    <label for="tone-4">Merah</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="tone"
                        inputId="tone-5"
                        name="tone"
                        value="tone-purple"
                        @update:modelValue="setTone()"
                    />
                    <label for="tone-5">Ungu</label>
                </div>
            </div>

            <h6>Mode Menu *</h6>
            <div class="config">
                <div class="config-opt">
                    <RadioButton
                        v-model="menuMode"
                        inputId="menuMode-1"
                        name="menumode"
                        value="static"
                        @update:modelValue="setMenuMode()"
                    />
                    <label for="menuMode-1">Sembunyikan manual</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="menuMode"
                        inputId="menuMode-2"
                        name="menumode"
                        value="overlay"
                        @update:modelValue="setMenuMode()"
                    />
                    <label for="menuMode-2">Sembunyikan otomatis</label>
                </div>
            </div>

            <h6>Gaya Menu *</h6>
            <div class="config">
                <div class="config-opt">
                    <RadioButton
                        v-model="menuStyle"
                        inputId="menuStyle-1"
                        name="menuStyle"
                        value="sticky"
                        @update:modelValue="setMenuStyle()"
                    />
                    <label for="menuStyle-1">Menempel</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="menuStyle"
                        inputId="menuStyle-2"
                        name="menuStyle"
                        value="boxes"
                        @update:modelValue="setMenuStyle()"
                    />
                    <label for="menuStyle-2">Kotak</label>
                </div>
            </div>

            <h6>Gaya Menu Aktif</h6>
            <div class="config">
                <div class="config-opt">
                    <RadioButton
                        v-model="activeMenuStyle"
                        inputId="activeMenuStyle-1"
                        name="activeMenuStyle"
                        value="rounded-right"
                        @update:modelValue="setActiveMenuStyle()"
                    />
                    <label for="activeMenuStyle-1">Kotak Sebagian</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="activeMenuStyle"
                        inputId="activeMenuStyle-2"
                        name="activeMenuStyle"
                        value="rounded-all"
                        @update:modelValue="setActiveMenuStyle()"
                    />
                    <label for="activeMenuStyle-2">Kotak Penuh</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="activeMenuStyle"
                        inputId="activeMenuStyle-3"
                        name="activeMenuStyle"
                        value="full-width"
                        @update:modelValue="setActiveMenuStyle()"
                    />
                    <label for="activeMenuStyle-3">Lebar Penuh</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="activeMenuStyle"
                        inputId="activeMenuStyle-4"
                        name="activeMenuStyle"
                        value="pill-right"
                        @update:modelValue="setActiveMenuStyle()"
                    />
                    <label for="activeMenuStyle-4">Pill Sebagian</label>
                </div>
                <div class="config-opt">
                    <RadioButton
                        v-model="activeMenuStyle"
                        inputId="activeMenuStyle-5"
                        name="activeMenuStyle"
                        value="pill-all"
                        @update:modelValue="setActiveMenuStyle()"
                    />
                    <label for="activeMenuStyle-5">Pill Penuh</label>
                </div>
            </div>

            <div class="config-note">
                <span class="material-symbols-outlined"> warning </span>
                <span>* Tidak memiliki efek pada perangkat mobile</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref, onBeforeMount } from "vue";
import { useLayoutStore } from "../store/LayoutStore";

const layoutStore = useLayoutStore();
const configClass = computed(() => {
    return {
        "layout-configmenu-active": layoutStore.layoutState.configMenuActive,
    };
});
const outsideClickListener = ref(null);
const theme = ref();
const tone = ref();
const menuMode = ref();
const menuStyle = ref();
const activeMenuStyle = ref();

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
watch(
    () => layoutStore.layoutConfig.menuMode,
    () => {
        menuMode.value = layoutStore.layoutConfig.menuMode;
    }
);

onBeforeMount(() => {
    if (localStorage.getItem("layoutTheme")) {
        theme.value = localStorage.getItem("layoutTheme");
        setTheme();
    } else {
        theme.value = layoutStore.layoutConfig.theme;
    }
    if (localStorage.getItem("layoutTone")) {
        tone.value = localStorage.getItem("layoutTone");
        setTone();
    } else {
        tone.value = layoutStore.layoutConfig.tone;
    }
    if (localStorage.getItem("menuMode")) {
        menuMode.value = localStorage.getItem("menuMode");
        setMenuMode();
    } else {
        menuMode.value = layoutStore.layoutConfig.menuMode;
    }
    if (localStorage.getItem("menuStyle")) {
        menuStyle.value = localStorage.getItem("menuStyle");
        setMenuStyle();
    } else {
        menuStyle.value = layoutStore.layoutConfig.menuStyle;
    }
    if (localStorage.getItem("activeMenuStyle")) {
        activeMenuStyle.value = localStorage.getItem("activeMenuStyle");
        setActiveMenuStyle();
    } else {
        activeMenuStyle.value = layoutStore.layoutConfig.activeMenuStyle;
    }
});

const setTheme = () => {
    layoutStore.onChangeTheme(theme.value);
    localStorage.setItem("layoutTheme", theme.value);
};

const setTone = () => {
    layoutStore.onChangeTone(tone.value);
    localStorage.setItem("layoutTone", tone.value);
};

const setMenuMode = () => {
    layoutStore.layoutConfig.menuMode = menuMode.value;
    localStorage.setItem("menuMode", menuMode.value);
};

const setMenuStyle = () => {
    layoutStore.layoutConfig.menuStyle = menuStyle.value;
    localStorage.setItem("menuStyle", menuStyle.value);
};

const setActiveMenuStyle = () => {
    layoutStore.layoutConfig.activeMenuStyle = activeMenuStyle.value;
    localStorage.setItem("activeMenuStyle", activeMenuStyle.value);
};

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
