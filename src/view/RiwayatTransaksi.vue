<template>
    <div class="d-card">
        <div class="data-header-wrapper">
            <div class="data-header">
                <h5>Riwayat Transaksi</h5>
                <div class="tools-group">
                    <span
                        class="span-nav-button right-labeled"
                        role="button"
                        tabindex="0"
                        @click="exportTable()"
                    >
                        <span class="material-symbols-outlined"> csv </span>
                        <span>Export Excel</span>
                    </span>
                    <span
                        class="span-nav-button right-labeled"
                        role="button"
                        tabindex="0"
                        @click="filterMenu = true"
                    >
                        <span class="material-symbols-outlined">
                            filter_alt
                        </span>
                        <span>Opsi Filter</span>
                    </span>
                    <span
                        class="span-nav-button right-labeled"
                        role="button"
                        tabindex="0"
                        @click="initFilter()"
                    >
                        <span class="material-symbols-outlined">
                            filter_alt_off
                        </span>
                        <span>Bersihkan</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="transaction">
            <div class="transaction-table">
                <div class="table-wrapper">
                    <table class="d-table sortable">
                        <thead>
                            <tr>
                                <th
                                    v-if="column['nofak']"
                                    @click="changeSortState('reference')"
                                >
                                    <div>
                                        <span>No Faktur</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState["reference"]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['cust']"
                                    @click="changeSortState('customer_name')"
                                >
                                    <div>
                                        <span>Pelanggan</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState["customer_name"]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['date']"
                                    @click="changeSortState('date')"
                                >
                                    <div>
                                        <span>Tanggal</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(sortState["date"])
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['tstatus']"
                                    @click="changeSortState('status.code')"
                                >
                                    <div>
                                        <span>Status Transaksi</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState["status.code"]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['amount']"
                                    @click="changeSortState('total_amount')"
                                >
                                    <div>
                                        <span>Nilai Transaksi</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState["total_amount"]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['sales']"
                                    @click="changeSortState('sales')"
                                >
                                    <div>
                                        <span>Sales</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState["sales"]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['depo']"
                                    @click="changeSortState('depo')"
                                >
                                    <div>
                                        <span>Depo</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(sortState["depo"])
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th
                                    v-if="column['pstatus']"
                                    @click="
                                        changeSortState('payment_status.code')
                                    "
                                >
                                    <div>
                                        <span>Status Pembayaran</span>
                                        <span class="material-symbols-outlined">
                                            {{
                                                sortStateIcon(
                                                    sortState[
                                                        "payment_status.code"
                                                    ]
                                                )
                                            }}
                                        </span>
                                    </div>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody v-if="!transactionStore.isLoading">
                            <tr v-for="(item, index) in transactions">
                                <td v-if="column['nofak']">
                                    <span class="d-uppercase">{{
                                        item.reference.split(/(?=INV)/g)[0]
                                    }}</span
                                    ><br />
                                    <span class="d-uppercase">{{
                                        item.reference.split(/(?=INV)/g)[1]
                                    }}</span>
                                </td>
                                <td v-if="column['cust']">
                                    <span class="d-capitalize">{{
                                        item.customer_name
                                    }}</span>
                                </td>
                                <td v-if="column['date']">
                                    <span>{{
                                        formatDate(item.date, "date")
                                    }}</span
                                    ><br />
                                    <span>{{
                                        formatDate(item.date, "time")
                                    }}</span>
                                </td>
                                <td v-if="column['tstatus']">
                                    <span
                                        class="d-tag"
                                        :class="
                                            statusTag(
                                                item.status.code,
                                                'transaksi'
                                            )
                                        "
                                        >{{ item.status.status }}</span
                                    >
                                </td>
                                <td v-if="column['amount']">
                                    <span>{{
                                        formatCurrency(item.total_amount)
                                    }}</span>
                                </td>
                                <td v-if="column['sales']">
                                    <span class="d-uppercase">{{
                                        item.sales
                                    }}</span>
                                </td>
                                <td v-if="column['depo']">
                                    <span class="d-uppercase">{{
                                        item.depo
                                    }}</span>
                                </td>
                                <td v-if="column['pstatus']">
                                    <span
                                        class="d-tag"
                                        :class="
                                            statusTag(
                                                item.payment_status.code,
                                                'pembayaran'
                                            )
                                        "
                                        >{{ item.payment_status.status }}</span
                                    >
                                </td>
                                <td><Button icon="search" /></td>
                            </tr>
                            <tr v-if="!transactions.length" class="empty">
                                <td colspan="9">
                                    Tidak data untuk ditampilkan
                                </td>
                            </tr>
                        </tbody>
                        <RiwayatTransaksiTableSkeleton
                            v-else
                            :row-per-page="rowPerPage"
                        />
                    </table>
                </div>
            </div>
            <div v-if="!transactionStore.isLoading" class="transaction-list">
                <div v-for="item in transactions" class="transaction-item">
                    <div v-if="column['nofak']" class="trans-props nofak">
                        <span>No Faktur</span>
                        <span class="d-uppercase">{{ item.reference }}</span>
                    </div>
                    <div v-if="column['cust']" class="trans-props">
                        <span>Pelanggan</span>
                        <span class="d-capitalize">{{
                            item.customer_name
                        }}</span>
                    </div>
                    <div v-if="column['date']" class="trans-props">
                        <span>Tanggal</span>
                        <div>
                            <span>{{ formatDate(item.date, "date") }}</span>
                            <span>{{ formatDate(item.date, "time") }}</span>
                        </div>
                    </div>
                    <div v-if="column['tstatus']" class="trans-props">
                        <span>Status Transaksi</span>
                        <span
                            class="d-tag"
                            :class="statusTag(item.status.code, 'transaksi')"
                        >
                            {{ item.status.status }}
                        </span>
                    </div>
                    <div v-if="column['amount']" class="trans-props">
                        <span>Nilai Transaksi</span>
                        <span>{{ formatCurrency(item.total_amount) }}</span>
                    </div>
                    <div v-if="column['sales']" class="trans-props">
                        <span>Sales</span>
                        <span class="d-uppercase">{{ item.sales }}</span>
                    </div>
                    <div v-if="column['depo']" class="trans-props">
                        <span>Depo</span>
                        <span class="d-uppercase">{{ item.depo }}</span>
                    </div>
                    <div v-if="column['pstatus']" class="trans-props">
                        <span>Status Pembayaran</span>
                        <span
                            class="d-tag"
                            :class="
                                statusTag(
                                    item.payment_status.code,
                                    'pembayaran'
                                )
                            "
                            >{{ item.payment_status.status }}</span
                        >
                    </div>
                    <div class="trans-button">
                        <div><Button label="Detail" /></div>
                    </div>
                </div>
                <RiwayatTransaksiListSkeleton
                    v-if="transactionStore.isLoading"
                    :row-per-page="rowPerPage"
                />
                <div v-if="!transactions.length" class="empty">
                    Tidak data untuk ditampilkan
                </div>
            </div>
            <div class="transaction-paginator">
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

    <div
        class="d-sidebar from-right"
        :class="{ 'd-sidebar-active': filterMenu }"
    >
        <div class="d-sidebar-wrapper" @click="filterMenu = false"></div>
        <div class="d-sidebar-content filter-menu">
            <div class="header">
                <h5>Opsi Filter</h5>
                <span
                    class="span-nav-button"
                    role="button"
                    tabindex="0"
                    @click="filterMenu = false"
                >
                    <span class="material-symbols-outlined"> close </span>
                </span>
            </div>
            <div class="subheader">
                <span>Konfigurasi dan filter pada tabel.</span>
            </div>
            <div class="body">
                <h6>Filter</h6>
                <div class="filter-section">
                    <InputText
                        v-model="filters['reference']['value']"
                        id="filter-nofak"
                        placeholder="Filter No Faktur"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['customer_name']['value']"
                        id="filter-cust"
                        placeholder="Filter Pelanggan"
                    />
                </div>
                <div class="filter-section">
                    <Calendar
                        v-model="filters['date']['value']"
                        inputId="filter-date"
                        placeholder="Tanggal"
                    />
                </div>
                <div class="filter-section">
                    <Dropdown
                        v-model="tsfq"
                        :options="tsopt"
                        optionLabel="label"
                        placeholder="Filter Status Transaksi"
                        input-id="filter-ps"
                        @update:model-value="
                            filters['status.code']['value'] = tsfq['code']
                        "
                    >
                        <template #value="slotProps">
                            <span
                                v-if="slotProps.value"
                                class="d-tag"
                                :class="
                                    statusTag(slotProps.value.code, 'transaksi')
                                "
                                >{{ slotProps.value.label }}</span
                            >
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <span
                                class="d-tag"
                                :class="
                                    statusTag(
                                        slotProps.option.code,
                                        'transaksi'
                                    )
                                "
                                >{{ slotProps.option.label }}</span
                            >
                        </template>
                    </Dropdown>
                </div>
                <div class="filter-section">
                    <InputNumber
                        v-model="filters['total_amount']['value']"
                        mode="currency"
                        locale="id-ID"
                        currency="IDR"
                        inputId="filter-amount"
                        placeholder="Filter Nilai Transaksi"
                        :inputStyle="{ width: '100%' }"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['sales']['value']"
                        id="filter-sales"
                        placeholder="Filter Sales"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['depo']['value']"
                        inputId="filter-depo"
                        placeholder="Filter Depo"
                    />
                </div>
                <div class="filter-section">
                    <Dropdown
                        v-model="psfq"
                        :options="psopt"
                        optionLabel="label"
                        placeholder="Filter Status Pembayaran"
                        input-id="filter-ps"
                        @update:model-value="
                            filters['payment_status.code']['value'] =
                                psfq['code']
                        "
                    >
                        <template #value="slotProps">
                            <span
                                v-if="slotProps.value"
                                class="d-tag"
                                :class="
                                    statusTag(
                                        slotProps.value.code,
                                        'pembayaran'
                                    )
                                "
                                >{{ slotProps.value.label }}</span
                            >
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <span
                                class="d-tag"
                                :class="
                                    statusTag(
                                        slotProps.option.code,
                                        'pembayaran'
                                    )
                                "
                                >{{ slotProps.option.label }}</span
                            >
                        </template>
                    </Dropdown>
                </div>
                <h6>Kolom</h6>
                <div class="filter-section">
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['nofak']"
                            inputId="col-nofak"
                            :binary="true"
                        />
                        <label for="col-nofak">No Faktur</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['cust']"
                            inputId="col-cust"
                            :binary="true"
                        />
                        <label for="col-cust">Pelanggan</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['date']"
                            inputId="col-date"
                            :binary="true"
                        />
                        <label for="col-date">Tanggal</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['tstatus']"
                            inputId="col-status"
                            :binary="true"
                        />
                        <label for="col-status">Status Transaksi</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['amount']"
                            inputId="col-amount"
                            :binary="true"
                        />
                        <label for="col-amount">Nilai Transaksi</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['sales']"
                            inputId="col-sales"
                            :binary="true"
                        />
                        <label for="col-sales">Sales</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['depo']"
                            inputId="col-depo"
                            :binary="true"
                        />
                        <label for="col-depo">Depo</label>
                    </div>
                    <div class="flex gap-1">
                        <CheckBox
                            v-model="column['pstatus']"
                            inputId="col-paystatus"
                            :binary="true"
                        />
                        <label for="col-paystatus">Status Pembayaran</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTransactionStore } from "../store/TransactionStore";
