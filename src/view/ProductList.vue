<template>
    <DataTable
        class="table-view"
        v-model:filters="filters"
        :value="products"
        :globalFilterFields="['name', 'total_stok']"
        style="width: 100%"
        paginator
        :rows="5"
    >
        <template #header>
            <div class="modal-header">
                <h5 style="margin-bottom: 0">Daftar Produk</h5>
                <span class="d-sideicon-set d-input-iconleft">
                    <span class="material-symbols-outlined"> search </span>
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
                <div>{{ slotProps.data.size }} {{ slotProps.data.uom }}</div>
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
                <Button
                    :label="
                        cartProductId.includes(slotProps.data.id)
                            ? 'in Cart'
                            : 'Tambah'
                    "
                    :class="{
                        'd-button-disabled': cartProductId.includes(
                            slotProps.data.id
                        ),
                    }"
                    :disabled="cartProductId.includes(slotProps.data.id)"
                    @click="addToCart(slotProps.data)"
                />
            </template>
        </Column>
    </DataTable>

    <DataView :value="products" class="list-view">
        <template #header>
            <h5 style="margin-top: 0">Daftar Produk</h5>
            <div class="search">
                <span class="d-sideicon-set d-input-iconleft">
                    <span class="material-symbols-outlined"> search </span>
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
                        <div class="image" style="width: 4rem; height: 5rem">
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
                                    item.uom === "grams" ? "gr" : item.uom
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
                            <Button
                                :label="
                                    cartProductId.includes(item.id)
                                        ? 'in Cart'
                                        : 'Tambah'
                                "
                                :class="{
                                    'd-button-disabled': cartProductId.includes(
                                        item.id
                                    ),
                                }"
                                :disabled="cartProductId.includes(item.id)"
                                @click="addToCart(item)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";
const baseUrl = import.meta.env.VITE_BASE_URL;
const props = defineProps({
    products: null,
    cartProductId: null,
});
const emit = defineEmits(["addToCart"]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const searchProduct = ref("");

const filteredProduct = (id) => {
    let _filteredProduct = props.products
        ? props.products
              .filter((item) =>
                  item.name
                      .toLowerCase()
                      .includes(searchProduct.value.toLowerCase())
              )
              .map((item) => item.id)
        : props.products;
    return !_filteredProduct.includes(id);
};

const addToCart = (data) => {
    data.amount = 1;
    emit("addToCart", data);
};

//
</script>

<style scoped lang="scss">
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
    .products-list {
        max-height: 35rem;
        overflow-y: auto;
        padding-right: 10px;
    }
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

    &:not(:first-of-type) {
        border-top: 2px dashed var(--surface-input-border);
    }

    &:hover {
        border-left: 2px solid var(--primary-a);
    }

    &:nth-child(odd) {
        box-shadow: 0 0 0 100vmax var(--primary-a0);
        clip-path: inset(0 -100vmax);
        background: var(--primary-a0);
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
