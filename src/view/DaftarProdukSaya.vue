<template>
    <h5>Produk Saya</h5>
    <span
        style="
            color: var(--text-color-secondary);
            margin-bottom: 1rem;
            display: inline-block;
        "
        >Daftar produk yang dibawa saler untuk dikirim atau dijual.</span
    >
    <div class="d-card">
        <div
            v-if="isAuthorize('selectSalerProduct')"
            class="select-saler-products"
        >
            <Dropdown
                v-model="selectedSaler"
                :options="saler"
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
            </Dropdown>
        </div>
        <template v-if="productStore.isLoading">
            <ProductSkeleton header="Daftar Produk Saya" />
        </template>
        <template v-else>
            <DataTable
                class="table-view"
                v-model:filters="filters"
                :value="salerProducts.products"
                :globalFilterFields="['name', 'stock']"
                style="width: 100%"
                paginator
                :rows="5"
            >
                <template #header>
                    <div class="modal-header">
                        <h5 style="margin-bottom: 0">Daftar Produk Saya</h5>
                        <span class="d-sideicon-set d-input-iconleft">
                            <span class="material-symbols-outlined">
                                search
                            </span>
                            <InputText
                                v-model="filters['global'].value"
                                placeholder="Cari produk"
                            />
                        </span>
                    </div>
                </template>

                <Column header="Nama" style="width: 25%">
                    <template #body="slotProps">
                        <span class="product-datatext">
                            {{ slotProps.data.name }}
                        </span>
                    </template>
                </Column>
                <Column header="Gambar" style="width: 15%">
                    <template #body="slotProps">
                        <img
                            :src="`${baseUrl}/${slotProps.data.image}`"
                            :alt="slotProps.data.name"
                            style="
                                height: 5rem;
                                width: 5rem;
                                object-fit: cover;
                                border-radius: var(--border-radius);
                                box-shadow: var(--box-shadow-set);
                            "
                        />
                    </template>
                </Column>
                <Column header="Varian" style="width: 15%">
                    <template #body="slotProps">
                        <div>
                            {{ slotProps.data.size }} {{ slotProps.data.uom }}
                        </div>
                    </template>
                </Column>
                <Column header="Stok" style="width: 15%">
                    <template #body="slotProps">
                        <div>{{ slotProps.data.stock }}</div>
                    </template>
                </Column>
                <Column header="Harga" style="width: 15%">
                    <template #body="slotProps">
                        <div>
                            {{
                                new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(slotProps.data.price)
                            }}
                        </div>
                    </template>
                </Column>
                <Column>
                    <template #body="slotProps">
                        <Button label="Detail" />
                    </template>
                </Column>

                <template #empty>
                    <div class="empty-data">
                        Tidak ada produk ditemukan. Mohon pilih saler terlebih
                        dahulu.
                    </div>
                </template>
            </DataTable>

            <DataView
                :value="salerProducts.products"
                class="list-view"
                paginator
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <template #header>
                    <h5 style="margin-top: 0">Daftar Produk</h5>
                    <div class="search">
                        <span class="d-sideicon-set d-input-iconleft">
                            <span class="material-symbols-outlined">
                                search
                            </span>
                            <InputText
                                v-model="searchProduct"
                                placeholder="Cari produk"
                                @update:modelValue="filteredProduct()"
                            />
                        </span>
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="products-list">
                        <div
                            v-for="item in slotProps.items"
                            class="products-item"
                            :class="{ hidden: filteredProduct(item.id) }"
                        >
                            <div class="item-left">
                                <div
                                    class="image"
                                    style="width: 4rem; height: 5rem"
                                >
                                    <img
                                        :src="`${baseUrl}/${item.image}`"
                                        :alt="item.name"
                                        style="
                                            height: 5rem;
                                            width: 4rem;
                                            object-fit: cover;
                                            border-radius: var(--border-radius);
                                        "
                                    />
                                </div>
                                <div class="detail">
                                    <span>{{ item.name }}</span>
                                    <span
                                        >{{ item.size }}
                                        {{
                                            item.uom === "grams"
                                                ? "gr"
                                                : item.uom
                                        }}</span
                                    >
                                    <span>{{ item.stock }} pack</span>
                                </div>
                            </div>
                            <div class="item-right">
                                <div class="price">
                                    {{
                                        new Intl.NumberFormat("id-ID").format(
                                            item.price
                                        )
                                    }}
                                </div>
                                <div class="button">
                                    <Button label="Detail" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template #empty>
                    <div class="empty-data">
                        Tidak ada produk ditemukan. Mohon pilih saler terlebih
                        dahulu.
                    </div>
                </template>
            </DataView>
        </template>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useSalerStore } from "../store/SalerStore";
