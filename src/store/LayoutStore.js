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
            prevMenuMode: "",
            menuStyle: "sticky",
            activeMenuStyle: "rounded-right",
        },
        layoutState: {
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            configMenuActive: false,
            activeMenuTree: null,
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
        onChangeTone(tone) {
            const elementId = "tone-css";
            const linkElement = document.getElementById(elementId);
            const cloneLinkElement = linkElement.cloneNode(true);
            const newToneUrl = linkElement
                .getAttribute("href")
                .replace(this.layoutConfig.tone, tone);
            cloneLinkElement.setAttribute("id", elementId + "-clone");
            cloneLinkElement.setAttribute("href", newToneUrl);
            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", elementId);
                this.layoutConfig.tone = tone;
            });
            linkElement.parentNode.insertBefore(
                cloneLinkElement,
                linkElement.nextSibling
            );
        },
        onChangeTheme(theme) {
            const elementId = "theme-css";
            const linkElement = document.getElementById(elementId);
            const cloneLinkElement = linkElement.cloneNode(true);
            const newToneUrl = linkElement
                .getAttribute("href")
                .replace(this.layoutConfig.theme, theme);
            cloneLinkElement.setAttribute("id", elementId + "-clone");
            cloneLinkElement.setAttribute("href", newToneUrl);
            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", elementId);
            });
            linkElement.parentNode.insertBefore(
                cloneLinkElement,
                linkElement.nextSibling
            );
            this.layoutConfig.theme = theme;
        },
    },
});
