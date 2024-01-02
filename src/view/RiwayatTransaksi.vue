<template>
    <h5 style="margin-top: 0">Riwayat Transaksi</h5>
    <span
        style="
            color: var(--text-color-secondary);
            margin-bottom: 1rem;
            display: inline-block;
        "
        >Daftar transaksi yang pernah dilakukan user.</span
    >
    <div class="d-card">
        <template v-if="transactionStore.isLoading">
            <div>loading...</div>
        </template>
        <template v-else>
            <DataTable
                class="table-view"
                v-model:filters="filters"
                :value="transactions"
                :globalFilterFields="columnToFilter.value"
                style="width: 100%"
                paginator
                :rows="5"
            >
                <template #header>
                    <div class="table-header-group">
                        <h5 style="margin-bottom: 0">Riwayat Transaksi</h5>
                        <div class="flex gap-1 align-items-center">
                            <Dropdown
                                v-model="columnToFilter"
                                :options="columnToFilterOpt"
                                optionLabel="label"
                                style="min-width: 10rem"
                                @update:modelValue="
                                    filters['global'].value = null;
                                    statusToFilter = null;
                                "
                            />
                            <Dropdown
                                v-if="
                                    columnToFilter === columnToFilterOpt[5] ||
                                    columnToFilter === columnToFilterOpt[6]
                                "
                                v-model="statusToFilter"
                                :options="statusToFilterOpt"
                                optionLabel="label"
                                placeholder="Pilih status"
                                style="width: 15rem"
                                @update:modelValue="
                                    filters['global'].value =
                                        statusToFilter.kode
                                "
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value">
                                        <span
                                            v-if="
                                                columnToFilter ===
                                                columnToFilterOpt[5]
                                            "
                                            class="d-tag"
                                            :class="
                                                statusTransaksi(
                                                    slotProps.value.kode
                                                )
                                            "
                                            >{{ slotProps.value.label }}</span
                                        >
                                        <span
                                            v-if="
                                                columnToFilter ===
                                                columnToFilterOpt[6]
                                            "
                                            class="d-tag"
                                            :class="
                                                statusPembayaran(
                                                    slotProps.value.kode
                                                )
                                            "
                                            >{{ slotProps.value.label }}</span
                                        >
                                    </div>
                                    <div v-else>
                                        {{ slotProps.placeholder }}
                                    </div>
                                </template>
                                <template #option="slotProps">
                                    <span
                                        v-if="
                                            columnToFilter ===
                                            columnToFilterOpt[5]
                                        "
                                        class="d-tag"
                                        :class="
                                            statusTransaksi(
                                                slotProps.option.kode
                                            )
                                        "
                                        >{{ slotProps.option.label }}</span
                                    >
                                    <span
                                        v-if="
                                            columnToFilter ===
                                            columnToFilterOpt[6]
                                        "
                                        class="d-tag"
                                        :class="
                                            statusPembayaran(
                                                slotProps.option.kode
                                            )
                                        "
                                        >{{ slotProps.option.label }}</span
                                    >
                                </template>
                            </Dropdown>
                            <span
                                v-else
                                class="d-sideicon-set d-input-iconleft"
                            >
                                <span class="material-symbols-outlined">
                                    search
                                </span>
                                <InputText
                                    v-model="filters['global'].value"
                                    placeholder="Cari transaksi"
                                    style="width: 15rem"
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
                </template>

                <Column header="No Faktur" field="no_faktur">
                    <template #body="{ data }">
                        <span class="d-uppercase">{{ data.no_faktur }}</span>
                    </template>
                </Column>
                <Column header="Pelanggan">
                    <template #body="slotProps">
                        <span class="d-capitalize">{{
                            slotProps.data.customer
                        }}</span>
                    </template>
                </Column>
                <Column header="Tanggal">
                    <template #body="slotProps">
                        <span class="d-capitalize"
                            >{{ formatDate(slotProps.data.tanggal, "date") }}
                            <br />
                            {{
                                formatDate(slotProps.data.tanggal, "time")
                            }}</span
                        >
                    </template>
                </Column>
                <Column header="Status Transaksi">
                    <template #body="slotProps">
                        <span
                            class="d-tag"
                            :class="statusTransaksi(slotProps.data.status.kode)"
                            >{{ slotProps.data.status.status }}</span
                        >
                    </template>
                </Column>
                <Column header="Nilai Transaksi">
                    <template #body="slotProps">
                        <span>{{
                            new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(slotProps.data.nilai_transaksi)
                        }}</span>
                    </template>
                </Column>
                <Column header="Sales">
                    <template #body="slotProps">
                        <span class="d-uppercase">{{
                            slotProps.data.sales
                        }}</span>
                    </template>
                </Column>
                <Column header="Depo">
                    <template #body="slotProps">
                        <span class="d-uppercase">{{
                            slotProps.data.depo
                        }}</span>
                    </template>
                </Column>
                <Column header="Status Pembayaran">
                    <template #body="slotProps">
                        <span
                            class="d-tag"
                            :class="
                                statusPembayaran(
                                    slotProps.data.status_pembayaran.kode
                                )
                            "
                            >{{ slotProps.data.status_pembayaran.status }}</span
                        >
                    </template>
                </Column>
                <Column>
                    <template #body="slotProps">
                        <div class="row-button">
                            <Button label="Detail" />
                        </div>
                    </template>
                </Column>
            </DataTable>

            <DataView
                :value="transactions"
                class="list-view"
                paginator
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            >
                <template #header>
                    <h5 style="margin-top: 0">Riwayat Transaksi</h5>
                    <span
                        class="d-sideicon-set d-input-iconleft"
                        style="width: 100%"
                    >
                        <span class="material-symbols-outlined"> search </span>
                        <InputText
                            v-model="searchTransaction"
                            placeholder="Cari transaksi"
                            @update:modelValue="filteredTransaction()"
                            style="width: 100%"
                        />
                    </span>
                </template>
                <template #list="slotProps">
                    <div class="transaction-list">
                        <div
                            v-for="(item, index) in slotProps.items"
                            class="transaction-item"
                        >
                            <div style="margin-bottom: 1rem">
                                <span>No Faktur. </span>
                                <span class="d-uppercase">{{
                                    item.no_faktur
                                }}</span>
                            </div>
                            <div class="row">
                                <div class="header">Pelanggan</div>
                                <div>:</div>
                                <div class="body d-capitalize">
                                    {{ item.customer }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Tanggal</div>
                                <div>:</div>
                                <div class="body d-capitalize">
                                    {{ formatDate(item.tanggal, "date") }}
                                    <br />
                                    {{ formatDate(item.tanggal, "time") }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Status Transaksi</div>
                                <div>:</div>
                                <div
                                    class="body d-tag"
                                    :class="statusTransaksi(item.status.kode)"
                                >
                                    {{ item.status.status }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Nilai Transaksi</div>
                                <div>:</div>
                                <div class="body">
                                    {{
                                        new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(item.nilai_transaksi)
                                    }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Sales</div>
                                <div>:</div>
                                <div class="body d-uppercase">
                                    {{ item.sales }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Depo</div>
                                <div>:</div>
                                <div class="body d-uppercase">
                                    {{ item.depo }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header">Status Pembayaran</div>
                                <div>:</div>
                                <div
                                    class="body d-tag"
                                    :class="
                                        statusPembayaran(
                                            item.status_pembayaran.kode
                                        )
                                    "
                                >
                                    {{ item.status_pembayaran.status }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="header"></div>
                                <div></div>
                                <div class="body">
                                    <div class="row-button">
                                        <Button label="Detail" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </template>
    </div>
</template>

<script setup>
import { useTransactionStore } from "../store/TransactionStore";
import { ref, onMounted, computed } from "vue";
import { FilterMatchMode } from "primevue/api";

const transactionStore = useTransactionStore();
const transactions = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const searchTransaction = ref();
const columnToFilterOpt = ref([
    {
        label: "Global",
        value: [
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
        value: ["no_faktur"],
    },
    {
        label: "Customer",
        value: ["customer"],
    },
    {
        label: "Sales",
        value: ["sales"],
    },
    {
        label: "Depo",
        value: ["depo"],
    },
    {
        label: "Status Transaksi",
        value: ["status.kode"],
    },
    {
        label: "Status Pembayaran",
        value: ["status_pembayaran.kode"],
    },
    {
        label: "Tanggal Transaksi",
        value: ["tanggal"],
    },
]);
const columnToFilter = ref(columnToFilterOpt.value[0]);
const statusToFilterOpt = computed(() => {
    if (columnToFilter.value === columnToFilterOpt.value[5])
        return [
            { label: "Gagal", kode: 0 },
            { label: "Selesai", kode: 1 },
            { label: "Belum Selesai", kode: 2 },
            { label: "Batal", kode: 3 },
        ];
    if (columnToFilter.value === columnToFilterOpt.value[6])
        return [
            { label: "Belum Dibayar", kode: 0 },
            { label: "Lunas", kode: 1 },
            { label: "Parsial", kode: 2 },
        ];
});
const statusToFilter = ref();

onMounted(async () => {
    await transactionStore.getTransaction();
    transactions.value = transactionStore.transaction;
    transactionStore.isLoading = false;
});

const clearFilter = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    columnToFilter.value = columnToFilterOpt.value[0];
};

const statusPembayaran = (statusCode) => {
    if (statusCode === 0) return "d-tag-warning";
    if (statusCode === 1) return "d-tag-success";
    if (statusCode === 2) return "d-tag-info";
};
const statusTransaksi = (statusCode) => {
    if (statusCode === 0 || statusCode === 3) return "d-tag-danger";
    if (statusCode === 1) return "d-tag-success";
    if (statusCode === 2) return "d-tag-warning";
};
const formatDate = (date, type) => {
    let newDate = new Date(date);
    if (type === "date") return `${newDate.toDateString()}`;
    else if (type === "time") return `${newDate.toLocaleTimeString()}`;
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
};

//
</script>

<style scoped lang="scss">
.table-view {
    display: none;
}
@media screen and (min-width: 640px) {
    .table-view {
        display: contents;
    }
    .list-view {
        display: none;
    }
}

.table-header-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.transaction-list {
    display: flex;
    flex-direction: column;
}
.transaction-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    padding: 1.5rem 0;
    position: relative;

    &:not(:first-of-type) {
        border-top: 2px dashed var(--surface-input-border);
    }

    &:hover {
        &::before {
            content: "";
            position: absolute;
            left: -0.75rem;
            width: 4px;
            height: 60%;
            border-radius: 99px;
            background-color: var(--primary);
        }
    }

    &:nth-child(odd) {
        box-shadow: 0 0 0 100vmax var(--primary-a0);
        clip-path: inset(0 -100vmax);
        background: var(--primary-a0);
    }

    .row {
        display: grid;
        grid-template-columns: 11rem 1rem 1fr;

        .row-button {
            display: flex;
            justify-content: end;
            margin-top: 1.5rem;
        }
    }
}
</style>
