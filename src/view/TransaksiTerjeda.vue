<template>
    <div class="d-card" style="margin-top: 2rem">
        <div style="overflow: auto">
            <div class="table-header">
                <h5>Riwayat Transaksi</h5>
                <div class="flex gap-1 justify-content-end align-items-center">
                    <Dropdown
                        v-model="dateToFilterMode"
                        :options="dateToFilterModeOpt"
                        optionLabel="label"
                        placeholder="Pilih Mode"
                    />
                    <Calendar
                        v-if="dateToFilterMode.kode === 1"
                        v-model="previewDateToFilter"
                        :manualInput="false"
                        date-format="dd/mm/yy"
                        @update:model-value="handleSingleDatePicker()"
                        placeholder="Pilih Tanggal Tunggal"
                        style="min-width: 15.7rem"
                    />
                    <Calendar
                        v-if="dateToFilterMode.kode === 2"
                        v-model="previewDateToFilter"
                        :manualInput="false"
                        date-format="dd/mm/yy"
                        selectionMode="range"
                        @update:model-value="handleRangeDatePicker()"
                        placeholder="Pilih Tanggal Jajaran"
                        style="min-width: 15.7rem"
                    />
                    <div
                        style="
                            width: 1px;
                            height: 2rem;
                            background-color: var(--surface-input-border);
                            border-radius: 1px;
                        "
                    ></div>
                    <Dropdown
                        v-model="fieldToFilter"
                        :options="fieldToFilterOpt"
                        optionLabel="label"
                        style="min-width: 10rem"
                        @update:modelValue="query = null"
                    />
                    <Dropdown
                        v-if="isFilterStatus()"
                        v-model="statusToFilter"
                        :options="statusToFilterOpt"
                        optionLabel="label"
                        placeholder="Pilih status"
                        @update:modelValue="query = statusToFilter.kode"
                        style="min-width: 15rem"
                    >
                        <template #value="slotProps">
                            <span
                                v-if="slotProps.value"
                                class="d-tag"
                                :class="
                                    statusTag(
                                        slotProps.value.kode,
                                        isFilterStatus('label')
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
                                        slotProps.option.kode,
                                        isFilterStatus('label')
                                    )
                                "
                                >{{ slotProps.option.label }}</span
                            >
                        </template>
                    </Dropdown>
                    <span v-else class="d-sideicon-set d-input-iconleft">
                        <span class="material-symbols-outlined"> search </span>
                        <InputText
                            v-model="query"
                            :placeholder="
                                fieldToFilter.label === 'Global'
                                    ? 'Cari Transaksi'
                                    : `Cari ${fieldToFilter.label}`
                            "
                            style="min-width: 15rem"
                        />
                    </span>
                    <span
                        class="span-nav-button"
                        role="button"
                        tabindex="0"
                        @click="clearFilter()"
                    >
                        <span class="material-symbols-outlined">
                            filter_alt_off
                        </span>
                    </span>
                </div>
            </div>
            <table class="d-table">
                <thead>
                    <tr>
                        <th>No Faktur</th>
                        <th>Pelanggan</th>
                        <th>Tanggal</th>
                        <th>Status Transaksi</th>
                        <th>Nilai Transaksi</th>
                        <th>Sales</th>
                        <th>Depo</th>
                        <th>Status Pembayaran</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in transactions">
                        <td>
                            <span class="d-uppercase">{{
                                item.no_faktur
                            }}</span>
                        </td>
                        <td>
                            <span class="d-capitalize">{{
                                item.customer
                            }}</span>
                        </td>
                        <td>
                            <span>{{ formatDate(item.tanggal, "date") }}</span
                            ><br />
                            <span>{{ formatDate(item.tanggal, "time") }}</span>
                        </td>
                        <td>
                            <span
                                class="d-tag"
                                :class="
                                    statusTag(item.status.kode, 'transaksi')
                                "
                                >{{ item.status.status }}</span
                            >
                        </td>
                        <td>
                            <span>{{
                                formatCurrency(item.nilai_transaksi)
                            }}</span>
                        </td>
                        <td>
                            <span class="d-uppercase">{{ item.sales }}</span>
                        </td>
                        <td>
                            <span class="d-uppercase">{{ item.depo }}</span>
                        </td>
                        <td>
                            <span
                                class="d-tag"
                                :class="
                                    statusTag(
                                        item.status_pembayaran.kode,
                                        'pembayaran'
                                    )
                                "
                                >{{ item.status_pembayaran.status }}</span
                            >
                        </td>
                        <td><Button label="Detail" /></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="9">
                            <Paginator
                                v-model:first="currPage"
                                :rows="rowPerPage"
                                :total-records="rowLenghtPostFilter"
                                style="width: 100%"
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>
<script setup>
import { useTransactionStore } from "../store/TransactionStore";
import { ref, onMounted, computed } from "vue";

