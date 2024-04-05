<template>
    <h5 class="page-title">Daftar Depo</h5>
    <span class="page-subtitle">Daftar depo.</span>
    <div class="d-card">
        <div class="data-header">
            <h5>Daftar Depo</h5>
            <div class="tools-group">
                <span class="d-sideicon-set d-input-iconleft filter-item">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText
                        v-model="filters['search']"
                        placeholder="Cari depo"
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
                            <th>Alamat</th>
                            <th>Kota</th>
                            <th>Provinsi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="!depoStore.isLoading" v-for="item in depo">
                            <td>
                                <span>{{ item.code ? item.code : "-" }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.address ? item.address : "-"
                                }}</span>
                            </td>
                            <td>
                                <span>{{ item.city ? item.city : "-" }}</span>
                            </td>
                            <td>
                                <span>{{
                                    item.province ? item.province : "-"
                                }}</span>
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
                                </div>
                            </td>
                        </tr>
                        <tr v-if="depoStore.isLoading">
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

    <DetailDepoCard v-model:showDetail="showDetail" :depo-id="depoId" />
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useDepoStore } from "../store/DepoStore";
import debounce from "lodash.debounce";
import DetailDepoCard from "./DetailDepoCard.vue";

const router = useRouter();
const depoStore = useDepoStore();
const filters = ref();
const page = ref();
const rpp = ref(10);
const total = ref();
const depo = computed(() => {
    return depoStore.depo["data"];
});
const depoId = ref();
const showDetail = ref(false);

onBeforeMount(() => {
    initFilter();
});
onMounted(async () => {
    await depoStore.GET__DEPO(false, rpp.value, filters.value);
    total.value = depoStore.depo["meta"]["total"];
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
    await depoStore.GET__DEPO(false, rpp.value, filters.value);
    total.value = depoStore.depo["meta"]["total"];
};

const onChangePage = async (e) => {
    await depoStore.GET__DEPO(e["page"] + 1, rpp.value, filters.value);
};

const openDetail = (_depoId) => {
    depoId.value = _depoId;
    showDetail.value = true;
};

const onClickEdit = (item) => {
    router.push({ name: "depo-edit", params: { id: item.id } });
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
