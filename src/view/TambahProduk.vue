<template>
    <h5 class="page-title">Tambah Produk</h5>
    <span class="page-subtitle">Tambah jenis produk baru.</span>
    <div class="d-card">
        <form @submit="onSubmit">
            <div class="form">
                <div class="detail-field">
                    <div class="group-detail-field">
                        <div class="input-item">
                            <label for="name">Nama Produk</label>
                            <InputText
                                v-model="name"
                                v-bind="nameAtt"
                                id="name"
                                placeholder="Nama produk"
                            />
                            <small v-if="errors.name" class="d-error">{{
                                errors.name
                            }}</small>
                        </div>
                        <div class="input-item">
                            <label for="name">Stock Awal</label>
                            <InputNumber
                                v-model="stock"
                                v-bind="stockAtt"
                                inputId="stock"
                                placeholder="Stok awal produk"
                            />
                            <small v-if="errors.stock" class="d-error">{{
                                errors.stock
                            }}</small>
                        </div>
                        <div class="input-item">
                            <label for="price">Harga Produk</label>
                            <InputNumber
                                v-model="price"
                                v-bind="priceAtt"
                                inputId="price"
                                mode="currency"
                                currency="IDR"
                                locale="id-ID"
                                placeholder="Harga produk"
                            />
                            <small v-if="errors.price" class="d-error">{{
                                errors.price
                            }}</small>
                        </div>
                    </div>
                    <div class="group-detail-field">
                        <div class="input-item">
                            <label for="varian">Varian</label>
                            <InputNumber
                                v-model="varian"
                                v-bind="varianAtt"
                                inputId="varian"
                                :inputStyle="{ width: '100%' }"
                                placeholder="Varian produk"
                            />
                            <small v-if="errors.varian" class="d-error">{{
                                errors.varian
                            }}</small>
                        </div>
                        <div class="input-item">
                            <label for="uom">Satuan</label>
                            <InputText
                                v-model="uom"
                                v-bind="uomAtt"
                                id="uom"
                                placeholder="Satuan varian produk"
                            />
                            <div>
                                <small v-if="errors.uom" class="d-error">{{
                                    errors.uom
                                }}</small>
                                <small
                                    v-else
                                    style="color: var(--text-color-secondary)"
                                    >pcs, pack, renceng, box, slot</small
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-field">
                    <input
                        ref="inputImage"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        class="hidden"
                        @change="clickUploadImage"
                    />
                    <div
                        class="preview"
                        @drop.prevent="dropUploadImage"
                        @dragover.prevent
                    >
                        <div v-if="!image" class="message">
                            <span>Seret Gambar</span>
                            <span>atau</span>
                            <Button
                                label="Pilih dari Perangkat"
                                @click="inputImage.click()"
                            />
                        </div>
                        <div v-if="image" class="blob">
                            <img :src="imageUrl" alt="preview" />
                            <div class="blob-info">
                                <span class="label">Nama File</span>
                                <span class="info">{{ image.name }}</span>
                                <span class="label">Ukuran File</span>
                                <span class="info">{{
                                    formatFileSize(image.size)
                                }}</span>
                            </div>
                        </div>
                        <div v-if="image" class="delete">
                            <Button
                                icon="close"
                                severity="danger"
                                style="
                                    width: 1.7rem;
                                    height: 1.7rem;
                                    padding: 0;
                                "
                                @click="deleteImage"
                            />
                        </div>
                    </div>
                    <small v-if="imageError" class="d-error">{{
                        imageError
                    }}</small>
                </div>
            </div>
            <div class="submit-button">
                <Button
                    v-if="!props.selectedProduct"
                    type="submit"
                    icon="save"
                    label="Simpan"
                    @click="isImageError()"
                />
                <Button
                    v-if="props.selectedProduct"
                    label="Batal"
                    severity="danger"
                    @click="onCancelEdit"
                />
                <Button
                    v-if="props.selectedProduct"
                    type="submit"
                    icon="save"
                    label="Simpan Perubahan"
                    severity="warning"
                    @click="isImageError()"
                />
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";
import * as yup from "yup";
const baseUrl = import.meta.env.VITE_BASE_URL;

const router = useRouter();
const props = defineProps({
    selectedProduct: null,
});

const initialData = {
    name: props.selectedProduct ? props.selectedProduct.name : null,
    varian: props.selectedProduct ? parseInt(props.selectedProduct.size) : null,
    uom: props.selectedProduct ? props.selectedProduct.uom : null,
    stock: props.selectedProduct ? parseInt(props.selectedProduct.stock) : null,
    price: props.selectedProduct ? parseInt(props.selectedProduct.price) : null,
};

