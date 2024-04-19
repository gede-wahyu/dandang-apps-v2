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

    <div class="page-header">
        <div>
            <h5 class="page-title">Invoice</h5>
            <div class="page-subtitle">
                <span>Bukti dan informasi detail transaksi.</span>
            </div>
        </div>
        <div class="tools">
            <Dropdown
                v-model="printModel"
                :options="['Invoice', 'Faktur']"
                placeholder="Pilih model"
                style="width: 15rem"
            />
            <Button label="Cetak" icon="print" @click="printReceipt()" />
        </div>
    </div>

    <div class="inv-container">
        <div
            v-if="details"
            class="d-card invoice"
            :class="{ receiptDispActive: printModel === 'Faktur' }"
        >
            <div>
                <div class="inv-header">
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
                    <div v-if="printModel === 'Faktur'" class="separator"></div>
                    <div class="header-right">
                        <h5>
                            <span>Invoice</span>
                            &nbsp;
                            <span>{{ details.reference }}</span>
                        </h5>
                        <div class="subheader">
                            <div>
                                <span>Tanggal Transaksi</span>
                                <span
                                    >{{ formatDate(details.date, "date") }}
                                    {{ formatDate(details.date, "time") }}</span
                                >
                            </div>
                            <div>
                                <span>Tanggal Pembayaran</span>
                                <span
                                    >{{ formatDate(details.due, "date") }}
                                    {{ formatDate(details.due, "time") }}</span
                                >
                            </div>
                            <div v-if="printModel === 'Faktur'">
                                <span>Pelanggan</span>
                                <span>{{ details.customer.name }}</span>
                            </div>
                            <div v-if="printModel === 'Faktur'">
                                <span>Sales</span>
                                <span>{{ details.sales.code }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                <div class="body-top">
                    <div class="customer">
                        <h6>Pelanggan</h6>
                        <span>{{
                            details.customer.name ? details.customer.name : "-"
                        }}</span>
                        <span>{{
                            details.customer.code ? details.customer.code : "-"
                        }}</span>
                        <span>{{
                            details.customer.address
                                ? details.customer.address
                                : "-"
                        }}</span>
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
                <div class="body-btm">
                    <div class="table-wrapper">
                        <table v-if="printModel !== 'Faktur'" class="d-table">
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
                        <table v-if="printModel === 'Faktur'" class="d-table">
                            <tr>
                                <th>Qty</th>
                                <th>Produk</th>
                                <th>Total</th>
                            </tr>
                            <tr v-for="n in details.products">
                                <td>{{ n.quantity }}</td>
                                <td>{{ n.name }}</td>
                                <td>
                                    <div class="flex flex-column">
                                        <span>{{
                                            formatCurrency(n.unit_price, true)
                                        }}</span>
                                        <span
                                            style="color: var(--text-color)"
                                            >{{
                                                formatCurrency(
                                                    n.unit_price * n.quantity,
                                                    true
                                                )
                                            }}</span
                                        >
                                    </div>
                                </td>
                            </tr>
                            <tr class="summary">
                                <td colspan="2">
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
                                            formatCurrency(
                                                details.sub_total,
                                                true
                                            )
                                        }}</span>
                                        <span>
                                            {{
                                                formatCurrency(
                                                    details.discount.amount,
                                                    true
                                                )
                                            }}
                                        </span>
                                        <span>{{
                                            formatCurrency(
                                                details.shipping_amount,
                                                true
                                            )
                                        }}</span>
                                        <span>{{
                                            formatCurrency(
                                                details.tax.ppn,
                                                true
                                            )
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr class="summary">
                                <td colspan="2">Total</td>
                                <td>
                                    {{ formatCurrency(details.total, true) }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="inv-copyright">
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
const printModel = ref("Invoice");

onMounted(async () => {
    await transactionStore.GET__TRANSACTION_BY_ID(route.params.id);
    transactionStore.isLoading = false;
});

const printReceipt = () => {
    window.print({
        // silent: true,
        sizeMode: "portrait",
    });
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
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .tools {
        display: flex;
        gap: 1rem;
    }
}

.inv-container {
    display: flex;
    justify-content: center;
}

.invoice {
    max-width: 70rem;
    padding: 4rem 3rem;
}

.inv-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;

    .header-left,
    .header-right {
        .subheader {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            &,
            & a {
                color: var(--text-color-secondary);
            }
        }
    }
    .header-left {
        h4 {
            display: flex;
            .logo {
                width: 2rem;
                height: 2rem;
                aspect-ratio: 1 / 1;
                object-fit: contain;
                margin-right: 0.5rem;
                display: flex;
            }
        }
    }
    .header-right {
        .subheader {
            div {
                display: flex;
                gap: 0.5rem;
                span:first-of-type {
                    display: flex;
                    justify-content: space-between;
                    &::after {
                        content: (":");
                    }
                }
            }
        }
    }
}

.separator {
    width: 100%;
    height: 1px;
    background-color: var(--surface-input-border);
    margin: 1.5rem 0;
    border-radius: 2px;
}

.body-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
    .customer,
    .payment {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        & :not(h6) {
            color: var(--text-color-secondary);
        }
    }
    .payment {
        .item {
            display: flex;
            gap: 0.5rem;
            span:first-of-type {
                &::after {
                    content: ":";
                }
            }
        }
    }
}

.body-btm {
    .d-table {
        td:not(.summary:last-of-type td) {
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
        }
    }
}

.invoice.receiptDispActive {
    max-width: 30rem;
    padding: 3rem 2rem;
    .inv-header {
        justify-content: center;
        gap: 0;
        .header-left,
        .header-right {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .header-right {
            .subheader {
                width: 100%;
                div {
                    width: 100%;
                    span:first-of-type {
                        width: 13rem;
                    }
                }
            }
        }
    }
    .body-top {
        display: none;
    }
}

.inv-copyright {
    display: none;
}

.breadcrumb {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1.5rem;
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
    .tools {
        display: none !important;
    }

    .footer {
        display: block !important;
        position: fixed;
        bottom: 0;
    }
}
</style>
