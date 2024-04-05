<template>
    <h5 class="page-title">Daftar Pelanggan</h5>
    <span class="page-subtitle">Daftar pelanggan.</span>
    <div class="d-card">
        <div class="data-header">
            <h5>Daftar Pelanggan</h5>
            <div class="tools-group">
                <span class="d-sideicon-set d-input-iconleft filter-item">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText
                        v-model="filters['search']"
                        placeholder="Cari pelanggan"
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
                            <th>Alamat</th>
                            <th>No Hp</th>
                            <th>Kota/Provinsi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!custStore.isLoading" v-for="item in cust">
                            <td>
                                <span class="d-uppercase">{{ item.code }}</span>
                            </td>
                            <td>
                                <span>{{ item.name }}</span>
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
                                <div class="flex flex-column gap-0">
                                    <span>{{
                                        item.city ? item.city : "-"
                                    }}</span>
                                    <span>{{
                                        item.province ? item.province : "-"
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-1">
                                    <Button
                                        icon="search"
                                        @click="openDetail(item.id, item.code)"
                                    />
                                    <Button
                                        icon="edit"
                                        severity="warning"
                                        @click="onClickEdit(item)"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr v-if="custStore.isLoading">
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

    <DetailCustCard v-model:show-detail="showDetail" :custId="custId" />
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useCustomerStore } from "../store/CustomerStore.js";
import debounce from "lodash.debounce";
import DetailCustCard from "./DetailCustCard.vue";

const router = useRouter();
const custStore = useCustomerStore();
const filters = ref();
const page = ref();
const rpp = ref(10);
const total = ref();
const cust = computed(() => {
    return custStore.customers["data"];
});
const custId = ref();
const showDetail = ref(false);

onBeforeMount(() => {
    initFilter();
});
onMounted(async () => {
    await custStore.GET__CUSTOMERS(false, rpp.value, filters.value);
    total.value = custStore.customers["meta"]["total"];
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
    await custStore.GET__CUSTOMERS(false, rpp.value, filters.value);
    total.value = custStore.customers["meta"]["total"];
};

const onChangePage = async (e) => {
    await custStore.GET__CUSTOMERS(e["page"] + 1, rpp.value, filters.value);
};

const openDetail = (_custId, code) => {
    custId.value = code.split("cst")[1];
    showDetail.value = true;
};

const onClickEdit = (item) => {
    router.push({ name: "cust-edit", params: { id: item.id } });
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
