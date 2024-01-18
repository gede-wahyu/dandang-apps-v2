<template>
    <div class="info">
        <div class="info-group first-line">
            <div class="info-group-body">
                <div class="info-group-item status">
                    <span>Status</span>
                    <span
                        class="d-tag"
                        :class="statusTag(data.status.code, 'transaksi')"
                        >{{ data.status.status }}</span
                    >
                </div>
            </div>
        </div>
        <div class="info-group first-line">
            <div class="info-group-body">
                <div class="info-group-item date">
                    <span>Dibuat</span>
                    <div class="flex gap-0">
                        <span>{{ formatDate(data.date, "date") }}</span>
                        <span>|</span>
                        <span>{{ formatDate(data.date, "time") }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-group customer">
            <h6>Pelanggan</h6>
            <div class="info-group-body">
                <div class="info-group-item">
                    <span>Kode</span>
                    <span class="d-uppercase">#cst0001</span>
                </div>
                <div class="info-group-item">
                    <span>Nama</span>
                    <span class="d-capitalize">{{ data.customer_name }}</span>
                </div>
                <div class="info-group-item">
                    <span>Alamat</span>
                    <span class="d-capitalize">Jl. Tambak Bayan No.134</span>
                </div>
                <div class="info-group-item">
                    <span>No Hp</span>
                    <span>081123456789</span>
                </div>
            </div>
        </div>
        <div class="info-group saler">
            <h6>Saler</h6>
            <div class="info-group-body">
                <div class="info-group-item">
                    <span>Kode</span>
                    <span class="d-uppercase">#{{ data.sales }}</span>
                </div>
                <div class="info-group-item">
                    <span>Nama</span>
                    <span class="d-capitalize">Sales 1</span>
                </div>
                <div class="info-group-item">
                    <span>Tipe</span>
                    <span class="d-capitalize">TO</span>
                </div>
                <div class="info-group-item">
                    <span>Depo</span>
                    <span class="d-uppercase">{{ data.depo }}</span>
                </div>
            </div>
        </div>
        <div class="info-group payment">
            <h6>Pembayaran</h6>
            <div class="info-group-body">
                <div class="info-group-item reference">
                    <span>No Faktur</span>
                    <span>{{ data.reference }}</span>
                </div>
                <div class="info-group-item method">
                    <span>Metode</span>
                    <span>Cicilan</span>
                </div>
                <div class="info-group-item date">
                    <span>Tanggal</span>
                    <div class="flex gap-0">
                        <span>{{ formatDate(data.date, "date") }}</span>
                        <span>|</span>
                        <span>{{ formatDate(data.date, "time") }}</span>
                    </div>
                </div>
                <div class="info-group-item status">
                    <span>Status</span>
                    <span
                        class="d-tag"
                        :class="
                            statusTag(data.payment_status.code, 'pembayaran')
                        "
                        >{{ data.payment_status.status }}</span
                    >
                </div>
            </div>
        </div>
        <div class="info-group payment">
            <div class="info-group-body">
                <div class="info-group-item total">
                    <span>Tagihan</span>
                    <span>{{ formatCurrency(45000) }}</span>
                </div>
                <div class="info-group-item paid">
                    <span>Dibayar</span>
                    <span class="d-success">{{ formatCurrency(20000) }}</span>
                </div>
                <div class="info-group-item bill">
                    <span>Sisa Tagihan</span>
                    <span class="d-error">{{ formatCurrency(25000) }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="items">
        <div class="table-wrapper">
            <table class="d-table">
                <tr>
                    <th>Qty</th>
                    <th>Produk</th>
                    <th>Harga</th>
                </tr>
                <tr v-for="n in 3">
                    <td>{{ n }}</td>
                    <td>Contoh Produk {{ n }}</td>
                    <td>
                        <div class="flex flex-column gap-0">
                            <span>{{ formatCurrency(7500) }}</span>
                            <span class="subtotal">{{
                                formatCurrency(7500 * n)
                            }}</span>
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
                            <span>- {{ formatCurrency(45000 * 0.15) }}</span>
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
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => {},
    },
});

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
.info {
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    .info-group:not(.payment) {
        margin-bottom: 1.5rem;
    }
}
.info-group.first-line {
    &:first-of-type {
        margin-bottom: 0;
    }
    .info-group-body {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    }
}
.info-group.payment {
    &:last-of-type {
        margin-top: 2rem;
    }
    .info-group-body {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    }
}
.info-group-body {
    display: grid;
    row-gap: 0.5rem;
}
.info-group-item {
    display: flex;
    gap: 0.5rem;

    & > span:first-of-type {
        color: var(--text-color-secondary);
        &::after {
            content: " :";
        }
    }
}
.d-table {
    th {
        border-top: 1px solid var(--surface-tborder);
    }
    td {
        vertical-align: top;
        color: var(--text-color-secondary);

        .subtotal {
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
            td:last-of-type {
                color: var(--text-color);
            }
        }
    }
}
</style>
