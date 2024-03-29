<template>
    <h5 class="page-title">Daftar Sales</h5>
    <span class="page-subtitle">Daftar sales.</span>
    <div class="d-card">
        <div class="data-header">
            <h5>Daftar Sales</h5>
            <div class="tools-group">
                <span class="d-sideicon-set d-input-iconleft filter-item">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText
                        v-model="filters['search']"
                        placeholder="Cari sales"
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
                            <th>Kode</th>
                            <th>Nama</th>
                            <th>Tipe Sales</th>
                            <th>Alamat</th>
                            <th>No Hp</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!salesStore.isLoading" v-for="item in sales">
                            <td>
                                <span>{{ item.code }}</span>
                            </td>
                            <td>
                                <span>{{ item.name }}</span>
                            </td>
                            <td>
                                <span>{{ item.type ? item.type : "-" }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.address ? item.address : "-"
                                }}</span>
                            </td>
                            <td>
                                <span>{{ item.phone ? item.phone : "-" }}</span>
                            </td>
                            <td>
                                <div class="flex gap-1">
                                    <Button
                                        icon="search"
                                        @click="openDetail(item.id)"
                                    />
                                    <Button
                                        icon="edit"
                                        severity="warning"
                                        @click="onClickEdit(item)"
                                    />
                                    <!-- <Button icon="delete" severity="danger" /> -->
                                </div>
                            </td>
                        </tr>
                        <tr v-if="salesStore.isLoading">
                            <td colspan="6">
                                <div class="loading">
                                    <span class="material-symbols-outlined">
                                        settings
                                    </span>
                                    <span> Loading... </span>
                                </div>
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

    <DetailSalesCard v-model:show-detail="showDetail" :sales-id="salesId" />
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useSalesStore } from "../store/SalesStore";
import { useRouter } from "vue-router";
import debounce from "lodash.debounce";
import DetailSalesCard from "./DetailSalesCard.vue";

const router = useRouter();
const salesStore = useSalesStore();
const filters = ref();
const page = ref();
const rpp = ref(10);
const total = ref();
const sales = computed(() => {
    return salesStore.sales["data"];
});
const salesId = ref();
const showDetail = ref(false);

onBeforeMount(() => {
    initFilter();
});
onMounted(async () => {
    await salesStore.GET__SALES(false, rpp.value, filters.value);
    total.value = salesStore.sales["meta"]["total"];
});

const initFilter = () => {
    filters.value = {
        search: "",
    };
};

const onSearch = async () => {
    await onDelayReqSearch();
};
const onDelayReqSearch = debounce(async () => {
    await onFilter();
}, 700);
const onFilter = async () => {
    await salesStore.GET__SALES(false, rpp.value, filters.value);
    total.value = salesStore.sales["meta"]["total"];
};

const onChangePage = async (e) => {
    await salesStore.GET__SALES(e["page"] + 1, rpp.value, filters.value);
};

const openDetail = (_salesId) => {
    salesId.value = _salesId;
    showDetail.value = true;
};

const onClickEdit = (item) => {
    router.push({ name: "saler-edit", params: { id: item.id } });
};

//
</script>

<style scoped lang="scss">
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0;
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
</style>
