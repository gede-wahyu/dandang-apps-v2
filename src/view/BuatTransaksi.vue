<template>
    <div class="d-card" style="margin-bottom: 2rem">
        <ProductList
            :products="products"
            :cartProductId="getIdProductCartList()"
            @add-to-cart="addToCart($event)"
        />
    </div>

    <div class="d-card">
        <h4 style="margin-bottom: 2rem">Keranjang</h4>
        <form @submit.prevent="onSubmit">
            <div class="cart">
                <div class="cart-info items">
                    <h5 style="margin-bottom: 0">Informasi Keranjang</h5>
                    <span v-if="!cart.length"
                        >Belum ada produk di keranjang</span
                    >
                    <div class="cart-list" v-else>
                        <div v-for="item in cart" class="cart-item">
                            <div class="item-left">
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
                                </div>
                                <div class="price">
                                    <!-- <span>
                                        {{
                                            new Intl.NumberFormat(
                                                "id-ID"
                                            ).format(item.price)
                                        }}
                                    </span> -->
                                    <span>{{
                                        new Intl.NumberFormat("id-ID").format(
                                            item.price * item.amount
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="item-right">
                                <img
                                    src="/public/6571f01299e9a_dandang selection.png"
                                    :alt="item.name"
                                    style="
                                        height: 5rem;
                                        width: 5rem;
                                        object-fit: cover;
                                        border-radius: var(--border-radius);
                                        box-shadow: var(--box-shadow-set);
                                    "
                                />
                                <div class="button">
                                    <Button
                                        icon="delete"
                                        severity="danger"
                                        @click="onDeleteCartItem(item.id)"
                                    />
                                    <div class="d-plusmin-button-set">
                                        <Button
                                            icon="remove"
                                            @click.prevent="
                                                onRemoveCartItemAmount(item.id)
                                            "
                                        />
                                        <InputNumber
                                            class="d-plusmin-input"
                                            v-model="item.amount"
                                        />
                                        <Button
                                            icon="add"
                                            @click="
                                                onAddCartItemAmount(item.id)
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart-info summary">
                    <h5 style="margin-bottom: 0">Ringkasan Transaksi</h5>
                    <span v-if="!cart.length"
                        >Tambah produk untuk melihat ringkasan</span
                    >
                    <div v-else class="cart-summary">
                        <div class="summary-item">
                            <span>Harga</span>
                            <span>{{
                                new Intl.NumberFormat("id-ID").format(
                                    totalCart()
                                )
                            }}</span>
                        </div>
                        <div class="summary-item">
                            <span>PPN ({{ tax }}%)</span>
                            <span>{{
                                new Intl.NumberFormat("id-ID").format(
                                    taxAmount()
                                )
                            }}</span>
                        </div>
                        <div class="summary-item">
                            <span>Diskon ({{ discount ? discount : 0 }}%)</span>
                            <span>{{
                                new Intl.NumberFormat("id-ID").format(
                                    discountAmount()
                                )
                            }}</span>
                        </div>
                        <div class="summary-item">
                            <span>Total Pembayaran</span>
                            <span>{{
                                new Intl.NumberFormat("id-ID").format(
                                    totalBill()
                                )
                            }}</span>
                        </div>
                    </div>
                </div>
                <div class="cart-info input">
                    <h5 style="margin-bottom: 0">Informasi Transaksi</h5>
                    <div>
                        <CheckBox
                            v-model="newCust"
                            @update:modelValue="saveInputToLocal()"
                            :binary="true"
                            input-id="newCust"
                        />
                        <label for="newCust">Pelanggan baru</label>
                    </div>
                    <div v-if="!newCust">
                        <label for="customer">Pelanggan</label>
                        <div class="cart-info-input">
                            <InputText
                                id="customer"
                                v-model="dispCust"
                                placeholder="Pilih pelanggan"
                                disabled
                            />
                            <Button @click="custModal = true" icon="search" />
                        </div>
                    </div>
                    <div v-if="newCust">
                        <label for="newCustName">Nama Pelanggan</label>
                        <div class="cart-info-input">
                            <InputText
                                id="newCustName"
                                v-model="newCustName"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="Nama Pelanggan"
                            />
                        </div>
                    </div>
                    <div v-if="newCust">
                        <label for="newCustAddr">Alamat Pelanggan</label>
                        <div class="cart-info-input">
                            <InputText
                                id="newCustAddr"
                                v-model="newCustAddr"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="Alamat Pelanggan"
                            />
                        </div>
                    </div>
                    <div v-if="newCust">
                        <label for="newCustPhone">No Hp Pelanggan</label>
                        <div class="cart-info-input">
                            <InputText
                                id="newCustPhone"
                                v-model="newCustPhone"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="No Hp Pelanggan"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="discount">Diskon</label>
                        <div class="cart-info-input">
                            <InputNumber
                                input-id="discount"
                                v-model="discount"
                                @update:modelValue="saveInputToLocal()"
                                :min="0"
                                :max="100"
                                suffix="%"
                                placeholder="Diskon"
                                style="width: 100%"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="payment">Metode Pembayaran</label>
                        <div class="cart-info-input">
                            <InputText
                                id="payment"
                                v-model="payment"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="Metode Pembayaran"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="due">Jatuh Tempo</label>
                        <div class="cart-info-input">
                            <!-- <InputText
                                id="due"
                                v-model="due"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="Jatuh Tempo"
                            /> -->
                            <input
                                type="date"
                                id="due"
                                v-model="due"
                                @change="saveInputToLocal()"
                                placeholder="Jatuh Tempo"
                                class="p-inputtext"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="warehouse">Gudang</label>
                        <div class="cart-info-input">
                            <InputText
                                id="warehouse"
                                v-model="warehouse"
                                @update:modelValue="saveInputToLocal()"
                                placeholder="Gudang"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="trans-button">
                <Button
                    severity="danger"
                    label="Reset Transaksi"
                    @click="resetTrans()"
                />
                <Button type="submit" label="Buat Transaksi" />
            </div>
        </form>
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
import { useProductStore } from "../store/ProductStore";
import { useCustomerStore } from "../store/CustomerStore";
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import ProductList from "./ProductList.vue";
import CustList from "./CustList.vue";

const toast = useToast();
const productStore = useProductStore();
const products = ref(null);
const customerStore = useCustomerStore();
const customers = ref(null);
const custModal = ref(false);

const newCustName = ref(null);
const newCustAddr = ref(null);
const newCustPhone = ref(null);
const dispCust = ref(null);
const customer = ref(null);
const newCust = ref(false);
const discount = ref(null);
const payment = ref(null);
const due = ref(null);
const tax = ref(11);
const warehouse = ref(null);
const cart = ref([]);

onMounted(async () => {
    await productStore.getProducts();
    await customerStore.getCustomers();
    products.value = productStore.products;
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
            customer.value = JSON.parse(custInfo.customer);
            dispCust.value = formatDispCust(customer.value);
        } else {
            newCustName.value = JSON.parse(custInfo.name);
            newCustAddr.value = JSON.parse(custInfo.addr);
            newCustPhone.value = JSON.parse(custInfo.contact);
        }
    } else due.value = new Date().toISOString().slice(0, 10);
});

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
                customer: JSON.stringify(customer.value),
            })
        );
    else
        localStorage.setItem(
            "custInfo",
            JSON.stringify({
                newCust: JSON.stringify(newCust.value),
                name: JSON.stringify(newCustName.value),
                addr: JSON.stringify(newCustAddr.value),
                contact: JSON.stringify(newCustPhone.value),
            })
        );
};
const addToCart = (data) => {
    if (isProductInCart(data.id)) return;
    cart.value.push(data);

    saveCartToLocal();
};
const findIndexOfCart = (id) => {
    return getIdProductCartList().indexOf(id);
};
const onAddCartItemAmount = (id) => {
    cart.value[findIndexOfCart(id)].amount++;

    saveCartToLocal();
};
const onRemoveCartItemAmount = (id) => {
    cart.value[findIndexOfCart(id)].amount--;
    if (cart.value[findIndexOfCart(id)].amount <= 0)
        cart.value.splice(findIndexOfCart(id), 1);

    saveCartToLocal();
};
const onDeleteCartItem = (id) => {
    cart.value.splice(findIndexOfCart(id), 1);

    saveCartToLocal();
};
const isProductInCart = (id) => {
    return getIdProductCartList().includes(id);
};
const getIdProductCartList = () => {
    return cart.value.map((item) => item.id);
};
const totalCart = () => {
    return cart.value
        .map((item) => item.amount * item.price)
        .reduce((sum, item) => sum + item);
};
const taxAmount = () => {
    return totalCart() * ((tax.value ? tax.value : 0) * 0.01);
};
const discountAmount = () => {
    return totalCart() * ((discount.value ? discount.value : 0) * 0.01);
};
const totalBill = () => {
    return totalCart() + taxAmount() - discountAmount();
};
const selectCustomer = (data) => {
    dispCust.value = formatDispCust(data);
    customer.value = data;
    custModal.value = false;
    saveInputToLocal();
};
const formatDispCust = (data) => {
    return `${data.name} - ${data.code.toUpperCase()}`;
};

