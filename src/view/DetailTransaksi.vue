<template>
    <div class="breadcrumb">
        <router-link :to="{ name: 'dashboard' }">
            <span class="material-symbols-outlined"> home </span>
            <span class="material-symbols-outlined"> navigate_next </span>
        </router-link>
        <span>
            Transaksi
            <span class="material-symbols-outlined"> navigate_next </span>
        </span>
        <router-link class="breadcrumb-item" :to="{ name: 'transaction-list' }">
            Riwayat
            <span class="material-symbols-outlined"> navigate_next </span>
        </router-link>
        <span>Detail</span>
    </div>

    <h5 class="header">Detail Transaksi</h5>
    <div class="subheader">
        <span>Informasi detail untuk setiap transaksi.</span>
        <Button
            label="Kembali"
            @click="router.push({ name: 'transaction-list' })"
        />
    </div>

    <div v-if="details" class="container">
        <div class="d-card status">
            <div class="card-header">
                <h5>Transaksi</h5>
                <span
                    class="span-nav-button right-labeled"
                    role="button"
                    tabindex="0"
                    @click="openTransEdit()"
                >
                    <span>Perbarui</span>
                </span>
            </div>

            <div class="properties">
                <div class="property">
                    <span>No Faktur</span>
                    <span>{{ details.reference }}</span>
                </div>
                <div class="property">
                    <span>Tanggal Transaksi</span>
                    <div class="flex flex-wrap gap-0">
                        <span>{{ formatDate(details.date, "date") }}</span>
                        <span>|</span>
                        <span>{{ formatDate(details.date, "time") }}</span>
                    </div>
                </div>
                <div class="property">
                    <span>Status Transaksi</span>
                    <span
                        class="d-tag"
                        :class="statusTag(details.status.code, 'transaksi')"
                        >{{ details.status.status }}</span
                    >
                </div>
            </div>
        </div>

        <div class="d-card product">
            <h5 class="card-header">Produk</h5>

            <div class="table-wrapper lite">
                <table class="d-table">
                    <tr>
                        <th>Produk</th>
                        <th>Qty</th>
                        <th>Harga</th>
                    </tr>
                    <tr v-for="n in 3">
                        <td>Contoh Produk {{ n }}</td>
                        <td>{{ n }}</td>
                        <td>
                            <div class="flex flex-column gap-0 hl">
                                <span>{{ formatCurrency(7500) }}</span>
                                <span>{{ formatCurrency(7500 * n) }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="summary">
                        <td colspan="2">
                            <div class="flex flex-column gap-0">
                                <span>Subtotal</span>
                                <span>Diskon (15%)</span>
                                <span>Pengiriman</span>
                                <span>PPN (11%)</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-column gap-0">
                                <span>{{ formatCurrency(45000) }}</span>
                                <span
                                    >- {{ formatCurrency(45000 * 0.15) }}</span
                                >
                                <span>{{ formatCurrency(1800) }}</span>
                                <span>{{ formatCurrency(45000 * 0.11) }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="summary">
                        <td colspan="2">Total</td>
                        <td>{{ formatCurrency(45000) }}</td>
                    </tr>
                </table>
            </div>

            <div class="table-wrapper large">
                <table class="d-table">
                    <tr>
                        <th>Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Total</th>
                    </tr>
                    <tr v-for="n in 3">
                        <td>Contoh Produk {{ n }}</td>
                        <td>{{ n }}</td>
                        <td>
                            <span>{{ formatCurrency(7500) }}</span>
                        </td>
                        <td>
                            <span>{{ formatCurrency(7500 * n) }}</span>
                        </td>
                    </tr>
                    <tr class="summary">
                        <td colspan="3">
                            <div class="flex flex-column gap-0">
                                <span>Subtotal</span>
                                <span>Diskon (15%)</span>
                                <span>Pengiriman</span>
                                <span>PPN (11%)</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-column gap-0">
                                <span>{{ formatCurrency(45000) }}</span>
                                <span
                                    >- {{ formatCurrency(45000 * 0.15) }}</span
                                >
                                <span>{{ formatCurrency(1800) }}</span>
                                <span>{{ formatCurrency(45000 * 0.11) }}</span>
                            </div>
                        </td>
                    </tr>
                    <tr class="summary">
                        <td colspan="3">Total</td>
                        <td>{{ formatCurrency(45000) }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="d-card customer">
            <h5 class="card-header">Pelanggan</h5>

            <div class="properties">
                <div class="property">
                    <span>Kode</span>
                    <span class="d-uppercase">#cst0001</span>
                </div>
                <div class="property">
                    <span>Nama</span>
                    <span class="d-capitalize">{{
                        details.customer_name
                    }}</span>
                </div>
                <div class="property">
                    <span>Alamat</span>
                    <span class="d-capitalize">Jl. Tambak Bayan No.134</span>
                </div>
                <div class="property">
                    <span>No Hp</span>
                    <span>081123456789</span>
                </div>
            </div>
        </div>

        <div class="d-card saler">
            <h5 class="card-header">Saler</h5>

            <div class="properties">
                <div class="property">
                    <span>Kode</span>
                    <span class="d-uppercase">#{{ details.sales }}</span>
                </div>
                <div class="property">
                    <span>Nama</span>
                    <span class="d-capitalize">Saler 1</span>
                </div>
                <div class="property">
                    <span>No Hp</span>
                    <span class="d-capitalize">081123456789</span>
                </div>
                <div class="property">
                    <span>Tipe</span>
                    <span class="d-capitalize">TO</span>
                </div>
                <div class="property">
                    <span>Depo</span>
                    <span class="d-uppercase">#{{ details.depo }}</span>
                </div>
            </div>
        </div>

        <div class="d-card payment">
            <div class="card-header">
                <h5>Pembayaran</h5>
                <span
                    class="span-nav-button right-labeled"
                    role="button"
                    tabindex="0"
                    @click="openPaymentEdit()"
                >
                    <span>Perbarui</span>
                </span>
            </div>

            <div class="property">
                <span>Tanggal</span>
                <div class="flex flex-wrap gap-0">
                    <span>{{ formatDate(details.date, "date") }}</span>
                    <span>|</span>
                    <span>{{ formatDate(details.date, "time") }}</span>
                </div>
            </div>
            <div class="properties">
                <div class="property">
                    <span>Metode</span>
                    <span>Cicilan</span>
                </div>
                <div class="property">
                    <span>Status</span>
                    <span
                        class="d-tag"
                        :class="
                            statusTag(details.payment_status.code, 'pembayaran')
                        "
                        >{{ details.payment_status.status }}</span
                    >
                </div>
                <div class="property">
                    <span>Tagihan</span>
                    <span>{{ formatCurrency(45000) }}</span>
                </div>
                <div class="property">
                    <span>Dibayar</span>
                    <span class="d-success">{{ formatCurrency(20000) }}</span>
                </div>
                <div class="property">
                    <span>Sisa Tagihan</span>
                    <span class="d-error">{{ formatCurrency(25000) }}</span>
                </div>
            </div>
            <div class="property">
                <span>Catatan</span>
                <span>{{ details.note ? details.note : "-" }}</span>
            </div>
        </div>
    </div>

    <Dialog
        v-model:visible="transEdit"
        modal
        header="Perbarui Transaksi"
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <div class="trans-edit">
            <div>
                <span>Status Transaksi</span>
                <Dropdown
                    v-model="tstatus"
                    :options="tstatusOpt"
                    optionLabel="label"
                >
                    <template #value="slotProps">
                        <span
                            v-if="slotProps.value"
                            class="d-tag"
                            :class="
                                statusTag(slotProps.value.code, 'transaksi')
                            "
                            >{{ slotProps.value.status }}</span
                        >
                        <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                        <span
                            class="d-tag"
                            :class="
                                statusTag(slotProps.option.code, 'transaksi')
                            "
                            >{{ slotProps.option.status }}</span
                        >
                    </template>
                </Dropdown>
            </div>
            <div>
                <Button
                    label="Batal"
                    severity="danger"
                    @click="closeTransEdit()"
                />
                <Button
                    label="Simpan"
                    severity="success"
                    @click="saveTransEdit()"
                />
            </div>
        </div>
    </Dialog>

    <Dialog
        v-model:visible="paymentEdit"
        modal
        header="Perbarui Pembayaran"
        :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
        <div class="trans-edit">
            <div>
                <span>Bayar Tagihan</span>
                <InputNumber
                    v-model="bill"
                    mode="currency"
                    locale="id-ID"
                    currency="IDR"
                    :placeholder="formatCurrency(25000)"
                />
            </div>
            <div>
                <Button
                    label="Batal"
                    severity="danger"
                    @click="closePaymentEdit()"
                />
                <Button
                    label="Simpan"
                    severity="success"
                    @click="savePaymentEdit()"
                />
            </div>
        </div>
    </Dialog>

    <div v-if="!details" class="d-card loading">
        <div>
            <span class="material-symbols-outlined"> settings </span>
            <span> Loading... </span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTransactionStore } from "../store/TransactionStore";
// import { useAuthStore } from "../store/AuthStore";

const route = useRoute();
const router = useRouter();
const transactionStore = useTransactionStore();
// const authStore = useAuthStore();
const transEdit = ref(false);
const paymentEdit = ref(false);
const details = computed(() => {
    return transactionStore.details;
});
const tstatus = ref();
const bill = ref();
const tstatusOpt = ref([
    { status: "gagal", code: 0 },
    { status: "selesai", code: 1 },
    { status: "belum selesai", code: 2 },
    { status: "batal", code: 3 },
]);

onMounted(async () => {
    await transactionStore.GET__TRANSACTION_BY_REF(route.params.reference);
    transactionStore.isLoading = false;
    tstatus.value = details.value.status;
});

const openTransEdit = () => {
    transEdit.value = true;
};
const closeTransEdit = () => {
    transEdit.value = false;
};
const openPaymentEdit = () => {
    paymentEdit.value = true;
};
const closePaymentEdit = () => {
    paymentEdit.value = false;
};

const saveTransEdit = () => {
    transactionStore.PATCH__EDIT_STATUS_TRANSACTION({
        status: tstatus.value,
    });

    closeTransEdit();
};
const savePaymentEdit = () => {
    transactionStore.PATCH__EDIT_PAYMENT({
        bill: bill.value,
    });

    closePaymentEdit();
};

const statusTag = (statusCode, type) => {
    if (type === "transaksi") {
        if (statusCode === 0 || statusCode === 3) return "d-tag-danger";
        if (statusCode === 1) return "d-tag-success";
        if (statusCode === 2) return "d-tag-warning";
    }
    if (type === "pembayaran") {
        if (statusCode === 0) return "d-tag-warning";
        if (statusCode === 1) return "d-tag-success";
        if (statusCode === 2) return "d-tag-info";
    }
};

const formatCurrency = (value, notCurr) => {
    if (notCurr) return Intl.NumberFormat("id-ID").format(value);
    else
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
};

const formatDate = (value, type) => {
    if (type === "date")
        return `${Intl.DateTimeFormat("id-ID", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }).format(value)}`;
    else
        return `${Intl.DateTimeFormat("id-ID", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        }).format(value)}`;
};

//
</script>

<style scoped lang="scss">
.header {
    margin-bottom: 0.5rem;
    & + .subheader {
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        row-gap: 0.5rem;
        justify-content: space-between;
        color: var(--text-color-secondary);

        & > div {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 0.7rem;
            margin-right: 2rem;
        }
    }
}

.container {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
        "status status customer"
        "product product saler"
        "product product payment";

    .status {
        grid-area: status;
        height: 100%;
        .properties {
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            row-gap: 1rem;
        }
    }
    .product {
        grid-area: product;
    }
    .customer {
        grid-area: customer;
    }
    .saler {
        grid-area: saler;
    }
    .payment {
        grid-area: payment;
    }
}

.d-card {
    height: fit-content;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    h5 {
        margin: 0;
    }
    .span-nav-button {
        padding: 0.75rem 1.5rem;
        color: var(--primary);
    }
}
.lite {
    display: none;
}
.d-table {
    tr {
        th {
            border-top: 1px solid var(--surface-tborder);
        }
        td {
            color: var(--text-color-secondary);
            vertical-align: top;
        }
        .hl > span:last-of-type {
            color: var(--text-color);
        }
    }

    .summary {
        td {
            border: none;

            &[colspan] {
                text-align: right;
            }
        }

        &:last-of-type {
            td {
                color: var(--text-color);
            }
        }
    }
}
.properties {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    row-gap: 0.5rem;
    column-gap: 1rem;
}
.property {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    & ~ .properties {
        padding: 0.5rem 0;
    }

    & > span:first-of-type {
        display: flex;
        justify-content: space-between;
        min-width: 4.5rem;
        color: var(--text-color-secondary);
        text-wrap: nowrap;
        &::after {
            content: ":";
            margin-left: 0.5rem;
        }
    }
}

.breadcrumb {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    color: var(--text-color-secondary);
    span,
    a {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    a {
        transition: color 0.2s ease;
        color: var(--text-color-secondary);
        &:hover {
            color: var(--primary);
        }
    }
}

.loading {
    & > div {
        height: 10.65rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-color-secondary);
        span:first-of-type {
            animation: spin infinite 4s;
        }
    }
}

.trans-edit {
    & > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2.5rem;
    }
    & > div:last-of-type {
        display: flex;
        justify-content: end;
        gap: 1rem;
    }
}

@media screen and (max-width: 767px) {
    .container {
        display: flex;
        flex-direction: column;
    }
    .lite {
        display: initial;
    }
    .large {
        display: none;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