const toast = useToast();
const validationSchema = yup.object({
    name: yup.string().required("Nama produk wajib diisi"),
    varian: yup.string().required("Varian produk wajib diisi"),
    uom: yup.string().required("Satuan wajib diisi"),
    stock: yup.number().required("Stok awal wajib diisi"),
    price: yup.number().required("Harga produk wajib diisi"),
});
const { errors, handleSubmit, defineField } = useForm({
    validationSchema,
    initialValues: initialData,
});
const [name, nameAtt] = defineField("name");
const [varian, varianAtt] = defineField("varian");
const [uom, uomAtt] = defineField("uom");
const [stock, stockAtt] = defineField("stock");
const [price, priceAtt] = defineField("price");
const image = ref();
const inputImage = ref();
const imageUrl = ref();
const imageError = ref();

if (props.selectedProduct) {
    image.value = { name: props.selectedProduct.image, size: 0 };
    imageUrl.value = `${baseUrl}/${props.selectedProduct.image}`;
}

const dropUploadImage = (e) => {
    if (!isFileSizeOk(e.dataTransfer.files[0].size)) {
        toastError();
        return;
    }
    image.value = e.dataTransfer.files[0];
    createBlob();
};
const clickUploadImage = (e) => {
    if (!isFileSizeOk(e.target.files[0].size)) {
        toastError();
        return;
    }
    image.value = e.target.files[0];
    createBlob();
};
const createBlob = () => {
    if (image.value) {
        imageUrl.value = URL.createObjectURL(image.value);
        imageError.value = null;
    }
};
const isFileSizeOk = (size) => {
    if (size > 1024 * 1024) return false;
    return true;
};
const toastError = () => {
    toast.add({
        severity: "warn",
        summary: "Upload Gagal",
        detail: "Ukuran file terlalu besar. Maksimal 1MB",
        life: 3000,
    });
};
const deleteImage = () => {
    image.value = null;
    imageUrl.value = null;
};
const formatFileSize = (value) => {
    if (!value) value = 0;
    else if (value > 1024 * 1024)
        return (value / (1024 * 1024)).toFixed(2) + " MB";
    if (value > 1024) return (value / 1024).toFixed(2) + " KB";
    return value + " B";
};
const isImageError = () => {
    if (!image.value) imageError.value = "Gambar produk wajib diisi";
};

const onSubmit = handleSubmit(async (values, { resetForm }) => {
    if (!image.value) {
        isImageError();
        return;
    }

    if (!props.selectedProduct) {
        // Add New
        console.log("Success add", { ...values, image: image.value });
        toast.add({
            severity: "success",
            summary: "Sukses Ditambahkan",
            detail: "Data produk berhasil ditambahkan.",
            life: 3000,
        });
    } else {
        // Submit Edit
        console.log("Success edit", { ...values, image: image.value });
        toast.add({
            severity: "success",
            summary: "Sukses Diperbarui",
            detail: "Data produk berhasil diperbarui.",
            life: 3000,
        });
        router.push({ name: "product-list" });
    }

    resetForm();
    image.value = null;
    imageUrl.value = null;
});

const onCancelEdit = () => {
    router.go(-1);
};

//
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    display: flex;
    align-items: start;
    flex-wrap: wrap;
    gap: 2rem;

    .detail-field,
    .image-field {
        width: calc(50% - 1rem);
    }
}
.detail-field {
    display: flex;
    gap: 1.5rem;

    .group-detail-field {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
}
.input-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.submit-button {
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin-top: 1.5rem;
}
.image-field {
    .preview {
        padding: 1rem;
        width: 100%;
        min-height: 12.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        border: 2px dashed var(--primary);
        border-radius: var(--border-radius);
        margin-bottom: 0.5rem;

        .message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .blob {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1rem;

            img {
                max-height: 12rem;
                max-width: 20rem;
                object-fit: contain;
            }

            .blob-info {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                .label {
                    color: var(--text-color-secondary);
                }
                .info {
                    margin-bottom: 0.5rem;
                }
            }
        }
        .delete {
            margin: 1rem 0 auto 0;
        }
    }
}

@media screen and (max-width: 1120px) and (min-width: 768px) {
    .detail-field {
        flex-direction: column;
        .group-detail-field {
            width: 100%;
        }
    }
}
@media screen and (max-width: 767px) {
    .form {
        flex-direction: column;
        .detail-field {
            width: 100%;
        }
        .image-field {
            width: 100%;
        }
    }
}
@media screen and (max-width: 575px) {
    .detail-field {
        flex-direction: column;
        .group-detail-field {
            width: 100%;
        }
    }
}
</style>
