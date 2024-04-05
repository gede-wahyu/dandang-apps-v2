<template>
    <Dialog
        v-model:visible="dialog"
        header="Detail Pelanggan"
        :modal="true"
        :style="{ width: '35rem' }"
        :breakpoints="{ '768px': '70vw', '640px': '80vw' }"
        dismissableMask
        @update:visible="emit('update:showDetail', dialog)"
    >
        <div v-if="cust && !custStore.loadingSelectedCust" class="detail">
            <div class="item">
                <span>Kode</span>
                <span>{{ cust.code ? cust.code : "-" }}</span>
            </div>
            <div class="item">
                <span>Nama</span>
                <span>{{ cust.name ? cust.name : "-" }}</span>
            </div>
            <div class="item">
                <span>No HP</span>
                <span>{{ cust.phone ? cust.phone : "-" }}</span>
            </div>
            <div class="item">
                <span>Alamat</span>
                <span>{{ cust.address ? cust.address : "-" }}</span>
            </div>
            <div class="item">
                <span>Kota</span>
                <span>{{ cust.city ? cust.city : "-" }}</span>
            </div>
            <div class="item">
                <span>Provinsi</span>
                <span>{{ cust.province ? cust.province : "-" }}</span>
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
import { useCustomerStore } from "../store/CustomerStore.js";

const props = defineProps({ custId: null, showDetail: false });
const emit = defineEmits(["update:showDetail"]);
const dialog = ref(false);
const custStore = useCustomerStore();
const cust = ref();

watch(
    () => props.showDetail,
    async () => {
        dialog.value = props.showDetail;
        if (props.showDetail) {
            await custStore.GET__CUST_BY_ID(props.custId);
            cust.value = custStore.selectedCust;
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
