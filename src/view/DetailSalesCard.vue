<template>
    <Dialog
        v-model:visible="dialog"
        header="Detail Sales"
        :modal="true"
        :style="{ width: '35rem' }"
        :breakpoints="{ '768px': '70vw', '640px': '80vw' }"
        dismissableMask
        @update:visible="emit('update:showDetail', dialog)"
    >
        <div v-if="sales && !salesStore.loadingSelectedSales" class="detail">
            <div class="item">
                <span>Kode</span>
                <span>{{ sales.code ? sales.code : "-" }}</span>
            </div>
            <div class="item">
                <span>Nama</span>
                <span>{{ sales.name ? sales.name : "-" }}</span>
            </div>
            <div class="item">
                <span>Tipe Sales</span>
                <span>{{ sales.type ? sales.type : "-" }}</span>
            </div>
            <div class="item">
                <span>Alamat</span>
                <span>{{ sales.address ? sales.address : "-" }}</span>
            </div>
            <div class="item">
                <span>No HP</span>
                <span>{{ sales.phone ? sales.phone : "-" }}</span>
            </div>
        </div>
        <div v-else class="loading">
            <span class="material-symbols-outlined"> settings </span>
            <span> Loading... </span>
        </div>
    </Dialog>
</template>
<script setup>
import { ref, watch } from "vue";
import { useSalesStore } from "../store/SalesStore";

const props = defineProps({ salesId: null, showDetail: false });
const emit = defineEmits(["update:showDetail"]);
const dialog = ref(false);
const salesStore = useSalesStore();
const sales = ref();

watch(
    () => props.showDetail,
    async () => {
        dialog.value = props.showDetail;
        if (props.showDetail) {
            await salesStore.GET__SALES_BY_ID(props.salesId);
            sales.value = salesStore.selectedSales;
        }
    }
);

//
</script>

<style scoped lang="scss">
.detail {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .item {
        display: flex;

        span:first-of-type {
            width: 6rem;
            display: flex;
            justify-content: space-between;
            margin-right: 0.5rem;
            color: var(--text-color-secondary);
            &::after {
                content: ":";
            }
        }
    }
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
</style>