import { useProductStore } from "../store/ProductStore";
import { useAuthStore } from "../store/AuthStore";
import ProductSkeleton from "./skeleton/ProductSkeleton.vue";

const salerStore = useSalerStore();
const productStore = useProductStore();
const { isAuthorize } = useAuthStore();
const saler = ref();
const salerProducts = ref({});
const selectedSaler = ref();
const baseUrl = import.meta.env.VITE_BASE_URL;
const products = ref();
const searchProduct = ref("");
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(async () => {
    await productStore.getSalerProducts();
    salerProducts.value = productStore.salerProducts;
    productStore.isLoading = false;

    await salerStore.getSaler();
    saler.value = salerStore.saler;
    salerStore.isLoading = false;
});

const filteredProduct = (id) => {
    let _filteredProduct = salerProducts.value.products
        ? salerProducts.value.products
              .filter((item) =>
                  item.name
                      .toLowerCase()
                      .includes(searchProduct.value.toLowerCase())
              )
              .map((item) => item.id)
        : salerProducts.value.products;
    return !_filteredProduct.includes(id);
};

const onSelectSalerProducts = async () => {
    if (!isAuthorize("selectSalerProduct")) return;
    await productStore.getSalerProducts(selectedSaler.value.id);
    salerProducts.value = productStore.salerProducts;
    productStore.isLoading = false;
};

//
</script>
<style scoped lang="scss">
.select-saler-products {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.empty-data {
    color: var(--text-color-secondary);
    text-align: center;
    padding: 1rem 0;
}

.table-view {
    display: none;
}
@media screen and (min-width: 640px) {
    .table-view {
        display: contents;
    }
    .list-view {
        display: none;
    }
}
@media screen and (max-width: 991px) {
    .modal-header {
        flex-direction: column;
        gap: 1rem;
        align-items: start;

        & > span,
        input {
            width: 100%;
        }
    }
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.product-datatext {
    text-transform: capitalize;
}

.products-list {
    display: flex;
    flex-direction: column;
}
.search {
    width: 100%;
    padding-bottom: 1rem;

    input {
        width: 100%;
    }
}

.products-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0 1.5rem 5px;
    border-left: 2px solid transparent;
    position: relative;

    &:not(:first-of-type) {
        border-top: 2px dashed var(--surface-input-border);
    }

    &:hover {
        &::before {
            content: "";
            position: absolute;
            left: -0.75rem;
            width: 4px;
            height: 60%;
            border-radius: 99px;
            background-color: var(--primary);
        }
    }

    .item-left {
        display: flex;
        gap: 0.75rem;
        justify-content: start;
        align-items: center;

        .detail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 12rem;

            span:first-of-type {
                text-transform: capitalize;
                font-weight: 500;
            }
            span:nth-of-type(2) {
                display: flex;
                width: fit-content;
                padding: 3px 5px;
                background-color: var(--primary-a3);
                font-size: 0.7rem;
                color: var(--primary);
                border-radius: var(--border-radius);
            }
        }
    }
    .item-right {
        display: flex;
        flex-direction: column;
        justify-content: end;
        gap: 0.5rem;

        .price {
            text-align: right;
            font-weight: 500;
        }

        .button {
            button {
                padding: 0.75rem;
            }
        }
    }
}
</style>
