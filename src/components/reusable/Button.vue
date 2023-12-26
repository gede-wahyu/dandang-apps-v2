<template>
    <button
        :type="btntype"
        class="d-button"
        :class="btnClass"
        :disabled="disabled"
    >
        <div
            class="d-button-ins"
            :class="{ 'd-button-gap': icon && label }"
            :style="insStyle"
        >
            <span class="d-button-icon material-symbols-outlined">
                {{ icon }}
            </span>
            <span class="d-button-label">
                {{ label }}
            </span>
        </div>
    </button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    severity: {
        type: String,
        default: "primary",
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    outline: {
        type: Boolean,
        default: false,
    },
    insStyle: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    btntype: {
        type: String,
        default: "button",
    },
});
const btnClass = ref({
    "d-button-rounded": props.rounded && props.label,
    "d-button-rounded-icon": props.rounded && !props.label && props.icon,
    "d-button-outline": props.outline,
    "d-button-primary": props.severity === "primary",
    "d-button-danger": props.severity === "danger",
    "d-button-warning": props.severity === "warning",
    "d-button-info": props.severity === "info",
    "d-button-success": props.severity === "success",
    "d-button-unknown": props.severity === "unknown",
    "d-button-focus": !props.disabled,
    "d-button-active": !props.disabled,
    "d-button-hover": !props.disabled,
    "d-button-disabled": props.disabled,
    "d-button-icon-only": !props.label,
});
</script>
