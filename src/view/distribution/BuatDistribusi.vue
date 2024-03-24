<template>
    <h5 class="page-title">Buat Distribusi</h5>
    <span class="page-subtitle">Tambahkan distribusi.</span>

    <div class="page-layout-wrapper">
        <div class="d-card">
            <div class="header-style">
                <h5>Pilih Produk</h5>
                <div class="header-tools">
                    <span class="d-sideicon-set d-input-iconleft filter-item">
                        <span class="material-symbols-outlined"> search </span>
                        <InputText
                            v-model="query"
                            placeholder="Cari Produk"
                            style="width: 100%"
                        />
                    </span>
                    <div class="grid-setting button-group">
                        <span
                            class="span-nav-button"
                            :class="{ active: !gridView }"
                            role="button"
                            tabindex="0"
                            @click="onChangeViewMode(false)"
                        >
                            <span class="material-symbols-outlined">
                                menu
                            </span>
                        </span>
                        <span
                            class="span-nav-button"
                            :class="{ active: gridView }"
                            role="button"
                            tabindex="0"
                            @click="onChangeViewMode(true)"
                        >
                            <span class="material-symbols-outlined">
                                grid_view
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div
                v-if="products.length"
                class="d-list"
                :class="{ 'grid-view': gridView }"
            >
                <div
                    v-for="item in products"
                    class="list-item"
                    :class="{ 'li-in-cart': isProductInCart(item.id) }"
                >
                    <div class="product-image">
                        <img
                            :src="`${baseUrl}/${item.image}`"
                            :alt="item.nama"
                            class="img-style"
                        />
                    </div>
                    <div class="product-name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="product-tag">
                        <span class="d-tag">
                            {{ item.size }} {{ formatUom(item.uom) }}
                        </span>
                    </div>
                    <div class="product-stock">
                        <span>{{ item.stock }} item</span>
                    </div>
                    <div class="product-price">
                        <span>{{
                            formatCurrency(item.price, "products")
                        }}</span>
                    </div>
                    <div v-if="!gridView" class="product-button">
                        <Button
                            v-if="!isProductInCart(item.id)"
                            label="Tambah"
                            @click="addToCart(item)"
                        />
                        <div v-else class="pb-in-cart-state">
                            <div class="d-plusmin-button-set">
                                <Button
                                    icon="remove"
                                    @click="reduceAmountProductInCart(item.id)"
                                />
                                <InputNumber
                                    class="d-plusmin-input"
                                    v-model="
                                        cart[findIndexOfProductInCart(item.id)]
                                            .amount
                                    "
                                    :min="1"
                                    :max="parseInt(item.stock)"
                                    @update:modelValue="saveCartToLocal()"
                                />
                                <Button
                                    icon="add"
                                    @click.prevent="
                                        addAmoutProductInCart(item.id)
                                    "
                                />
                            </div>
                            <Button label="Tambah" @click="addToCart(item)" />
                        </div>
                    </div>
                    <div v-else class="product-button">
                        <Button
                            v-if="isProductInCart(item.id)"
                            icon="shopping_cart"
                            @click="addToCart(item)"
                        />
                        <Button
                            v-else
                            icon="shopping_cart"
                            outline
                            @click="addToCart(item)"
                        />
                    </div>
                    <div
                        class="grid-item-wrapper"
                        @click="addToCart(item)"
                    ></div>
                </div>
            </div>
            <div v-if="!products.length" class="empty">
                Tidak ada data untuk ditampilkan
            </div>
            <div v-if="!rowLenghtPostFilter <= rowPerPage" class="paginator">
                <Paginator
                    v-model:first="currPage"
                    :rows="rowPerPage"
                    :total-records="rowLenghtPostFilter"
                    style="width: 100%"
                    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                >
                    <template #start>
                        <div class="paginator-side" style="width: 4.4rem"></div>
                    </template>
                    <template #end>
                        <div class="paginator-side">
                            <Dropdown
                                v-model="rowPerPage"
                                :options="rowPerPageOpt"
                            />
                        </div>
                    </template>
                </Paginator>
            </div>
        </div>

        <div class="d-card cart" :class="{ 'cart-modal-active': cartModal }">
            <div v-if="cartModal" class="transaction-header-modal">
                <div class="header">
                    <h5>Buat Transaksi</h5>
                    <span
                        class="span-nav-button"
                        role="button"
                        tabindex="0"
                        @click="closeCart()"
                    >
                        <span class="material-symbols-outlined"> close </span>
                    </span>
                </div>
            </div>
            <div class="transaction">
                <div class="trans-section info-input">
                    <h5>Informasi Distribusi</h5>
                    <div class="input-grid">
                        <div class="input-item">
                            <label for="name">Nama Sales</label>
                            <div class="flex gap-0">
                                <InputText
                                    v-model="sales.name"
                                    id="name"
                                    placeholder="Nama Sales"
                                    disabled
                                />
                                <Button icon="search" @click="openSalesModal" />
                            </div>
                        </div>
                        <div class="input-item">
                            <label for="code">Kode Sales</label>
                            <InputText
                                v-model="sales.code"
                                id="code"
                                placeholder="Kode Sales"
                                disabled
                            />
                        </div>
                        <div class="input-item">
                            <label for="type">Tipe Sales</label>
                            <InputText
                                v-model="sales.seller_type"
                                id="type"
                                placeholder="Tipe Sales"
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div class="trans-section info-cart">
                    <div class="table-wrapper">
                        <div v-if="!cart.length" class="cart-none">
                            Belum ada produk dipilih.
                        </div>
                        <div v-else class="cart-list">
                            <div v-for="item in cart" class="cart-item">
                                <div class="cart-product-name">
                                    <span>{{ item.name }}</span>
                                </div>
                                <div class="cart-product-tag">
                                    <span class="d-tag d-lowercase">
                                        {{ item.size }}
                                        {{ formatUom(item.uom) }}
                                    </span>
                                </div>
                                <div class="cart-product-price">
                                    <span>{{
                                        formatCurrency(item.price)
                                    }}</span>
                                </div>
                                <div class="cart-product-subtotal">
                                    <span>
                                        {{
                                            formatCurrency(
                                                item.price * item.amount
                                            )
                                        }}
                                    </span>
                                </div>
                                <div class="cart-product-editamount">
                                    <div class="d-plusmin-button-set">
                                        <Button
                                            icon="remove"
                                            @click="
                                                reduceAmountProductInCart(
                                                    item.id
                                                )
                                            "
                                        />
                                        <InputNumber
                                            class="d-plusmin-input"
                                            v-model="item.amount"
                                            :min="1"
                                            :max="parseInt(item.stock)"
                                            @update:modelValue="
                                                saveCartToLocal()
                                            "
                                        />
                                        <Button
                                            icon="add"
                                            @click.prevent="
                                                addAmoutProductInCart(item.id)
                                            "
                                        />
                                    </div>
                                </div>
                                <div class="cart-product-removebutt">
                                    <Button
                                        icon="close"
                                        severity="danger"
                                        @click="removeProductFromCart(item.id)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="trans-section info-summary">
                    <div v-if="!cart.length" class="summary-none">
                        Tambah produk untuk melihat ringkasan.
                    </div>
                    <div v-else class="summary-list">
                        <div class="summary-item">
                            <h5 style="margin: 0">Ringkasan Distribusi</h5>
                        </div>
                        <div class="summary-item">
                            <span>Total Item</span>
                            <span>{{
                                formatCurrency(totalAmountOfCart())
                            }}</span>
                        </div>
                        <div class="summary-item">
                            <span>Total Harga</span>
                            <span>{{
                                formatCurrency(totalAmountOfCart())
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="trans-section submit-button">
                    <Button
                        label="Reset Distribusi"
                        severity="danger"
                        @click="resetTrans()"
                    />
                    <Button
                        label="Buat Distribusi"
                        severity="success"
                        @click="onSubmitTransaction()"
                    />
                </div>
            </div>
        </div>
    </div>

    <Dialog
        v-model:visible="salesModal"
        header=" "
        :modal="true"
        :style="{ width: '60rem' }"
        :breakpoints="{ '992px': '50rem', '768px': '90vw', '640px': '100vw' }"
        dismissableMask
    >
        <FragmentSales
            :sales-data="salesData"
            @onChangePage="onChangeSalesPage($event)"
            @onSelectSales="onSelectCust($event)"
            @onSearch="onSearchSales($event)"
        />
    </Dialog>

    <div class="cart-bar" @click="openCart">
        <div class="cart-icon">
            <span class="material-symbols-outlined"> shopping_cart </span>
        </div>
        <div class="cart-item-amount">
            <span>Total {{ totalProductOfCart() }} item</span>
        </div>
        <div class="cart-total-amount">
            <span>{{ formatCurrency(totalAmountOfCart()) }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../../store/ProductStore";
import { useSalesStore } from "../../store/SalesStore";
import { useToast } from "primevue/usetoast";
import FragmentSales from "../FragmentSales.vue";
const baseUrl = import.meta.env.VITE_BASE_URL;

// for PRODUCT-PICK
const productStore = useProductStore();
const salesStore = useSalesStore();
const toast = useToast();
const gridView = ref(false);
const query = ref(null);
const fieldToFilter = ref(["name", "price", "size", "stock"]);
const rowPerPageOpt = ref([7, 8, 9, 10]);
const rowPerPage = ref(7);
const currPage = ref(0);
const rowLenghtPostFilter = ref(0);
const products = computed(() => {
    let data = productStore.getProductsForTransaction;

    data = filterData(data, query.value);

    rowLenghtPostFilter.value = data.length;

    if (rowLenghtPostFilter.value <= rowPerPage.value) return data;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});

const salesData = ref();
const sales = ref({});
const salesFilter = ref({
    search: "",
});
const salesModal = ref(false);

// for CUST-PICK
const cust = ref(null);
const dispCust = ref(null);

// for CART
const newCust = ref(false);
const newCustData = ref({});
const payment = ref(null);
const downpayment = ref(null);
const cart = ref([]);
const cartModal = ref(false);

onMounted(async () => {
    await productStore.GET__PRODUCTS_TRANSACTION();
    productStore.isLoading = false;
    await salesStore.GET__SALES(false, 5);
    salesData.value = salesStore.sales;

    if (localStorage.getItem("cart")) {
        cart.value = JSON.parse(localStorage.getItem("cart"));
    }
});

const onSearchSales = async (e) => {
    salesFilter.value.search = e;
    await salesStore.GET__SALES(false, 5, salesFilter.value);
    salesData.value = salesStore.sales;
};

const onChangeSalesPage = async (e) => {
    await salesStore.GET__SALES(e, 5, salesFilter.value);
    salesData.value = salesStore.sales;
};

const onSelectCust = (e) => {
    sales.value = e;
    salesModal.value = false;
};

const onChangeViewMode = (grid) => {
    gridView.value = grid;

    if (gridView.value) {
        rowPerPageOpt.value = [8, 12, 16, 20];
        if (window.innerWidth < 575) rowPerPage.value = 6;
        else rowPerPage.value = 16;
    } else {
        rowPerPage.value = 7;
        rowPerPageOpt.value = [7, 8, 9, 10];
    }
};

if (window.innerWidth < 575) onChangeViewMode(false);
else onChangeViewMode(true);

const openSalesModal = () => {
    salesModal.value = true;
};

const addToCart = (item) => {
    if (isProductInCart(item["id"])) {
        addAmoutProductInCart(item["id"]);
    } else {
        item["amount"] = 1;
        cart.value.push(item);
    }

    saveCartToLocal();
};

const addAmoutProductInCart = (productId) => {
    let pindex = findIndexOfProductInProducts(productId);
    let index = findIndexOfProductInCart(productId);
    if (products.value[pindex]["stock"] > cart.value[index]["amount"])
        cart.value[index]["amount"]++;
    else return;
};

const reduceAmountProductInCart = (productId) => {
    let index = findIndexOfProductInCart(productId);
    if (cart.value[index]["amount"] > 1) cart.value[index]["amount"]--;
    else removeProductFromCart(productId);
};

const removeProductFromCart = (productId) => {
    let index = findIndexOfProductInCart(productId);
    cart.value.splice(index, 1);

    saveCartToLocal();
};

const totalProductOfCart = () => {
    if (!cart.value.length) return 0;
    return cart.value.reduce((sum, p) => {
        return sum + p["amount"];
    }, 0);
};

const totalAmountOfCart = () => {
    if (!cart.value.length) return 0;
    return cart.value
        .map((item) => item.amount * item.price)
        .reduce((sum, item) => sum + item);
};

const isProductInCart = (productId) => {
    return getListOfIdProductInCart(productId).includes(productId);
};

const getListOfIdProductInCart = () => {
    return cart.value.map((item) => item["id"]);
};

const findIndexOfProductInCart = (productId) => {
    return getListOfIdProductInCart().indexOf(productId);
};

const findIndexOfProductInProducts = (productId) => {
    return products.value.map((item) => item["id"]).indexOf(productId);
};

const saveCartToLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
};

const isInvalidSubmit = () => {
    if (!cart.value.length) return "Pembelian minimal 1 produk";
    if (!sales.value["name"] || !sales.value["code"])
        return "Sales wajib diisi";
    return false;
};

const warnInvalid = (errm) => {
    toast.add({
        severity: "error",
        summary: "Distribusi Gagal",
        detail: errm,
        life: 3000,
    });
};

const onSubmitTransaction = () => {
    if (isInvalidSubmit()) warnInvalid(isInvalidSubmit());
    else {
        toast.add({
            severity: "success",
            summary: "Distribusi Berhasil",
            detail: "OK",
            life: 3000,
        });

        closeCart();
        resetTrans();
    }
};

const resetTrans = () => {
    cart.value = [];
    sales.value = {};

    localStorage.removeItem("cart");
};

const openCart = () => {
    cartModal.value = true;
};

const closeCart = () => {
    cartModal.value = false;
};

const formatCurrency = (value, from) => {
    if (from && gridView.value) {
        return new Intl.NumberFormat("id-ID").format(value);
    }
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

const filterData = (data, query) => {
    query = query || query === 0 ? query : "";
    return data.filter((item) => {
        for (let field of fieldToFilter.value) {
            if (
                item[field] &&
                item[field]
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase())
            ) {
                return true;
            }
        }
        return false;
    });
};

//
</script>

<style scoped lang="scss">
.page-layout-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
}

.header-style {
    padding: 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--surface-tborder);
    border-bottom: 1px solid var(--surface-tborder);

    h5 {
        margin-bottom: 0;
    }

    .header-tools {
        display: flex;
        gap: 0.5rem;
    }

    .filter-item {
        width: 15rem;
    }
}

