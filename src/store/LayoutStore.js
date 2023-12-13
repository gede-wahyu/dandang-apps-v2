import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layoutStore", {
    state: () => ({
        layoutConfig: {
            theme: "light-theme",
            tone: "tone-green",
            scale: 14,
            activeMenuItem: "",
            activePageName: "",
            menuMode: "static",
        },
        layoutState: {
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            configVisible: false,
        },
    }),
    getters: {
        isSidebarActive() {
            return this.layoutState.staticMenuMobileActive;
        },
    },
    actions: {
        setActiveMenuItem(name) {
            this.layoutConfig.activeMenuItem = name;
        },
        setActivePageName(name) {
            this.layoutConfig.activePageName = name;
        },
        toggleMenu() {
            if (window.innerWidth >= 992) {
                if (this.layoutConfig.menuMode === "overlay") {
                    this.layoutState.staticMenuMobileActive =
                        !this.layoutState.staticMenuMobileActive;
                } else {
                    this.layoutState.staticMenuDesktopInactive =
                        !this.layoutState.staticMenuDesktopInactive;
                }
            } else {
                this.layoutState.staticMenuMobileActive =
                    !this.layoutState.staticMenuMobileActive;
            }
        },
    },
});
