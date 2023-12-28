<template>
    <form @submit.prevent="handlePersonalChange">
        <div class="user-setting-input">
            <div class="input-group">
                <label for="name">Nama</label>
                <InputText
                    v-model="name"
                    id="name"
                    :disabled="!editPersonal"
                    v-bind="nameAttrs"
                />
                <small class="d-error">{{ errors.name }}</small>
            </div>
            <div class="input-group">
                <label for="email">Email</label>
                <InputText
                    v-model="email"
                    id="email"
                    :disabled="!editPersonal"
                    v-bind="emailAttrs"
                />
                <small class="d-error">{{ errors.email }}</small>
            </div>
            <div class="input-group">
                <label for="addr">Alamat</label>
                <InputText
                    v-model="addr"
                    id="addr"
                    :disabled="!editPersonal"
                    v-bind="addrAttrs"
                />
                <small class="d-error">{{ errors.addr }}</small>
            </div>
            <div class="input-group">
                <label for="phone">No Hp</label>
                <InputText
                    v-model="phone"
                    id="phone"
                    :disabled="!editPersonal"
                    v-bind="phoneAttrs"
                />
                <small class="d-error">{{ errors.phone }}</small>
            </div>
        </div>
        <div class="user-setting-group-card-footer">
            <Button
                v-if="editPersonal"
                label="Batal"
                severity="danger"
                @click="cancelEditPersonal()"
            />
            <Button
                v-if="editPersonal"
                type="submit"
                label="Simpan"
                severity="success"
            />
            <Button
                v-if="!editPersonal"
                label="Ubah"
                @click="editPersonal = true"
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
const editPersonal = ref(false);
const initialValues = () => {
    return {
        name: authStore.auth.user ? authStore.auth.user.nama : null,
        email: authStore.auth.user ? authStore.auth.user.email : null,
        addr: authStore.auth.user ? authStore.auth.user.alamat : null,
        phone: authStore.auth.user ? authStore.auth.user.no_hp : null,
    };
};

const { resetForm, errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("Nama wajib diisi"),
        email: yup
            .string()
            .email("Email harus valid")
            .required("Email wajib diisi"),
        addr: yup.string().required("Alamat wajib diisi"),
        phone: yup.string().required("No Hp wajib diisi"),
    }),
    initialValues: initialValues(),
});
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [addr, addrAttrs] = defineField("addr");
const [phone, phoneAttrs] = defineField("phone");

const handlePersonalChange = handleSubmit(() => {
    authStore.updatePersonalInfo({
        nama: name.value,
        email: email.value,
        alamat: addr.value,
        no_hp: phone.value,
    });
    editPersonal.value = false;
});
const cancelEditPersonal = () => {
    editPersonal.value = false;
    resetForm({
        values: initialValues(),
    });
};

//
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