import { ref, onMounted, computed } from "vue";
import RiwayatTransaksiTableSkeleton from "./skeleton/RiwayatTransaksiTableSkeleton.vue";
import RiwayatTransaksiListSkeleton from "./skeleton/RiwayatTransaksiListSkeleton.vue";

const transactionStore = useTransactionStore();
const rowPerPage = ref(10);
const currPage = ref(0);
const rowLenghtPostFilter = ref();
const filterMenu = ref(false);
const filters = ref();
const tsfq = ref(null);
const psfq = ref(null);
const dt = ref(null);
const initFilter = () => {
    filters.value = {
        reference: { value: null, matchMode: "CONTAINS" },
        customer_name: { value: null, matchMode: "CONTAINS" },
        date: { value: null, matchMode: "DATE" },
        "status.code": { value: null, matchMode: "EQUALS" },
        total_amount: { value: null, matchMode: "EQUALS" },
        sales: { value: null, matchMode: "CONTAINS" },
        depo: { value: null, matchMode: "CONTAINS" },
        "payment_status.code": { value: null, matchMode: "EQUALS" },
    };
    tsfq.value = null;
    psfq.value = null;
};
initFilter();
const sortState = ref({
    reference: null,
    customer_name: null,
    date: null,
    "status.code": null,
    total_amount: null,
    sales: null,
    depo: null,
    "payment_status.code": null,
});

