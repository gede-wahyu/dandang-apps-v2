<template>
    <span class="d-inputpassword-set">
        <input
            class="d-inputpassword p-inputtext"
            :class="inputClass"
            :type="type"
            :name="inputId"
            :id="inputId"
            :placeholder="placeholder"
            v-bind="$attrs"
            @input="emit('update:modelValue', $event.target.value)"
            @keypress="emit('type')"
            :disabled="disabled"
        />
        <span
            class="material-symbols-outlined d-inputpassword-eye"
            @click="togglePassword()"
        >
            {{ icon }}
        </span>
    </span>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["type", "update:modelValue"]);
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    inputId: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    inputClass: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const type = ref("password");
const icon = ref("visibility");
const togglePassword = () => {
    if (type.value === "text") {
        type.value = "password";
        icon.value = "visibility";
    } else {
        type.value = "text";
        icon.value = "visibility_off";
    }
};

//
</script>
