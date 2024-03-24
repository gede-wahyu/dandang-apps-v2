<template>
    <h5 class="page-title">Riwayat Transaksi</h5>
    <span class="page-subtitle"
        >Daftar riwayat transaksi yang pernah dilakukan.</span
    >

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
                        @click="onResetFilter()"
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
                                <th v-if="column['nofak']">No Faktur</th>
                                <th v-if="column['cust']">Pelanggan</th>
                                <th v-if="column['date']">Tanggal</th>
                                <th v-if="column['tstatus']">Status</th>
                                <th v-if="column['amount']">Nilai Transaksi</th>
                                <th v-if="column['sales']">Sales</th>
                                <th v-if="column['depo']">Depo</th>
                                <th v-if="column['pstatus']">
                                    Status Pembayaran
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
                                <td>
                                    <div class="flex gap-0">
                                        <Button
                                            icon="search"
                                            @click="openTransDetail(item)"
                                        />
                                        <Button
                                            icon="edit"
                                            severity="warning"
                                            @click="goToDetail(item)"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tr
                            v-if="
                                transactions &&
                                !transactions.length &&
                                !transactionStore.isLoading
                            "
                            class="empty"
                        >
                            <td colspan="9">
                                Tidak ada data untuk ditampilkan
                            </td>
                        </tr>
                        <RiwayatTransaksiTableSkeleton
                            v-if="transactionStore.isLoading"
                            :row-per-page="rpp"
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
                        <div>
                            <Button
                                label="Detail"
                                @click="openTransDetail(item)"
                                style="margin-right: 0.5rem"
                            />
                            <Button
                                label="Edit"
                                severity="warning"
                                @click="goToDetail(item)"
                            />
                        </div>
                    </div>
                </div>
                <RiwayatTransaksiListSkeleton
                    v-if="transactionStore.isLoading"
                    :row-per-page="rpp"
                />
                <div
                    v-if="
                        transactions &&
                        !transactions.length &&
                        !transactionStore.isLoading
                    "
                    class="empty"
                >
                    Tidak ada data untuk ditampilkan
                </div>
            </div>
            <div class="transaction-paginator">
                <Paginator
                    v-model:first="page"
                    :rows="rpp"
                    :total-records="total"
                    style="width: 100%"
                    :template="{
                        '575px':
                            'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                        default:
                            'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    }"
                    @page="onChangePage($event)"
                />
            </div>
        </div>
    </div>

    <div
        class="d-sidebar from-right"
        :class="{ 'd-sidebar-active': filterMenu }"
    >
        <div class="d-sidebar-wrapper" @click="onCloseFilter()"></div>
        <div class="d-sidebar-content filter-menu">
            <div class="header">
                <h5>Opsi Filter</h5>
                <span
                    class="span-nav-button"
                    role="button"
                    tabindex="0"
                    @click="onCloseFilter()"
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
                        v-model="filters['reference']"
                        id="filter-nofak"
                        placeholder="Filter No Faktur"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['customer_name']"
                        id="filter-cust"
                        placeholder="Filter Pelanggan"
                    />
                </div>
                <div class="filter-section">
                    <Calendar
                        v-model="filterDate"
                        inputId="filter-date-start"
                        placeholder="Filter Tanggal"
                        selectionMode="range"
                        :manualInput="false"
                        @update:modelValue="handleFilterDate()"
                    />
                </div>
                <div class="filter-section">
                    <Dropdown
                        v-model="tsfq"
                        :options="tsopt"
                        optionLabel="label"
                        placeholder="Filter Status Transaksi"
                        input-id="filter-ts"
                        @update:model-value="filters['status'] = tsfq['code']"
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
                        v-model="filters['min_total_amount']"
                        mode="currency"
                        locale="id-ID"
                        currency="IDR"
                        inputId="filter-amount-min"
                        placeholder="Filter Nilai Transaksi Min"
                        :inputStyle="{ width: '100%' }"
                    />
                </div>
                <div class="filter-section">
                    <InputNumber
                        v-model="filters['max_total_amount']"
                        mode="currency"
                        locale="id-ID"
                        currency="IDR"
                        inputId="filter-amount-max"
                        placeholder="Filter Nilai Transaksi Max"
                        :inputStyle="{ width: '100%' }"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['seller']"
                        id="filter-sales"
                        placeholder="Filter Sales"
                    />
                </div>
                <div class="filter-section">
                    <InputText
                        v-model="filters['depo']"
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
                            filters['payment_status'] = psfq['code']
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
                <div class="filter-button">
                    <Button
                        label="Reset"
                        severity="danger"
                        @click="onResetFilter()"
                    />
                    <Button label="Terapkan" @click="onFilter()" />
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

    <Dialog
        v-model:visible="transDetailModal"
        modal
        dismissableMask
        :style="{ width: '55rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '100vw' }"
        class="position-bottom"
    >
        <template #header>
            <div class="transaction-details-header">
                <h5>Detail Transaksi</h5>
                <span
                    class="span-nav-button"
                    role="button"
                    tabindex="0"
                    @click="goToDetail(selectedTransaction)"
                >
                    <span class="material-symbols-outlined"> edit </span>
                </span>
            </div>
        </template>
        <div
            v-if="selectedTransaction && !transactionStore.selectedLoading"
            class="transaction-details"
        >
            <DetailTransaksiCard :data="selectedTransaction" />
        </div>
        <div v-else class="loading">
            <span class="material-symbols-outlined"> settings </span>
            <span> Loading... </span>
        </div>
    </Dialog>
