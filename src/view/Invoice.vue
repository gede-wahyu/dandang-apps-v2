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

    <h5 class="page-header">Invoice</h5>
    <div class="page-subheader">
        <span>Bukti dan informasi detail transaksi.</span>
    </div>

    <div class="container container-invoice">
        <div v-if="details" class="d-card invoice">
            <div id="print-invoice">
                <div class="header">
                    <div class="header-left">
                        <h4>
                            <img
                                src="/icon.png"
                                alt="logo-dandang"
                                class="logo"
                            />
                            <span>Teh Dandang</span>
                        </h4>
                        <div class="subheader">
                            <span
                                >Jl. Urip Sumoharjo No. 74 RT 02/01,
                                Sambong</span
                            >
                            <span>Batang, Jawa Tengah, Indonesia</span>
                            <a href="tel:+6281313999834">+62 813-1399-9834</a>
                        </div>
                    </div>
                    <div class="header-right">
                        <h5>
                            <span>Invoice</span>
                            &nbsp;
                            <span>{{ details.reference }}</span>
                        </h5>
                        <div class="subheader">
                            <span>
                                Tanggal Transaksi:
                                <span>{{
                                    formatDate(details.date, "date")
                                }}</span>
                                <span>{{
                                    formatDate(details.date, "time")
                                }}</span>
                            </span>
                            <span>
                                Tenggat Pembayaran:
                                <span>{{
                                    formatDate(
                                        details.due
                                            ? details.due
                                            : details.date,
                                        "date"
                                    )
                                }}</span>
                                <span>{{
                                    formatDate(
                                        details.due
                                            ? details.due
                                            : details.date,
                                        "time"
                                    )
                                }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                <div class="body-top">
                    <div class="customer">
                        <h6>Pelanggan</h6>
                        <span>{{ details.customer_name }}</span>
                        <span>#{{ details.customer.code }}</span>
                        <span>{{ details.customer.address }}</span>
                        <span>{{
                            details.customer.contact
                                ? details.customer.contact
                                : "-"
                        }}</span>
                    </div>
                    <div class="payment">
                        <h6>Pembayaran</h6>
                        <div class="item">
                            <span>Tagihan</span>
                            <span>{{ formatCurrency(details.total) }}</span>
                        </div>
                        <div class="item">
                            <span>Metode</span>
                            <span class="d-capitalize">{{
                                details.payment_method
                            }}</span>
                        </div>
                        <div class="item">
                            <span>Saler</span>
                            <span>{{ details.sales.code }}</span>
                        </div>
                        <div class="item">
                            <span>Depo</span>
                            <span>{{ details.sales.depo }}</span>
                        </div>
                    </div>
                </div>
                <div class="body-bottom">
                    <div class="table-wrapper">
                        <table class="d-table">
                            <tr>
                                <th>Produk</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                            </tr>
                            <tr v-for="n in details.products">
                                <td>{{ n.name }}</td>
                                <td>{{ formatCurrency(n.unit_price) }}</td>
                                <td>{{ n.quantity }}</td>
                                <td>
                                    {{
                                        formatCurrency(
                                            n.unit_price * n.quantity
                                        )
                                    }}
                                </td>
                            </tr>
                            <tr class="summary">
                                <td colspan="3">
                                    <div>
                                        <span>Subtotal</span>
                                        <span
                                            >Diskon ({{
                                                details.discount.disc
                                            }}%)</span
                                        >
                                        <span>Pengiriman</span>
                                        <span
                                            >PPn ({{
                                                details.tax.amount
                                            }}%)</span
                                        >
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span>{{
                                            formatCurrency(details.sub_total)
                                        }}</span>
                                        <span>
                                            {{
                                                formatCurrency(
                                                    details.discount.amount
                                                )
                                            }}
                                        </span>
                                        <span>{{
                                            formatCurrency(
                                                details.shipping_amount
                                            )
                                        }}</span>
                                        <span>{{
                                            formatCurrency(details.tax.ppn)
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr class="summary">
                                <td colspan="3">Total</td>
                                <td>
                                    {{ formatCurrency(details.total) }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-card tools">
            <Button label="Cetak" @click="printInv()" />
            <!-- <Button label="Unduh" @click="downloadInv()" />
            <Button label="WhatsApp" />
            <Button label="Email" /> -->
        </div>
    </div>
    <div class="footer">
        <span>&copy; 2024 OMAH IT. All Rights Reserved</span>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTransactionStore } from "../store/TransactionStore";

const route = useRoute();
const router = useRouter();
const transactionStore = useTransactionStore();
const details = computed(() => {
    return transactionStore.details;
});

onMounted(async () => {
    await transactionStore.GET__TRANSACTION_BY_ID(route.params.id);
    transactionStore.isLoading = false;
});

const printInv = () => {
    window.print({
        silent: true,
        sizeMode: "portrait",
    });
};

const downloadInv = () => {};

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
.container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.5rem;
    .invoice {
        grid-column: 1 / 10;
    }
    .tools {
        grid-column: 10 / 13;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        button {
            width: 100%;
            height: fit-content;
            padding: 1rem;
        }
        button:not(:first-of-type) {
            background-color: var(--primary-a1);
            color: var(--icon-color-secondary);
            &:hover {
                background-color: var(--primary-a2);
            }
        }
    }
}

.logo {
    width: 2rem;
    height: 2rem;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    margin-right: 0.5rem;
    display: flex;
}
.separator {
    width: 100%;
    height: 1px;
    background-color: var(--surface-input-border);
    margin: 1.5rem 0;
    border-radius: 2px;
}
.invoice {
    padding: 0;
    #print-invoice {
        padding: 4rem 3rem;
    }
    h4 {
        display: flex;
        align-items: center;
    }
    .header {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
    }
    .subheader {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: var(--text-color-secondary);
        a {
            width: fit-content;
            color: var(--text-color-secondary);
        }

        span {
            text-transform: capitalize;
        }
    }
    .header-right {
        .subheader {
            & > span {
                span:first-of-type {
                    margin-right: 0.5rem;
                }
            }
        }
    }
}
.body-top {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    .customer {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h6 {
            margin-bottom: 0.5rem;
        }
        span {
            text-transform: capitalize;
            color: var(--text-color-secondary);
            &:nth-of-type(2) {
                text-transform: uppercase;
            }
        }
    }
    .payment {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h6 {
            margin-bottom: 0.5rem;
        }
        span {
            color: var(--text-color-secondary);
        }
        .item {
            display: flex;
            gap: 0.5rem;
            & > span:first-of-type::after {
                content: ": ";
            }
        }
    }
}
.d-table {
    th,
    td {
        vertical-align: top;
    }
    th {
        border-top: 1px solid var(--surface-tborder);
    }
    td {
        color: var(--text-color-secondary);
    }
    .summary {
        td {
            border: none;
            &:first-of-type {
                text-align: end;
            }
            div {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
        }
        &:last-of-type {
            td {
                color: var(--text-color);
            }
        }
    }
}
.footer {
    display: none;
}
.page-header {
    margin-bottom: 0.5rem;
    & + .page-subheader {
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        row-gap: 0.5rem;
        color: var(--text-color-secondary);
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

@media screen and (max-width: 1300px) {
    .container {
        .invoice {
            grid-column: 1 / 13;
        }
        .tools {
            grid-column: 1 / 13;
        }
    }
    .body-top {
        flex-direction: column;
    }
}
@media screen and (max-width: 767px) {
    .header {
        flex-direction: column;
    }
}
</style>

<style>
@media print {
    .layout-topbar,
    .layout-sidebar,
    .layout-footer,
    .layout-config {
        display: none !important;
    }
    .layout-container {
        margin: 0 !important;
        display: flex !important;
        .d-card {
            border: none;
            box-shadow: none;
        }
    }
    .breadcrumb {
        display: none !important;
    }
    .page-header {
        display: none !important;
        & + .page-subheader {
            display: none !important;
        }
    }
    .container-invoice {
        display: grid !important;
        grid-template-columns: repeat(12, 1fr) !important;
        .invoice {
            grid-column: 1 / 13 !important;
            color: #000 !important;
            tr.summary:last-of-type td {
                color: #000 !important;
            }
        }
        .tools {
            display: none !important;
        }
    }
    .footer {
        display: block !important;
        position: fixed;
        bottom: 0;
    }
}
</style>
