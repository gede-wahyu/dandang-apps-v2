<template>
    <h5 class="page-title">Daftar Produk</h5>
    <span class="page-subtitle">Daftar seluruh produk yang dimiliki.</span>

    <div class="d-card">
        <div class="data-header-wrapper">
            <div class="data-header">
                <h5>Daftar Produk</h5>
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

        <div class="products">
            <div class="products-table">
                <div class="table-wrapper">
                    <table class="d-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>Gambar</th>
                                <th>Varian</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <!-- <th></th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products">
                                <td class="d-capitalize">
                                    <span>{{ item.name }}</span>
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
                                    <span class="d-tag d-tag-success"
                                        >{{ item.stock }} item</span
                                    >
                                </td>
                                <td>
                                    <span>{{
                                        formatCurrency(item.price)
                                    }}</span>
                                </td>
                                <!-- <td>
                                    <Button label="Detail" />
                                </td> -->
                            </tr>
                        </tbody>
                        <!-- table skeleton -->
                        <tr></tr>
                        <!-- table skeleton -->
                    </table>
                </div>
            </div>
            <div class="products-list">
                <div v-for="item in products" class="products-list-item">
                    <div class="item-image">
                        <img
                            :src="`${baseUrl}/${item.image}`"
                            :alt="item.image"
                            class="img-style"
                        />
                    </div>
                    <div class="item-name">
                        <span class="d-capitalize">{{ item.name }}</span>
                    </div>
                    <div class="item-tag">
                        <span class="d-tag d-lowercase"
                            >{{ item.size }} {{ formatUom(item.uom) }}</span
                        >
                    </div>
                    <div class="item-stock">
                        <span>{{ item.stock }} item</span>
                    </div>
                    <div class="item-price">
                        <span>{{ formatCurrency(item.price) }}</span>
                    </div>
                    <div class="item-button">
                        <Button label="Detail" />
                    </div>
                </div>
                <!-- list skeleton -->
                <!-- list skeleton -->
            </div>

            <div class="products-paginator">
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
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../store/ProductStore";

const baseUrl = import.meta.env.VITE_BASE_URL;
const productStore = useProductStore();
const rowPerPage = ref(5);
const currPage = ref(0);
const rowLenghtPostFilter = ref();
const filters = ref({
    value: null,
    fields: ["name", "size", "uom", "stock", "price"],
});
const products = computed(() => {
    let data = productStore.products;

    data = productStore.filterData(data, filters.value);

    rowLenghtPostFilter.value = data.length;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});

onMounted(async () => {
    await productStore.GET__PRODUCTS();
    productStore.isLoading = false;
});

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
.img-style {
    width: 4rem;
    height: 5rem;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-set);
}

.products-list {
    display: none;
}

.products-list-item {
    padding: 1.5rem 0;
    display: grid;
    grid-template-columns: 4rem 2fr 1fr;
    column-gap: 1rem;
    row-gap: 0.5rem;
    grid-template-areas:
        "item-image item-name item-price"
        "item-image item-tag item-button"
        "item-image item-stock item-button";

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

    .item-image {
        grid-area: item-image;
        align-self: center;
    }
    .item-name {
        grid-area: item-name;
    }
    .item-tag {
        grid-area: item-tag;
    }
    .item-stock {
        grid-area: item-stock;
    }
    .item-price {
        grid-area: item-price;
        justify-self: end;
        align-self: end;
    }
    .item-button {
        grid-area: item-button;
        justify-self: end;
        align-self: center;
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
    .products-table {
        display: none;
    }

    .products-list {
        display: flex;
        flex-direction: column;
    }

    .products-paginator {
        border-top: 1px solid var(--surface-tborder);
    }
}
</style>