</template>

<script setup>
import { useTransactionStore } from "../store/TransactionStore";
import { ref, onMounted, computed } from "vue";
import RiwayatTransaksiTableSkeleton from "./skeleton/RiwayatTransaksiTableSkeleton.vue";
import RiwayatTransaksiListSkeleton from "./skeleton/RiwayatTransaksiListSkeleton.vue";
import DetailTransaksiCard from "./DetailTransaksiCard.vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import debounce from "lodash.debounce";

const toast = useToast();
const router = useRouter();
const transactionStore = useTransactionStore();
const rpp = ref(10);
const page = ref(0);
const total = ref();
const filterMenu = ref(false);
const filters = ref();
const filterDate = ref();
const tsfq = ref(null);
const psfq = ref(null);
const dt = ref(null);
const initFilter = () => {
    filters.value = {
        reference: "",
        customer_name: "",
        start_date: "",
        end_date: "",
        status: "",
        min_total_amount: null,
        max_total_amount: null,
        seller: "",
        depo: "",
        payment_status: "",
    };
    tsfq.value = null;
    psfq.value = null;
};
initFilter();

const transactions = computed(() => {
    let data = transactionStore.transaction["data"];

    dt.value = data;

    return data;
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
const transDetailModal = ref(false);
const selectedTransaction = ref(null);

onMounted(async () => {
    await transactionStore.GET__TRANSACTION(false, rpp.value);
    total.value = transactionStore.transaction["meta"]["total"];
    transactionStore.isLoading = false;
});

const onChangePage = async (e) => {
    await transactionStore.GET__TRANSACTION(e["page"] + 1, rpp.value);
    transactionStore.isLoading = false;
};

const handleFilterDate = () => {
    let start_date;
    let end_date;

    if (filterDate.value[0]) {
        start_date = new Date(filterDate.value[0]);
        filters.value["start_date"] = start_date.toISOString().slice(0, 10);
    }
    if (filterDate.value[1]) {
        end_date = new Date(filterDate.value[1]);
        filters.value["end_date"] = end_date.toISOString().slice(0, 10);
    }
};

const onFilter = async () => {
    await transactionStore.GET__TRANSACTION(false, rpp.value, filters.value);
    total.value = transactionStore.transaction["meta"]["total"];
};

const onResetFilter = async () => {
    initFilter();
    onFilter();
};

const onCloseFilter = () => {
    filterMenu.value = false;
    initFilter();
    for (let field in transactionStore.transaction["filter"]) {
        filters.value[field] = transactionStore.transaction["filter"][field];
    }
};

const delayReqFilter = debounce(async () => {}, 700);

const exportTable = () => {
    const data = dt.value;
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data_transaksi.csv");
    link.click();
    location.reload();
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

const openTransDetail = async (data) => {
    transDetailModal.value = true;
    await transactionStore.GET__TRANSACTION_BY_ID(data.id);
    selectedTransaction.value = transactionStore.details;
};

const goToDetail = async (data) => {
    if (!data.id) {
        toast.add({
            severity: "warn",
            summary: "Permintaan Gagal",
            detail: "Terjadi keasalahan pada data yang diminta.",
            life: 3000,
        });
        return;
    }
    router.push({
        name: "transaction-detail",
        params: { id: data.id },
    });
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

.transaction-details-header {
    display: flex;
    align-items: center;
    h5 {
        margin: 0 0.5rem 0 0;
    }
    & > span {
        width: 2rem;
        height: 2rem;
        & > span {
            font-size: 1.5rem !important;
        }
    }
}

.filter-button {
    display: flex;
    justify-content: space-between;
}
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 3.5rem 0;
    color: var(--text-color-secondary);
    span:first-of-type {
        animation: spin infinite 4s;
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
@media screen and (min-width: 992px) {
    .transaction-details,
    .transaction-details-header {
        padding: 0 1rem;
    }
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
