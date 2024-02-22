<template>
    <h5 class="page-title">Laporan Pendapatan</h5>
    <span class="page-subtitle">Laporan pendapatan dan panjak tiap bulan.</span>

    <div class="d-card">
        <div class="income">
            <div class="data-header">
                <h5>Laporan Pendapatan</h5>
                <div class="flex gap-1 tools-group">
                    <span class="d-sideicon-set d-input-iconleft filter-item">
                        <span class="material-symbols-outlined"> search </span>
                        <InputText
                            v-model="query"
                            placeholder="Cari laporan"
                            style="width: 100%"
                        />
                    </span>
                    <span
                        class="tool span-nav-button left-labeled"
                        role="button"
                        @click="filterMenu = true"
                    >
                        <span>Filter</span>
                        <span class="material-symbols-outlined">
                            filter_alt
                        </span>
                    </span>
                </div>
            </div>
            <div class="income-table">
                <div class="table-wrapper">
                    <table class="d-table">
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>No Faktur</th>
                                <th>Depo</th>
                                <th>Sales</th>
                                <th>Pelanggan</th>
                                <th>Total</th>
                                <th>Pajak</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in report">
                                <td>
                                    <div class="flex flex-column">
                                        <span>{{
                                            formatDate(item.date, "date")
                                        }}</span>
                                        <span>{{
                                            formatDate(item.date, "time")
                                        }}</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="d-uppercase">{{
                                        item.reference.split(/(?=INV)/g)[0]
                                    }}</span
                                    ><br />
                                    <span class="d-uppercase">{{
                                        item.reference.split(/(?=INV)/g)[1]
                                    }}</span>
                                </td>
                                <td>
                                    <span>{{ item.depo }}</span>
                                </td>
                                <td>
                                    <span>{{ item.sales }}</span>
                                </td>
                                <td>
                                    <span>{{ item.customer_name }}</span>
                                </td>
                                <td>
                                    <span>{{
                                        formatCurrency(item.total_amount)
                                    }}</span>
                                </td>
                                <td>
                                    <span>{{
                                        formatCurrency(item.tax_amount)
                                    }}</span>
                                </td>
                            </tr>
                            <tr v-if="report && !report.length">
                                <td colspan="7">
                                    <div
                                        style="
                                            text-align: center;
                                            color: var(--text-color-secondary);
                                        "
                                    >
                                        Tidak ada data ditemukan
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                                <td>
                                    <span class="summary">Total</span>
                                </td>
                                <td>
                                    <span class="summary">{{
                                        formatCurrency(
                                            sum ? sum.sum_total_amount : 0
                                        )
                                    }}</span>
                                </td>
                                <td>
                                    <span class="summary">{{
                                        formatCurrency(
                                            sum ? sum.sum_tax_amount : 0
                                        )
                                    }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="income-list"></div>
            <div class="income-paginator">
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
                <div class="filter-section">
                    <label>Filter Tanggal</label>
                    <Calendar
                        v-model="filters.start_date"
                        placeholder="Pilih Tanggal Awal"
                        @update:modelValue="onFilter()"
                    />
                    <Calendar
                        v-model="filters.end_date"
                        placeholder="Pilih Tanggal Akhir"
                        @update:modelValue="onFilter()"
                    />
                </div>
                <div class="filter-section">
                    <label>Filter No Faktur</label>
                    <InputText
                        v-model="filters.reference"
                        placeholder="No Faktur"
                        @update:modelValue="onFilter()"
                    />
                </div>
                <div class="filter-section">
                    <label>Filter Depo</label>
                    <InputText
                        v-model="filters.depo"
                        placeholder="Kode Depo"
                        @update:modelValue="onFilter()"
                    />
                </div>
                <div class="filter-section">
                    <label>Filter Sales</label>
                    <InputText
                        v-model="filters.seller"
                        placeholder="Kode Sales"
                        @update:modelValue="onFilter()"
                    />
                </div>
                <div class="filter-section">
                    <label>Filter Pelanggan</label>
                    <InputText
                        v-model="filters.customer"
                        placeholder="Nama Pelanggan"
                        @update:modelValue="onFilter()"
                    />
                </div>
                <div class="flex justify-content-end">
                    <Button
                        label="Reset Filter"
                        severity="danger"
                        @click="onResetFilter()"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useReportStore } from "../store/ReportStore";
import { useSalesStore } from "../store/SalesStore";
import debounce from "lodash.debounce";

const reportStore = useReportStore();
const salesStore = useSalesStore();
const report = computed(() => {
    return reportStore.reportIncome["data"];
});
const sum = computed(() => {
    return reportStore.reportIncome["sum"];
});
const query = ref("");
const rpp = ref(10);
const page = ref();
const total = ref();
const filterMenu = ref(false);
const filters = ref();

onBeforeMount(() => {
    initFilter();
});

onMounted(async () => {
    await reportStore.GET__REPORT_INCOME(false, rpp.value, filters.value);
    total.value = reportStore.reportIncome["meta"]["total"];
});

const initFilter = () => {
    filters.value = {
        global: "",
        start_date: "",
        end_date: "",
        reference: "",
        depo: "",
        seller: "",
        customer: "",
    };
};

const onChangePage = async (e) => {
    await reportStore.GET__REPORT_INCOME(
        e["page"] + 1,
        rpp.value,
        filters.value
    );
};

const delayReqFilter = debounce(async () => {
    await reportStore.GET__REPORT_INCOME(false, rpp.value, filters.value);
    total.value = reportStore.reportIncome["meta"]["total"];
}, 700);

const onResetFilter = async () => {
    initFilter();
    await reportStore.GET__REPORT_INCOME(false, rpp.value, filters.value);
    total.value = reportStore.reportIncome["meta"]["total"];
};

const onFilter = async () => {
    await delayReqFilter();
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
.summary {
    font-weight: 500;
}
.tools-group {
    .tool {
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
</style>