.paginator {
    padding-top: 0.5rem;
    border-top: 1px solid var(--surface-tborder);
}

.button-group {
    display: flex;
    scale: 0.8;
    border-collapse: collapse;
    .span-nav-button:first-of-type {
        border: 1px solid var(--surface-input-border);
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .span-nav-button:last-of-type {
        border: 1px solid var(--surface-input-border);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .span-nav-button.active {
        background-color: var(--primary);
        border-color: var(--primary);
        color: var(--text-primary);
    }
}

.d-list {
    display: grid;
}
.empty {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--text-color-secondary);
}

.d-list.grid-view {
    padding: 1rem 0;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    row-gap: 1.5rem;
}

.list-item {
    padding: 1rem 1rem;

    &:not(:last-of-type) {
        border-bottom: 2px dashed var(--surface-input-border);
    }

    display: grid;
    grid-template-columns: min-content 1fr min-content;
    row-gap: 0.5rem;
    column-gap: 1rem;
    grid-template-areas:
        "product-image product-name product-price"
        "product-image product-tag product-button"
        "product-image product-stock product-button";
}

.product-image {
    grid-area: product-image;
    display: flex;
    align-items: center;
}
.product-name {
    grid-area: product-name;
    text-transform: capitalize;
}
.product-tag {
    grid-area: product-tag;

    span {
        text-transform: lowercase;
    }
}
.product-stock {
    grid-area: product-stock;
}
.product-price {
    grid-area: product-price;
    align-self: end;
    justify-self: end;
}
.product-button {
    grid-area: product-button;
    align-self: center;
    justify-self: end;

    .pb-in-cart-state {
        & > div {
            display: none;
        }
    }
}

.grid-view .list-item {
    width: min-content;
    justify-self: center;
    grid-template-columns: 1.5rem 3.5rem 3.5rem 1.5rem;
    column-gap: 0;
    grid-template-areas:
        "product-tag product-tag product-stock product-stock"
        "product-image product-image product-image product-image"
        "product-name product-name product-name product-name"
        "product-price product-price product-button product-button";

    border: 1px solid var(--surface-input-border);
    border-radius: var(--border-radius);
    transition: scale 0.2s ease;
    -webkit-tap-highlight-color: var(--primary-a0);

    &:hover {
        position: relative;
        scale: 1.05;
        .grid-item-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

    & .product-tag {
        justify-self: start;
    }
    & .product-stock {
        justify-self: end;
    }
    & .product-image {
        justify-self: center;
        align-self: end;
    }
    & .product-name {
        justify-self: center;
        text-align: center;
    }
    & .product-price {
        justify-self: start;
    }
    & .product-button {
        justify-self: end;
    }
}

.img-style {
    width: 4rem;
    height: 5rem;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-set);
}

.transaction {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.trans-section {
    &.info-input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &.info-summary {
        display: flex;
        justify-content: end;
    }

    &.submit-button {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
    }
}

.input-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    gap: 1rem;
}

.input-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
        width: 100%;
    }

    &.checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
}

