<template>
    <h5 class="page-title">Produk Sales</h5>
    <span class="page-subtitle"
        >Daftar produk yang sedang dibawa saler untuk dikirim atau dijual.</span
    >
    <div class="d-card">
        <div
            v-if="isAuthorize('selectSalerProducts')"
            class="select-saler-products"
        >
            <Dropdown
                v-model="saler"
                :options="sales"
                filter
                option-label="name"
                placeholder="Pilih saler"
                style="width: 17rem"
                @update:model-value="onSelectSalerProducts()"
            >
                <template #filtericon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        class="p-icon p-dropdown-filter-icon"
                    >
                        <path
                            d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
                        />
                    </svg>
                </template>
                <template #value="slotProps">
                    <span v-if="slotProps.value" class="d-capitalize">{{
                        slotProps.value.name
                    }}</span>
                </template>
                <template #option="slotProps">
                    <span class="d-capitalize">{{
                        slotProps.option.name
                    }}</span>
                </template>
            </Dropdown>
        </div>

        <div class="data-header-wrapper">
            <div class="data-header">
                <h5>Produk Saler</h5>
                <div class="tools-group">
                    <span class="d-sideicon-set d-input-iconleft">
                        <span class="material-symbols-outlined"> search </span>
                        <InputText
                            v-model="filters['value']"
                            placeholder="Cari produk"
                        />
                    </span>
                </div>
            </div>
        </div>

        <div class="saler-products">
            <div class="saler-products-table">
                <div class="table-wrapper">
                    <table class="d-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Gambar</th>
                                <th>Varian</th>
                                <th>Stok Saler</th>
                                <th>Stok Terjual</th>
                                <th>Stok Awal</th>
                                <th>Harga</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody v-if="!productStore.isLoading">
                            <tr v-for="item in salerProducts">
                                <td>
                                    <span class="d-capitalize">
                                        {{ item.name }}
                                    </span>
                                </td>
                                <td>
                                    <img
                                        class="img-style"
                                        :src="`${baseUrl}/${item.image}`"
                                        :alt="item.name"
                                    />
                                </td>
                                <td>
                                    <span class="d-tag d-lowercase">
                                        {{ item.size }}
                                        {{ formatUom(item.uom) }}
                                    </span>
                                </td>
                                <td>
                                    <span class="d-tag d-tag-warning"
                                        >{{ item.stock }} item</span
                                    >
                                </td>
                                <td>
                                    <span class="d-tag d-tag-success"
                                        >{{ item.stock }} item</span
                                    >
                                </td>
                                <td>
                                    <span>{{ item.stock }} item</span>
                                </td>
                                <td>
                                    <span>{{
                                        formatCurrency(item.price)
                                    }}</span>
                                </td>
                                <td>
                                    <span>{{
                                        formatCurrency(item.stock * item.price)
                                    }}</span>
                                </td>
                            </tr>
                        </tbody>

                        <!-- skeleton goes here -->
                        <ProdukSalerTableSkeleton
                            v-if="productStore.isLoading"
                            :row-per-page="rowPerPage"
                        />
                        <!-- skeleton end here -->

                        <!-- empty-template goes here -->
                        <tr
                            v-if="
                                !salerProducts.length && !productStore.isLoading
                            "
                            class="empty"
                        >
                            <td colspan="8">
                                <span v-if="!saler">
                                    Tidak ada data untuk ditampilkan. Pilih
                                    saler terlebih dahulu
                                </span>
                                <span v-if="saler">
                                    Tidak ada data untuk ditampilkan
                                </span>
                            </td>
                        </tr>
                        <!-- empty-template end here -->
                    </table>
                </div>
            </div>

            <div class="saler-products-list">
                <div
                    v-if="!productStore.isLoading"
                    v-for="item in salerProducts"
                    class="saler-products-item"
                >
                    <div class="spi-image">
                        <img
                            class="img-style"
                            :src="`${baseUrl}/${item.image}`"
                            :alt="`${item.name}`"
                        />
                    </div>
                    <div class="spi-name">
                        <span class="d-capitalize">{{ item.name }}</span>
                    </div>
                    <div class="spi-tag">
                        <span class="d-tag d-lowercase">
                            {{ item.size }} {{ formatUom(item.uom) }}
                        </span>
                    </div>
                    <div class="spi-stock">
                        <span>{{ `${item.stock}/${item.stock}` }} item</span>
                    </div>
                    <div class="spi-price">
                        <span>{{ formatCurrency(item.price) }}</span>
                    </div>
                </div>

                <!-- skeleton goes here -->
                <ProdukSalerListSkeleton
                    v-if="productStore.isLoading"
                    :rowPerPage="rowPerPage"
                />
                <!-- skeleton end here -->

                <!-- empty-template goes here -->
                <div
                    v-if="!salerProducts.length && !productStore.isLoading"
                    class="empty"
                >
                    <span v-if="!saler">
                        Tidak ada data untuk ditampilkan. Pilih saler terlebih
                        dahulu
                    </span>
                    <span v-if="saler"> Tidak ada data untuk ditampilkan </span>
                </div>
                <!-- empty-template end here -->
            </div>

            <div class="saler-products-paginator">
                <Paginator
                    v-model:first="currPage"
                    :rows="rowPerPage"
                    :total-records="rowLenghtPostFilter"
                    style="width: 100%"
                    :template="{
                        '575px':
                            'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        default:
                            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    }"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSalesStore } from "../store/SalesStore";
