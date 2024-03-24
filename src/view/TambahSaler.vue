<template>
    <h5 class="page-title">Tambah Sales</h5>
    <span class="page-subtitle">Tambah sales baru.</span>
    <div class="grid">
        <div class="d-card">
            <form @submit="onSubmit">
                <div class="input-grid">
                    <!-- <div class="input-item">
                        <label for="code">Kode</label>
                        <div class="field--sales-code">
                            <InputText
                                v-model="code"
                                v-bind="codeAtt"
                                id="code"
                                placeholder="Kode sales"
                                disabled
                            />
                            <Button icon="add" @click="openCodeMaker()" />
                        </div>
                        <small v-if="errors.code" class="d-error">
                            {{ errors.code }}
                        </small>
                    </div> -->
                    <div class="input-item">
                        <label for="name">Nama</label>
                        <InputText
                            v-model="name"
                            v-bind="nameAtt"
                            id="name"
                            placeholder="Nama sales"
                        />
                        <small v-if="errors.name" class="d-error">
                            {{ errors.name }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="type">Tipe Sales</label>
                        <Dropdown
                            v-model="type"
                            v-bind="typeAtt"
                            :options="['Motor', 'Mobil', 'TO']"
                            inputId="type"
                            placeholder="Tipe sales"
                        />
                        <small v-if="errors.type" class="d-error">
                            {{ errors.type }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="address">Alamat</label>
                        <InputText
                            v-model="address"
                            v-bind="addressAtt"
                            id="address"
                            placeholder="Alamat sales"
                        />
                        <small v-if="errors.address" class="d-error">
                            {{ errors.address }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="phone">No Hp</label>
                        <InputText
                            v-model="phone"
                            v-bind="phoneAtt"
                            id="phone"
                            placeholder="No Hp sales"
                        />
                        <small v-if="errors.phone" class="d-error">
                            {{ errors.phone }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="email">Email</label>
                        <InputText
                            v-model="email"
                            v-bind="emailAtt"
                            id="email"
                            placeholder="Email sales"
                        />
                        <small v-if="errors.email" class="d-error">
                            {{ errors.email }}
                        </small>
                    </div>
                </div>
                <div class="submit-button">
                    <Button type="submit" icon="save" label="Simpan" />
                </div>
            </form>
        </div>
    </div>

    <!-- <Dialog
        v-model:visible="codeMaker"
        header="Periksa Kode Sales"
        :modal="true"
        :style="{ width: '35rem' }"
        :breakpoints="{ '768px': '70vw', '640px': '80vw' }"
        dismissableMask
    >
        <div class="checker-form">
            <label for="checker">Kode Sales</label>
            <div class="checker-field">
                <InputText
                    v-model="codeChecker"
                    id="checker"
                    placeholder="Periksa Kode Sales"
                />
                <Button label="Periksa" @click="checkCode()" />
            </div>
            <small>
                <span class="material-symbols-outlined"> question_mark </span>
                <span>Ketersediaan kode</span>
            </small>
        </div>
        <div class="checker-button">
            <Button label="Simpan Kode" />
        </div>
    </Dialog> -->
</template>

<script setup>
// import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const validationSchema = yup.object({
    // code: yup.string().required("Kode sales wajib diisi"),
    name: yup.string().required("Nama wajib diisi"),
    type: yup.string().required("Tipe sales wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),
    email: yup.string().email("Format email salah"),
    phone: yup.string().required("No Hp wajib diisi"),
});
const { errors, handleSubmit, defineField } = useForm({ validationSchema });
// const [code, codeAtt] = defineField("code");
const [name, nameAtt] = defineField("name");
const [type, typeAtt] = defineField("type");
const [address, addressAtt] = defineField("address");
const [email, emailAtt] = defineField("email");
const [phone, phoneAtt] = defineField("phone");

// const codeMaker = ref(false);

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    toast.add({
        severity: "success",
        summary: "Sukses",
        detail: "Data sales berhasil ditambahkan.",
        life: 3000,
    });
    console.log(values);
    resetForm();
});

// const openCodeMaker = () => {
//     codeMaker.value = true;
// };
// const checkCode = async () => {};

//
</script>

<style scoped lang="scss">
.grid {
    display: flex;
    flex-wrap: wrap;
    .d-card {
        max-width: 50rem;
    }
}
.input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 1.5rem;
}
.input-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.field--sales-code {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    input {
        width: 100%;
    }
}
.submit-button {
    display: flex;
    justify-content: end;
    margin-top: 2rem;
}
// .checker-form {
//     display: flex;
//     flex-direction: column;
//     gap: 0.5rem;
//     .checker-field {
//         display: flex;
//         gap: 0.5rem;
//         input {
//             width: 100%;
//         }
//     }
//     & + .checker-button {
//         margin-top: 2rem;
//         display: flex;
//         justify-content: end;
//     }
//     small {
//         display: flex;
//         align-items: center;

//         span:first-of-type {
//             font-size: 1rem;
//             margin-right: 0.5rem;
//         }
//     }
// }
</style>