const transactions = computed(() => {
    let data = transactionStore.filterTransaction(filters.value);

    data = transactionStore.sortTransaction(data, sortState.value);

    dt.value = data;

    rowLenghtPostFilter.value = data.length;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});
const tsopt = ref([
    { label: "Gagal", code: 0 },
    { label: "Selesai", code: 1 },
    { label: "Belum Selesai", code: 2 },
    { label: "Batal", code: 3 },
]);
const psopt = ref([
    { label: "Belum Dibayar", code: 0 },
    { label: "Lunas", code: 1 },
    { label: "Parsial", code: 2 },
]);
const column = ref({
    nofak: true,
    cust: true,
    date: true,
    tstatus: true,
    amount: true,
    sales: true,
    depo: true,
    pstatus: true,
});

onMounted(async () => {
    await transactionStore.getTransaction();
    transactionStore.filterTransaction(filters.value);
    transactionStore.isLoading = false;
});

const exportTable = () => {
    const data = dt.value;
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data_transaksi.csv");
    link.click();
};

const convertToCSV = (data) => {
    const reshape = data.map((item) => {
        for (let props in item) {
            if (typeof item[props] === "object") {
                item[props] = item[props]["status"];
            }
        }

        return item;
    });

    const headers = Object.keys(data[0]);
    const rows = reshape.map((item) => headers.map((header) => item[header]));
    const headerRow = [
        "No Faktur",
        "Pelanggan",
        "Tanggal",
        "Status Transaksi",
        "Nilai Transaksi",
        "Sales",
        "Depo",
        "Status Pembayaran",
    ].join(",");
    const csvRow = [headerRow, ...rows.map((row) => row.join(","))];
    return csvRow.join("\n");
};