import { useProductStore } from "../store/ProductStore";
import { useAuthStore } from "../store/AuthStore";
import { useToast } from "primevue/usetoast";
import ProdukSalerTableSkeleton from "./skeleton/ProdukSalerTableSkeleton.vue";
import ProdukSalerListSkeleton from "./skeleton/ProdukSalerListSkeleton.vue";

const baseUrl = import.meta.env.VITE_BASE_URL;
const toast = useToast();
const salesStore = useSalesStore();
const productStore = useProductStore();
const { isAuthorize } = useAuthStore();
const filters = ref({
    value: null,
    fields: ["name", "size", "uom", "stock", "price"],
});
const rowPerPage = ref(5);
const currPage = ref(0);
const rowLenghtPostFilter = ref();
const sales = computed(() => {
    return salesStore.sales;
});
const salerProducts = computed(() => {
    let data = productStore.salerProducts;

    data = productStore.filterData(data, filters.value);

    rowLenghtPostFilter.value = data.length;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});
const saler = ref();

onMounted(async () => {
    await productStore.GET__SALES_PRODUCTS_BY_ID();
    productStore.isLoading = false;

    await salesStore.GET__SALES_SALER_PRODUCTS();
    salesStore.isLoading = false;
});
onUnmounted(() => {
    productStore.salerProducts = [];
});

const onSelectSalerProducts = async () => {
    if (!isAuthorize("selectSalerProducts")) return;

    productStore.salerProducts = [];
    await productStore.GET__SALES_PRODUCTS_BY_ID(saler.value["id"]);
    productStore.isLoading = false;

    if (!productStore.salerProducts.length)
        toast.add({
            severity: "warn",
            summary: "Pencarian Gagal",
            detail: `Data produk saler ${saler.value["name"]} tidak ada.`,
            life: 3000,
        });
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

const formatUom = (value) => {
    if (value.toLowerCase() === "grams" || value.toLowerCase() === "gram")
        return "gr";
    else return value;
};

//
</script>

<style scoped lang="scss">
.select-saler-products {
    margin-bottom: 1rem;
}
.img-style {
    width: 4rem;
    height: 5rem;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-set);
}

.saler-products-list {
    display: none;
}

.saler-products-item {
    padding: 1.5rem 0;
    display: grid;
    grid-template-columns: 4rem 1fr 1fr;
    column-gap: 1rem;
    row-gap: 0.5rem;
    grid-template-areas:
        "spi-image spi-name spi-price"
        "spi-image spi-tag spi-stock";

    &:not(:last-of-type) {
        border-bottom: 2px dashed var(--surface-input-border);
    }
    &:hover {
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: 3rem;
            left: -0.75rem;
            width: 4px;
            height: 2rem;
            border-radius: 99px;
            background-color: var(--primary);
        }
    }

    .spi-image {
        grid-area: spi-image;
        align-self: center;
    }
    .spi-name {
        grid-area: spi-name;
    }
    .spi-tag {
        grid-area: spi-tag;
    }
    .spi-stock {
        grid-area: spi-stock;
    }
    .spi-price {
        grid-row: spi-price;
    }
}

@media screen and (max-width: 575px) {
    .data-header {
        flex-direction: column;
        .tools-group {
            input {
                width: 100%;
            }
        }
    }
    .saler-products-table {
        display: none;
    }
    .saler-products-list {
        display: flex;
        flex-direction: column;
    }

    .empty {
        padding: 2rem 1rem;
        text-align: center;
        color: var(--text-color-secondary);
    }

    .saler-products-paginator {
        border-top: 1px solid var(--surface-tborder);
    }
}
</style>
