<template>
    <h5 v-if="!props.selectedDepo" class="page-title">Tambah Depo</h5>
    <span v-if="!props.selectedDepo" class="page-subtitle"
        >Tambah depo baru.</span
    >

    <h5 v-if="props.selectedDepo" class="page-title">Ubah Depo</h5>
    <span v-if="props.selectedDepo" class="page-subtitle"
        >Ubah depo dengan kode {{ props.selectedDepo.code }}</span
    >

    <div class="grid">
        <div class="d-card">
            <form @submit="onSubmit">
                <div class="input-grid">
                    <div class="input-item">
                        <label for="address">Alamat</label>
                        <InputText
                            v-model="address"
                            v-bind="addressAtt"
                            id="address"
                            placeholder="Alamat depo"
                        />
                        <small v-if="errors.address" class="d-error">
                            {{ errors.address }}
                        </small>
                    </div>
                    <div class="input-item">
                        <label for="prov">Provinsi</label>
                        <Dropdown
                            v-model="province"
                            v-bind="provinceAtt"
                            :options="provOpt"
                            inputId="prov"
                            placeholder="Pilih Provinsi"
                            @update:modelValue="getCityOpt()"
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
                            placeholder="Pilih Kota"
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
                        v-if="!props.selectedDepo"
                        type="submit"
                        icon="save"
                        label="Simpan"
                    />
                    <Button
                        v-if="props.selectedDepo"
                        severity="danger"
                        label="Batal"
                        @click="onCancelEdit"
                    />
                    <Button
                        v-if="props.selectedDepo"
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
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useLocationStore } from "../store/LocationStore";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const props = defineProps({
    selectedDepo: null,
});

const initialData = {
    address: props.selectedDepo ? props.selectedDepo.address : null,
    province: props.selectedDepo ? props.selectedDepo.province : null,
    city: props.selectedDepo ? props.selectedDepo.city : null,
};

const toast = useToast();
const locationStore = useLocationStore();
const validationSchema = yup.object({
    address: yup.string().required("Alamat wajib diisi"),
    province: yup.string().required("Provinsi wajib diisi"),
    city: yup.string().required("Kota wajib diisi"),
});
const { errors, handleSubmit, defineField } = useForm({
    validationSchema,
    initialValues: initialData,
});
const [province, provinceAtt] = defineField("province");
const [city, cityAtt] = defineField("city");
const [address, addressAtt] = defineField("address");

const provOpt = ref([]);
const cityOpt = ref([]);

onMounted(async () => {
    await locationStore.GET__PROVINCE();
    provOpt.value = locationStore.PROVINCES_NAME;
});
const getCityOpt = async () => {
    await locationStore.GET__CITY(
        locationStore.__GET_PROVINCE_ID_BY_NAME(province.value)
    );
    cityOpt.value = locationStore.CITIES_NAME;
};

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    if (!props.selectedDepo) {
        // Add New
        console.log(values);
        toast.add({
            severity: "success",
            summary: "Sukses Ditambahkan",
            detail: "Data sales berhasil ditambahkan.",
            life: 3000,
        });
    } else {
        // Submit Edit
        console.log(values);
        toast.add({
            severity: "success",
            summary: "Sukses Diperbarui",
            detail: "Data sales berhasil diperbarui.",
            life: 3000,
        });
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
.submit-button {
    display: flex;
    justify-content: end;
    margin-top: 2rem;
}
</style>