const changeSortState = (field) => {
    for (let item in sortState.value) {
        if (item !== field) sortState.value[item] = null;
    }

    if (sortState.value[field] === null) {
        sortState.value[field] = true;
    } else if (sortState.value[field]) {
        sortState.value[field] = false;
    } else if (!sortState.value[field]) {
        sortState.value[field] = null;
    }
};

const sortStateIcon = (state) => {
    if (state === null) return "unfold_more";
    else if (state) return "keyboard_double_arrow_up";
    else if (!state) return "keyboard_double_arrow_down";
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

const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

const formatDate = (value, type) => {
    // let newDate = new Date(value);
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
.tools-group {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    .span-nav-button {
        background-color: var(--primary-a0);
        padding: 1rem 1rem;

        &:hover {
            background-color: var(--primary-a1);
        }

        &:active {
            background-color: var(--primary-a0);
        }
    }
}

.filter-menu {
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h5 {
            margin: 0;
        }
    }

    .subheader {
        padding: 0.5rem 0 1rem 0;
        border-bottom: 1px solid var(--surface-input-border);
        color: var(--text-color-secondary);
    }

    .body {
        padding: 1rem 0;
        .filter-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
    }
}

.transaction-list {
    display: none;
}

.empty {
    border-bottom: 1px solid var(--surface-tborder);
    padding: 2rem 1rem;
    text-align: center;
    color: var(--text-color-secondary);
}

.transaction-item {
    padding: 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &:nth-of-type(even) {
        background-color: var(--primary-a0);
    }

    &:hover {
        .trans-props.nofak {
            position: relative;
            &::before {
                content: "";
                position: absolute;
                left: -0.75rem;
                top: -3px;
                width: 4px;
                height: 2rem;
                border-radius: 99px;
                background-color: var(--primary);
            }
        }
    }
}

.trans-props {
    &.nofak {
        & > span:first-of-type {
            &::after {
                content: ".";
                margin-right: 0.5rem;
            }
        }
    }

    &:not(.nofak) {
        display: grid;
        grid-template-columns: 11rem 1fr;

        & > span:first-of-type {
            display: flex;
            justify-content: space-between;
            margin-right: 0.5rem;

            &::after {
                content: ":";
            }
        }

        & > div {
            display: flex;
            flex-direction: column;
        }
    }
}

.trans-button {
    display: flex;
    justify-content: end;
}

@media screen and (max-width: 575px) {
    .data-header {
        flex-direction: column;
        .tools-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }

    .d-card {
        padding: 2rem 0;
    }
    .data-header-wrapper {
        padding: 0 1.5rem;
    }
    .transaction-table {
        display: none;
    }
    .transaction-list {
        display: flex;
        flex-direction: column;
    }
    .transaction-paginator {
        border-top: 1px solid var(--surface-tborder);
        margin: 0 1.5rem;
    }
}
</style>
