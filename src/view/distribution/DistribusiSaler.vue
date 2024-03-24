<template>
    <h5 class="page-title">Distribusi Sales</h5>
    <span class="page-subtitle">Daftar distribusi produk kepada sales.</span>
    <div class="d-card">
        <div class="data-header">
            <h5>Distribusi Sales</h5>
            <div class="tools-group">
                <span class="d-sideicon-set d-input-iconleft filter-item">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText
                        v-model="filters['search']"
                        placeholder="Cari data distribusi"
                        style="width: 100%"
                        @update:modelValue="onSearch()"
                    />
                </span>
            </div>
        </div>

        <div class="data-table">
            <div class="table-wrapper">
                <table class="d-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Depo</th>
                            <th>Sales</th>
                            <th>Tipe Sales</th>
                            <th>Jumlah Item</th>
                            <th>Nilai Item</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-if="dist && !distStore.isLoading"
                            v-for="item in dist"
                        >
                            <td>
                                <div class="flex flex-column gap-0">
                                    <span>{{
                                        formatDate(item.date, "date")
                                    }}</span>
                                    <span>{{
                                        formatDate(item.date, "time")
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <span>{{ item.depo ? item.depo : "-" }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.seller ? item.seller : "-"
                                }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.seller_type ? item.seller_type : "-"
                                }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.total_product
                                        ? item.total_product
                                        : "-"
                                }}</span>
                            </td>
                            <td>
                                <span>{{
                                    formatCurrency(item.product_price)
                                }}</span>
                            </td>
                            <td>
                                <Button icon="search" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="data-list"></div>

        <div class="data-paginator">
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useDistStore } from "../../store/DistributionStore.js";

const filters = ref();
const rpp = ref(10);
const page = ref();
const total = ref();
const distStore = useDistStore();
const dist = computed(() => {
    return distStore.dist["data"];
});

onMounted(async () => {
    await distStore.GET__DISTRIBUTION(false, rpp.value, filters.value);
    total.value = distStore.dist["meta"]["total"];
});

const initFilter = () => {
    filters.value = {
        search: "",
    };
};

const onChangePage = async () => {
    await distStore.GET__DISTRIBUTION(page.value, rpp.value, filters.value);
    total.value = distStore.dist["meta"]["total"];
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
const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

initFilter();

//
</script>

<style scoped lang="scss"></style>
