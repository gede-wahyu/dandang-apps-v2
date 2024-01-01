<template>
    <form @submit.prevent="handlePasswordChange">
        <div class="user-setting-input">
            <div class="input-group">
                <label for="password">Password</label>
                <span
                    class="d-sideicon-set d-input-iconright"
                    style="width: 100%"
                >
                    <Password
                        inputId="password"
                        v-model="password"
                        :disabled="!changePassword"
                        v-bind="passwordAttrs"
                        :feedback="false"
                        :inputStyle="{ width: '100%' }"
                        style="width: 100%"
                        toggleMask
                    />
                </span>
                <small class="d-error">{{ errors.password }}</small>
            </div>
            <div class="input-group">
                <label for="passwordConfirmation">Confirm Password</label>
                <span
                    class="d-sideicon-set d-input-iconright"
                    style="width: 100%"
                >
                    <Password
                        inputId="passwordConfirmation"
                        v-model="passwordConfirmation"
                        :disabled="!changePassword"
                        v-bind="passwordConfirmationAttrs"
                        :feedback="false"
                        :inputStyle="{ width: '100%' }"
                        style="width: 100%"
                        toggleMask
                    />
                </span>
                <small class="d-error">{{ errors.passwordConfirmation }}</small>
            </div>
        </div>
        <div class="user-setting-group-card-footer">
            <Button
                v-if="changePassword"
                label="Batal"
                severity="danger"
                @click="cancelChangePassword()"
            />
            <Button
                v-if="changePassword"
                type="submit"
                label="Simpan"
                severity="success"
            />
            <Button
                v-if="!changePassword"
                label="Ubah"
                @click="changePassword = true"
            />
        </div>
    </form>
</template>

<script setup>
import { useAuthStore } from "../../store/AuthStore";
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore();
const changePassword = ref(false);
const initialValues = () => {
    return {
        password: null,
        passwordConfirmation: null,
    };
};

const { resetForm, errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        password: yup
            .string()
            .min(6, "Minimal 6 karakter")
            .required("Password wajib diisi"),
        passwordConfirmation: yup
            .string()
            .required("Password wajib diisi")
            .oneOf([yup.ref("password")], "Password tidak cocok"),
    }),
    initialValues: initialValues(),
});
const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, passwordConfirmationAttrs] = defineField(
    "passwordConfirmation"
);

const handlePasswordChange = handleSubmit(() => {
    changePassword.value = false;
});
const cancelChangePassword = () => {
    changePassword.value = false;
    password.value = null;
    resetForm({
        values: initialValues(),
    });
};
</script>

<style scoped lang="scss">
.user-setting-input {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    row-gap: 1rem;

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .input-group-button-set {
            display: flex;
            gap: 0.5rem;
        }
    }
}

.user-setting-group-card-footer {
    display: flex;
    justify-content: end;
    margin-top: 1rem;
    gap: 1rem;
}

@media screen and (max-width: 640px) {
    .user-setting-input {
        grid-template-columns: 1fr;
    }
}
</style>
