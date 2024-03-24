<template>
    <Dialog
        v-model:visible="dialog"
        header="Detail Depo"
        :modal="true"
        :style="{ width: '35rem' }"
        :breakpoints="{ '768px': '70vw', '640px': '80vw' }"
        dismissableMask
        @update:visible="emit('update:showDetail', dialog)"
    >
        <div v-if="depo && !depoStore.loadingSelectedDepo" class="detail">
            <div class="item">
                <span>Kode</span>
                <span>{{ depo.code ? depo.code : "-" }}</span>
            </div>
            <div class="item">
                <span>Alamat</span>
                <span>{{ depo.address ? depo.address : "-" }}</span>
            </div>
            <div class="item">
                <span>Kota</span>
                <span>{{ depo.city ? depo.city : "-" }}</span>
            </div>
            <div class="item">
                <span>Provinsi</span>
                <span>{{ depo.province ? depo.province : "-" }}</span>
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
import { useDepoStore } from "../store/DepoStore";

const props = defineProps({ depoId: null, showDetail: false });
const emit = defineEmits(["update:showDetail"]);
const dialog = ref(false);
const depoStore = useDepoStore();
const depo = ref();

watch(
    () => props.showDetail,
    async () => {
        dialog.value = props.showDetail;
        if (props.showDetail) {
            await depoStore.GET__DEPO_BY_ID(props.depoId);
            depo.value = depoStore.selectedDepo["data"];
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
            width: 4.5rem;
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
    padding: 2.5rem 0;
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