const isInvalidSubmit = () => {
    if (!cart.value.length) return "Pembelian minimal 1 produk";
    if (!newCust.value) {
        if (!customer.value) return "Identitas pelanggan wajib diisi";
    }
    if (newCust.value) {
        if (!newCustName.value || !newCustAddr.value || !newCustPhone.value)
            return "Identitas pelanggan wajib diisi";
    }
    if (!due.value) return "Jatuh tempo wajib diisi";
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
const onSubmit = () => {
    if (isInvalidSubmit()) warnInvalid(isInvalidSubmit());
    else {
        toast.add({
            severity: "success",
            summary: "Transaksi Berhasil",
            detail: "OK",
            life: 3000,
        });

        resetTrans();
    }
};
const resetTrans = () => {
    cart.value = [];
    newCust.value = false;
    customer.value = null;
    dispCust.value = null;
    newCustName.value = null;
    newCustAddr.value = null;
    newCustPhone.value = null;
    discount.value = null;
    payment.value = null;
    due.value = new Date().toISOString().slice(0, 10);
    warehouse.value = null;

    resetTransOnLocal();
};
const resetTransOnLocal = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("transInfo");
    localStorage.removeItem("custInfo");
};

//
</script>

<style scoped lang="scss">
.cart {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
}

.cart-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.items,
    &.summary {
        h5 + span {
            color: var(--text-color-secondary);
            padding: 2rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px dashed var(--primary);
            border-radius: var(--border-radius);
        }
    }

    &.input > div {
        display: flex;
        gap: 0.5rem;

        &:not(:first-of-type) {
            flex-direction: column;
        }
    }
}

.cart-info-input {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
        width: 100%;
    }
}

.cart-summary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .summary-item {
        display: flex;
        justify-content: space-between;
    }
}

.trans-button {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
}

.cart-list {
    display: flex;
    flex-direction: column;
    height: fit-content;

    .cart-item {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 0;

        &:not(:first-of-type) {
            border-top: 2px dashed var(--surface-input-border);
        }

        .item-left {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 0.5rem;

            .detail {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

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

            .price {
                display: flex;
                flex-direction: column;
                justify-content: end;
            }
        }

        .item-right {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;

            .button {
                position: relative;

                & > button {
                    position: absolute;
                    left: calc(-2.5rem);
                    padding: 0 !important;
                    height: 2rem;
                    width: 2rem;
                }
            }
        }
    }
}

@media screen and (max-width: 991px) {
    .cart {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .cart-info.input {
            order: 1;
        }
        .cart-info.items {
            order: 2;
        }
        .cart-info.summary {
            order: 3;
        }
    }
}
</style>
