<template>
    <h5 class="page-title">Buat Transaksi</h5>
    <span class="page-subtitle"
        >Mendaftarkan transaksi baru untuk pelanggan.</span
    >
    <div class="page-layout-wrapper">
        <div class="d-card">
            <div class="table-wrapper">
                <table class="d-table">
                    <thead>
                        <tr>
                            <th>Produk</th>
                            <th>Varian</th>
                            <th>Stok</th>
                            <th>Harga</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in products">
                            <td>
                                <div class="produk">
                                    <img
                                        :src="`${baseUrl}/${item.image}`"
                                        :alt="item.name"
                                        class="table-img"
                                    />
                                    <span>{{ item.name }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="d-tag d-lowercase">
                                    {{ `${item.size} ${formatUom(item.uom)}` }}
                                </span>
                            </td>
                            <td>
                                <span>{{ item.stock }} item</span>
                            </td>
                            <td>
                                <span>{{ formatCurrency(item.price) }}</span>
                            </td>
                            <td>
                                <div>
                                    <Button
                                        label="Tambah"
                                        @click="addToCart(item)"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="paginator">
                <Paginator
                    v-model:first="currPage"
                    :rows="rowPerPage"
                    :total-records="rowLenghtPostFilter"
                    style="width: 100%"
                />
            </div>
        </div>

        <div class="d-card">
            <div class="transaction">
                <div class="trans-section info-input">
                    <h5>Informasi Transaksi</h5>
                    <div class="input-item checkbox">
                        <CheckBox
                            v-model="newCust"
                            :binary="true"
                            inputId="newCust"
                            @update:modelValue="saveInputToLocal()"
                        />
                        <label for="newCust">Pelanggan Baru</label>
                    </div>
                    <div class="input-grid">
                        <div v-if="!newCust" class="input-item">
                            <label for="cust">Pelanggan</label>
                            <div class="select-cust-input-group">
                                <InputText
                                    v-model="dispCust"
                                    id="cust"
                                    placeholder="Pilih Pelanggan"
                                    disabled
                                />
                                <Button
                                    icon="search"
                                    @click="custModal = true"
                                />
                            </div>
                        </div>
                        <div v-if="newCust" class="input-item">
                            <label for="newCustName">Nama Pelanggan</label>
                            <InputText
                                v-model="newCustData.name"
                                id="newCustName"
                                placeholder="Nama Pelanggan"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div v-if="newCust" class="input-item">
                            <label for="newCustAddr">Alamat Pelanggan</label>
                            <InputText
                                v-model="newCustData.address"
                                id="newCustAddr"
                                placeholder="Alamat Pelanggan"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div v-if="newCust" class="input-item">
                            <label for="newCustPhone">No Hp Pelanggan</label>
                            <InputText
                                v-model="newCustData.phone"
                                id="newCustPhone"
                                placeholder="No Hp Pelanggan"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div
                            class="input-item"
                            v-if="authStore.isAuthorize('discount')"
                        >
                            <label for="discount">Diskon</label>
                            <InputNumber
                                v-model="discount"
                                inputId="discount"
                                :min="0"
                                :max="100"
                                suffix="%"
                                placeholder="Diskon"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div class="input-item">
                            <label for="payment">Metode Pembayaran</label>
                            <InputText
                                v-model="payment"
                                id="payment"
                                placeholder="Metode Pembayaran"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div
                            class="input-item"
                            v-if="authStore.isAuthorize('due')"
                        >
                            <label for="due">Jatuh Tempo</label>
                            <Calendar
                                v-model="due"
                                dateFormat="dd - mm - yy"
                                inputId="due"
                                placeholder="Pilih Tanggal Jatuh Tempo"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                        <div
                            class="input-item"
                            v-if="authStore.isAuthorize('warehouse')"
                        >
                            <label for="warehouse">Gudang</label>
                            <InputText
                                v-model="warehouse"
                                id="warehouse"
                                placeholder="Gudang"
                                @update:modelValue="saveInputToLocal()"
                            />
                        </div>
                    </div>
                </div>
                <div class="trans-section info-cart">
                    <div v-if="!cart.length" class="cart-none">
                        Belum ada produk di keranjang.
                    </div>
                    <table v-else class="cart-list">
                        <tr v-for="item in cart">
                            <td style="max-width: 10rem">
                                <div class="stack-it">
                                    <span>{{ item.name }}</span>
                                    <span class="d-tag d-lowercase">
                                        {{ item.size }}
                                        {{ formatUom(item.uom) }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div class="stack-it">
                                    <span>{{
                                        formatCurrency(item.price)
                                    }}</span>
                                    <span>{{
                                        formatCurrency(item.price * item.amount)
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="d-plusmin-button-set">
                                    <Button
                                        icon="remove"
                                        @click="
                                            reduceAmountProductInCart(item.id)
                                        "
                                    />
                                    <InputNumber
                                        class="d-plusmin-input"
                                        v-model="item.amount"
                                        :min="1"
                                    />
                                    <Button
                                        icon="add"
                                        @click="addAmoutProductInCart(item.id)"
                                    />
                                </div>
                            </td>
                            <td style="max-width: 6.2rem">
                                <Button
                                    label="Hapus"
                                    severity="danger"
                                    @click="removeProductFromCart(item.id)"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="trans-section info-summary">
                    <div v-if="!cart.length" class="summary-none">
                        Tambah produk untuk melihat ringkasan.
                    </div>
                    <div v-else class="summary-list">
                        <div class="summary-item">
                            <h5 style="margin: 0">Ringkasan Transaksi</h5>
                        </div>
                        <div class="summary-item">
                            <span>Total Harga</span>
                            <span>{{
                                formatCurrency(totalAmountOfCart())
                            }}</span>
                        </div>
                        <div class="summary-item">
                            <span>PPN ({{ tax }}%)</span>
                            <span>{{ formatCurrency(taxAmount()) }}</span>
                        </div>
                        <div class="summary-item">
                            <span>Diskon ({{ discount }}%)</span>
                            <span>{{ formatCurrency(discountAmount()) }}</span>
                        </div>
                        <div class="summary-item">
                            <span>Total Pembayaran</span>
                            <span>{{ formatCurrency(totalBill()) }}</span>
                        </div>
                    </div>
                </div>
                <div class="trans-section submit-button">
                    <Button
                        label="Reset Transaksi"
                        severity="danger"
                        @click="resetTrans()"
                    />
                    <Button
                        label="Buat Transaksi"
                        severity="success"
                        @click="onSubmitTransaction()"
                    />
                </div>
            </div>
        </div>
    </div>

    <Dialog
        v-model:visible="custModal"
        modal
        :style="{ width: '65vw' }"
        :breakpoints="{ '640px': '100vw' }"
        header="Daftar Pelanggan"
        dismissableMask
    >
        <CustList
            :customers="customers"
            @selectCustomer="selectCustomer($event)"
        />
    </Dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../../store/ProductStore";
import { useAuthStore } from "../../store/AuthStore";
import { useCustomerStore } from "../../store/CustomerStore";
import { useToast } from "primevue/usetoast";
import CustList from "../CustList.vue";
const baseUrl = import.meta.env.VITE_BASE_URL;

// for PRODUCT-PICK
const productStore = useProductStore();
const authStore = useAuthStore();
const customerStore = useCustomerStore();
const toast = useToast();
const rowPerPage = ref(5);
const currPage = ref(0);
const rowLenghtPostFilter = ref(0);
const products = computed(() => {
    let data = productStore.products;

    rowLenghtPostFilter.value = data.length;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});

// for CUST-PICK
const custModal = ref(false);
const customers = ref(null);
const dispCust = ref(null);
const cust = ref(null);

// for CART
const newCust = ref(false);
const newCustData = ref({});
const tax = ref(11);
const discount = ref(null);
const payment = ref(null);
const due = ref(null);
const warehouse = ref(null);
const cart = ref([]);

onMounted(async () => {
    await productStore.getProducts();
    productStore.isLoading = false;
    await customerStore.getCustomers();
    customers.value = customerStore.customers;

    if (localStorage.getItem("cart")) {
        cart.value = JSON.parse(localStorage.getItem("cart"));
    }

    if (localStorage.getItem("transInfo") || localStorage.getItem("custInfo")) {
        let transInfo = JSON.parse(localStorage.getItem("transInfo"));
        let custInfo = JSON.parse(localStorage.getItem("custInfo"));
        discount.value = JSON.parse(transInfo.discount);
        payment.value = JSON.parse(transInfo.payment);
        due.value = JSON.parse(transInfo.due);
        warehouse.value = JSON.parse(transInfo.warehouse);
        newCust.value = JSON.parse(custInfo.newCust);

        if (!JSON.parse(custInfo.newCust)) {
            cust.value = JSON.parse(custInfo.customer);
            dispCust.value = formatDispCust(cust.value);
        } else {
            newCustData.value["name"] = JSON.parse(custInfo.name);
            newCustData.value["address"] = JSON.parse(custInfo.address);
            newCustData.value["phone"] = JSON.parse(custInfo.phone);
        }
    }
});

const selectCustomer = (data) => {
    dispCust.value = formatDispCust(data);
    cust.value = data;
    custModal.value = false;
    saveInputToLocal();
};

const formatDispCust = (data) => {
    if (data) return `${data.name} - ${data.code.toUpperCase()}`;
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
    let index = findIndexOfProductInCart(productId);
    cart.value[index]["amount"]++;

    saveCartToLocal();
};

const reduceAmountProductInCart = (productId) => {
    let index = findIndexOfProductInCart(productId);
    if (cart.value[index]["amount"] > 1) cart.value[index]["amount"]--;
    else removeProductFromCart(productId);

    saveCartToLocal();
};

const removeProductFromCart = (productId) => {
    let index = findIndexOfProductInCart(productId);
    cart.value.splice(index, 1);

    saveCartToLocal();
};

const totalAmountOfCart = () => {
    return cart.value
        .map((item) => item.amount * item.price)
        .reduce((sum, item) => sum + item);
};

const taxAmount = () => {
    if (authStore.isAuthorize("tax"))
        return tax.value * 0.01 * totalAmountOfCart();
    else return 0;
};

const discountAmount = () => {
    return (discount.value ? discount.value : 0) * 0.01 * totalAmountOfCart();
};

const totalBill = () => {
    return totalAmountOfCart() + taxAmount() - discountAmount();
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

const saveCartToLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value));
};

const saveInputToLocal = () => {
    localStorage.setItem(
        "transInfo",
        JSON.stringify({
            discount: JSON.stringify(discount.value),
            payment: JSON.stringify(payment.value),
            due: JSON.stringify(due.value),
            warehouse: JSON.stringify(warehouse.value),
        })
    );
    if (!newCust.value)
        localStorage.setItem(
            "custInfo",
            JSON.stringify({
                newCust: JSON.stringify(newCust.value),
                customer: JSON.stringify(cust.value),
            })
        );
    else
        localStorage.setItem(
            "custInfo",
            JSON.stringify({
                newCust: JSON.stringify(newCust.value),
                name: JSON.stringify(newCustData.value["name"]),
                address: JSON.stringify(newCustData.value["address"]),
                phone: JSON.stringify(newCustData.value["phone"]),
            })
        );
};

const isInvalidSubmit = () => {
    if (!cart.value.length) return "Pembelian minimal 1 produk";
    if (!newCust.value) {
        if (!cust.value) return "Identitas pelanggan wajib diisi";
    }
    if (newCust.value) {
        if (
            !newCustData.value["name"] ||
            !newCustData.value["address"] ||
            !newCustData.value["phone"]
        )
            return "Identitas pelanggan wajib diisi";
    }
    return false;
};

const warnInvalid = (errm) => {
    toast.add({
        severity: "error",
        summary: "Transaksi Gagal",
        detail: errm,
        life: 3000,
    });
};

const onSubmitTransaction = () => {
    if (isInvalidSubmit()) warnInvalid(isInvalidSubmit());
    else {
        toast.add({
            severity: "success",
            summary: "Transaksi Berhasil",
            detail: "OK",
            life: 3000,
        });
        console.log({
            sales: authStore.user,
            isNewCustomer: newCust.value,
            customer: !newCust.value
                ? cust.value
                : {
                      nama: newCustData.value["name"],
                      alamat: newCustData.value["address"],
                      hp: newCustData.value["phone"],
                  },
            "metode pembayaran": payment.value,
            diskon: discount.value,
            "jumlah diskon": discountAmount(),
            ppn: taxAmount() ? tax.value : 0,
            "jumlah pajak": taxAmount(),
            "jatuh tempo": due.value,
            gudang: warehouse.value,
            keranjang: cart.value,
        });

        resetTrans();
    }
};

const resetTrans = () => {
    cart.value = [];
    newCust.value = false;
    cust.value = null;
    dispCust.value = null;
    newCustData.value = {};
    discount.value = null;
    payment.value = null;
    due.value = null;
    warehouse.value = null;

    resetTransOnLocal();
};

const resetTransOnLocal = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("transInfo");
    localStorage.removeItem("custInfo");
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
};

//
</script>

<style scoped lang="scss">
.page-title {
    margin-bottom: 0.5rem;
    & + .page-subtitle {
        display: inline-block;
        margin-bottom: 1rem;
        color: var(--text-color-secondary);
    }
}

.page-layout-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.table-img {
    width: 4rem;
    height: 5rem;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-set);
    margin: 0 1rem;
}

.produk {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 10rem;

    span {
        text-transform: capitalize;
        text-wrap: wrap;
    }
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
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.input-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    &.checkbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
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

table.cart-list {
    width: 100%;

    & tr td {
        padding: 1.5rem 1rem;
    }

    & tr:not(:last-of-type) td {
        border-bottom: 2px dashed var(--surface-input-border);
    }
}
.stack-it {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-transform: capitalize;
}

.summary-list {
    width: 100%;
    display: flex;
    flex-direction: column;
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
</style>
