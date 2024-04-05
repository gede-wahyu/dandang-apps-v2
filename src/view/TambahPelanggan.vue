<template>
    <h5 v-if="!props.selectedCust" class="page-title">Tambah Pelanggan</h5>
    <span v-if="!props.selectedCust" class="page-subtitle"
        >Tambah pelanggan baru.</span
    >

    <h5 v-if="props.selectedCust" class="page-title">Ubah Pelanggan</h5>
    <span v-if="props.selectedCust" class="page-subtitle"
        >Ubah pelanggan dengan kode
        <span class="d-uppercase">{{ props.selectedCust.code }}</span></span
    >

    <div class="grid">
        <div class="d-card">
            <form @submit="onSubmit">
                <div class="input-grid">
                    <div class="input-item">
                        <label for="name">Nama</label>
                        <InputText
                            v-model="name"
                            v-bind="nameAtt"
                            id="name"
                            placeholder="Nama pelanggan"
                        />
                        <small v-if="errors.name" class="d-error">
                            {{ errors.name }}
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
                        <label for="province">Provinsi</label>
                        <Dropdown
                            v-model="province"
                            v-bind="provinceAtt"
                            :options="provinceOpt"
                            id="province"
                            placeholder="Pilih provinsi"
                            @update:modelValue="getCityOpt"
                        />
                        <small v-if="errors.province" class="d-error">
                            {{ errors.province }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="city">Kota</label>
                        <Dropdown
                            v-model="city"
                            v-bind="cityAtt"
                            :options="cityOpt"
                            inputId="city"
                            placeholder="Pilih kota"
                        >
                            <template #empty>
                                <span>Pilih provinsi terlebih dahulu.</span>
                            </template>
                        </Dropdown>
                        <small v-if="errors.city" class="d-error">
                            {{ errors.city }}
                        </small>
                    </div>
                </div>
                <div class="submit-button gap-1">
                    <Button
                        v-if="!props.selectedCust"
                        type="submit"
                        icon="save"
                        label="Simpan"
                    />
                    <Button
                        v-if="props.selectedCust"
                        severity="danger"
                        label="Batal"
                        @click="onCancelEdit"
                    />
                    <Button
                        v-if="props.selectedCust"
                        type="submit"
                        severity="warning"
                        icon="save"
                        label="Simpan Perubahan"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import { useLocationStore } from "../store/LocationStore";

const toast = useToast();
const locationStore = useLocationStore();
const router = useRouter();
const props = defineProps({
    selectedCust: null,
});
const provinceOpt = ref([]);
const cityOpt = ref([]);

const initialData = {
    name: props.selectedCust ? props.selectedCust.name : null,
    address: props.selectedCust ? props.selectedCust.address : null,
    phone: props.selectedCust ? props.selectedCust.phone : null,
    province: props.selectedCust ? props.selectedCust.province : null,
    city: props.selectedCust ? props.selectedCust.city : null,
};

const validationSchema = yup.object({
    name: yup.string().required("Nama wajib diisi"),
    address: yup.string().required("Alamat wajib diisi"),
    phone: yup.string().required("No Hp wajib diisi"),
    province: yup.string().required("Provinsi wajib diisi"),
    city: yup.string().required("Kota wajib diisi"),
});
const { errors, handleSubmit, defineField } = useForm({
    validationSchema,
    initialValues: initialData,
});

const [name, nameAtt] = defineField("name");
const [address, addressAtt] = defineField("address");
const [phone, phoneAtt] = defineField("phone");
const [province, provinceAtt] = defineField("province");
const [city, cityAtt] = defineField("city");

onBeforeMount(async () => {
    await locationStore.GET__PROVINCE();
    provinceOpt.value = locationStore.PROVINCES_NAME;
});

const getCityOpt = async () => {
    await locationStore.GET__CITY(
        locationStore.__GET_PROVINCE_ID_BY_NAME(province.value)
    );
    cityOpt.value = locationStore.CITIES_NAME;
};

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    if (!props.selectedCust) {
        // Add New
        console.log(values);
        toast.add({
            severity: "success",
            summary: "Sukses Ditambahkan",
            detail: "Data pelanggan berhasil ditambahkan.",
            life: 3000,
        });
    } else {
        // Submit Edit
        console.log(values);
        toast.add({
            severity: "success",
            summary: "Sukses Diperbarui",
            detail: "Data pelanggan berhasil diperbarui.",
            life: 3000,
        });
        router.push({ name: "cust-list" });
    }
    resetForm();
});

const onCancelEdit = () => {
    router.go(-1);
};

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
</style>
