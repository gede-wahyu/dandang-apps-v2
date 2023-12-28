<template>
    <form @submit.prevent="handleUsernameChange">
        <div class="user-setting-input">
            <div class="input-group">
                <label for="username">Username</label>
                <InputText
                    v-model="username"
                    id="username"
                    :disabled="!editUsername"
                    v-bind="usernameAttrs"
                />
                <small class="d-error">{{ errors.username }}</small>
            </div>
        </div>
        <div class="user-setting-group-card-footer">
            <Button
                v-if="editUsername"
                label="Batal"
                severity="danger"
                @click="cancelEditUsername()"
            />
            <Button
                v-if="editUsername"
                type="submit"
                label="Simpan"
                severity="success"
            />
            <Button
                v-if="!editUsername"
                label="Ubah"
                @click="editUsername = true"
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
const editUsername = ref(false);
const initialValues = () => {
    return {
        username: authStore.auth.acc ? authStore.auth.acc.username : null,
    };
};

const { resetForm, errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required("Username wajib diisi"),
    }),
    initialValues: initialValues(),
});
const [username, usernameAttrs] = defineField("username");

const handleUsernameChange = handleSubmit(() => {
    editUsername.value = false;
});
const cancelEditUsername = () => {
    editUsername.value = false;
    resetForm({
        values: initialValues(),
    });
};
</script>

<style scoped lang="scss">
.user-setting-input {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    row-gap: 1rem;

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .input-group-button-set {
            display: flex;
            gap: 0.5rem;
            input {
                width: 100%;
            }
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