const transactionStore = useTransactionStore();
const rowPerPage = ref(5);
const currPage = ref(0);
const transactions = computed(() => {
    let data = transactionStore.transaction;

    data = filterDataByDate(data, dateToFilter.value);

    data = filterData(data, query.value);

    rowLenghtPostFilter.value = data.length;

    return data.slice(currPage.value, currPage.value + rowPerPage.value);
});
const rowLenghtPostFilter = ref();
const query = ref();
const fieldToFilterOpt = ref([
    {
        label: "Global",
        values: [
            "no_faktur",
            "customer",
            "sales",
            "depo",
            "status.status",
            "status_pembayaran.status",
        ],
    },
    {
        label: "No Faktur",
        values: ["no_faktur"],
    },
    {
        label: "Customer",
        values: ["customer"],
    },
    {
        label: "Sales",
        values: ["sales"],
    },
    {
        label: "Depo",
        values: ["depo"],
    },
    {
        label: "Status Transaksi",
        values: ["status.kode"],
    },
    {
        label: "Status Pembayaran",
        values: ["status_pembayaran.kode"],
    },
]);
const fieldToFilter = ref(fieldToFilterOpt.value[0]);
const statusToFilterOpt = computed(() => {
    if (fieldToFilter.value === fieldToFilterOpt.value[5])
        return [
            { label: "Gagal", kode: 0 },
            { label: "Selesai", kode: 1 },
            { label: "Belum Selesai", kode: 2 },
            { label: "Batal", kode: 3 },
        ];
    if (fieldToFilter.value === fieldToFilterOpt.value[6])
        return [
            { label: "Belum Dibayar", kode: 0 },
            { label: "Lunas", kode: 1 },
            { label: "Parsial", kode: 2 },
        ];
});
const statusToFilter = ref();
const dateToFilterModeOpt = ref([
    { label: "Tanggal Tunggal", kode: 1 },
    { label: "Tanggal Jajaran", kode: 2 },
]);
const dateToFilterMode = ref(dateToFilterModeOpt.value[0]);
const previewDateToFilter = ref(null);
const dateToFilter = ref([]);

onMounted(async () => {
    await transactionStore.getTransaction();
    transactionStore.isLoading = false;
});

const clearFilter = () => {
    query.value = null;
    fieldToFilter.value = fieldToFilterOpt.value[0];
    previewDateToFilter.value = null;
    dateToFilter.value = [];
    dateToFilterMode.value = dateToFilterModeOpt.value[0];
};
const isFilterStatus = (type) => {
    if (type === "label") {
        if (fieldToFilter.value === fieldToFilterOpt.value[5])
            return "transaksi";
        if (fieldToFilter.value === fieldToFilterOpt.value[6])
            return "pembayaran";
    }
    if (fieldToFilter.value === fieldToFilterOpt.value[5]) return true;
    if (fieldToFilter.value === fieldToFilterOpt.value[6]) return true;
    return false;
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
const handleSingleDatePicker = () => {
    dateToFilter.value[0] = previewDateToFilter.value.getTime();
    dateToFilter.value[1] = previewDateToFilter.value.getTime() + 86_400_000;
    console.log(dateToFilter.value);
};
const handleRangeDatePicker = () => {
    dateToFilter.value[0] = previewDateToFilter.value[0].getTime();
    dateToFilter.value[1] = previewDateToFilter.value[1]
        ? previewDateToFilter.value[1].getTime()
        : null;
    console.log(dateToFilter.value);
};
const formatDate = (date, type) => {
    let newDate = new Date(date);
    if (type === "date") return `${newDate.toDateString()}`;
    else if (type === "time") return `${newDate.toLocaleTimeString()}`;
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
};
const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};
const filterData = (data, query) => {
    query = query || query === 0 ? query : "";
    return data.filter((item) => {
        for (let field of fieldToFilter.value.values) {
            if (field.toString().includes(".")) {
                let key1 = field.toString().split(".")[0];
                let key2 = field.toString().split(".")[1];

                console.log(query);
                if (
                    item[key1][key2]
                        .toString()
                        .toLowerCase()
                        .includes(query.toString().toLowerCase())
                ) {
                    return true;
                }
            } else if (
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
const filterDataByDate = (data, date) => {
    return data.filter((item) => {
        if (!date[0] && !date[1]) return true;
        else if (item["tanggal"] >= date[0] && item["tanggal"] < date[1]) {
            return true;
        }
        return false;
    });
};

//
</script>
<style scoped lang="scss">
.table-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h5 {
        margin-bottom: 0;
    }
}
</style>