.customer-options {
    display: flex;
    flex-direction: column;
    span:first-of-type {
        text-transform: capitalize;
    }
    span:nth-of-type(2),
    span:nth-of-type(3) {
        color: var(--text-color-secondary);
        text-transform: uppercase;
    }
}

.select-cust-input-group {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
        width: 100%;
    }
}

.cart-none,
.summary-none {
    width: 100%;
    color: var(--text-color-secondary);
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed var(--primary);
    border-radius: var(--border-radius);
}

.summary-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    overflow: hidden;
    .summary-item {
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &:nth-of-type(odd) {
            background-color: var(--primary-a1);
        }
    }
}

.cart-list {
    display: flex;
    flex-direction: column;
}

.cart-item {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: 3.5rem 3fr 1.5fr;
    row-gap: 0.5rem;
    grid-template-areas:
        "cart-product-removebutt cart-product-name cart-product-editamount"
        "cart-product-removebutt cart-product-tag cart-product-editamount"
        "cart-product-removebutt cart-product-price cart-product-subtotal";

    &:not(:last-of-type) {
        border-bottom: 2px dashed var(--surface-input-border);
    }
}

.cart-product-name {
    grid-area: cart-product-name;
    text-transform: capitalize;
}
.cart-product-tag {
    grid-area: cart-product-tag;
}
.cart-product-price {
    grid-area: cart-product-price;
}
.cart-product-editamount {
    grid-area: cart-product-editamount;
    align-self: center;
}
.cart-product-subtotal {
    grid-area: cart-product-subtotal;
}
.cart-product-removebutt {
    grid-area: cart-product-removebutt;
    align-self: center;
    justify-self: start;

    button {
        margin-left: 3px;
        padding: 0;
        height: 2rem;
        width: 2rem;
    }
}

.cart-bar {
    display: none;
}

@media screen and (min-width: 768px) {
    .d-list {
        &:not(.grid-view) .list-item.li-in-cart .product-name {
            &::after {
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-left: 0.5rem;
                border-radius: 50%;
                background-color: var(--primary);
            }
        }
    }
}

@media screen and (max-width: 767px) {
    .page-layout-wrapper {
        flex-direction: column;
    }
}

@media screen and (max-width: 575px) {
    .header-style {
        flex-direction: column;
        align-items: start;
        gap: 1rem;
        padding: 1rem 0;

        h5 {
            display: none;
        }

        .filter-item {
            width: 100%;
        }
    }

    .d-list:not(.grid-view) {
        .list-item {
            padding: 1rem 0;
        }
    }

    .product-button {
        .pb-in-cart-state {
            & > button {
                display: none;
            }
            & > div {
                display: flex;
            }
        }
    }

    .paginator-side {
        display: none;
    }

    .d-plusmin-button-set.product-button-item {
        flex-direction: column-reverse;
        button {
            width: 3.8rem;
        }
    }

    .input-grid {
        grid-template-columns: 1fr;
    }

    .cart-bar {
        width: calc(100vw - 5rem);
        padding: 1rem 1.5rem;

        position: fixed;
        bottom: 2rem;
        left: 2.5rem;
        z-index: 2;

        display: grid;
        grid-template-columns: min-content 3fr 4fr;
        column-gap: 0.75rem;

        background-color: var(--primary-a);
        border-radius: var(--border-radius);
        backdrop-filter: blur(4px);
        box-shadow: var(--box-shadow-set);
        user-select: none;

        &:hover {
            background-color: var(--primary-a7);
        }
    }

    .cart-icon {
        align-self: center;
    }
    .cart-item-amount {
        align-self: center;
    }
    .cart-total-amount {
        align-self: center;
        justify-self: end;
    }

    .d-card.cart:not(.cart-modal-active) {
        display: none;
    }

    .d-card.cart-modal-active {
        width: 100vw;
        height: 100vh;
        padding: 0;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 99;

        display: flex;
        align-items: end;
        background-color: rgba(0, 0, 0, 0.5);

        .transaction-header-modal {
            width: 100vw;
            padding: 1rem 1.5rem;
            position: fixed;
            left: 0;
            bottom: 70vh;
            background-color: var(--surface-card);
            box-shadow: var(--box-shadow-set);

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                h5 {
                    margin: 0;
                }
            }
        }
        .transaction {
            width: 100vw;
            height: 70vh;
            padding: 1.5rem 1.5rem 2rem 1.5rem;
            overflow-y: auto;
            background-color: var(--surface-card);
        }
    }
}
</style>
