<template>
    <Dialog
        v-model:visible="dialog"
        header="Detail Distribusi"
        :modal="true"
        :style="{ width: '45rem' }"
        :breakpoints="{ '768px': '70vw', '640px': '80vw' }"
        dismissableMask
        @update:visible="emit('update:showDetail', dialog)"
    >
        <div v-if="dist && !distStore.loadingSelectedDist" class="detail">
            <div class="section-1">
                <div class="section-sub">
                    <div class="section-item">
                        <span>Nama Sales</span>
                        <span>{{ dist.seller ? dist.seller : "-" }}</span>
                    </div>
                    <div class="section-item">
                        <span>Kode Sales</span>
                        <span>{{ dist.seller ? dist.seller : "-" }}</span>
                    </div>
                    <div class="section-item">
                        <span>Tipe Sales</span>
                        <span>{{
                            dist.seller_type ? dist.seller_type : "-"
                        }}</span>
                    </div>
                </div>
                <div class="section-sub">
                    <div class="section-item">
                        <span>Tanggal</span>
                        <span>
                            <!-- {{ formatDate(dist.date, "date") }} |
                            {{ formatDate(dist.date, "time") }} -->
                        </span>
                    </div>
                    <div class="section-item">
                        <span>Depo</span>
                        <span>{{ dist.depo ? dist.depo : "-" }}</span>
                    </div>
                    <div class="section-item">
                        <span>Total Item</span>
                        <span>{{ dist.total_product }} item</span>
                    </div>
                    <div class="section-item">
                        <span>Nilai Produk</span>
                        <span>{{ formatCurrency(dist.product_price) }}</span>
                    </div>
                </div>
            </div>
            <div class="section-2">
                <div class="table-wrapper">
                    <table class="d-table">
                        <tr>
                            <th>Qty</th>
                            <th>Produk</th>
                            <th>Harga</th>
                        </tr>
                        <tr v-for="item in dist.products">
                            <td>{{ item.stock }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                <div class="flex flex-column gap-0">
                                    <span>{{
                                        formatCurrency(item.price)
                                    }}</span>
                                    <span class="subtotal">{{
                                        formatCurrency(item.price * item.stock)
                                    }}</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
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
import { useDistStore } from "../../store/DistributionStore";

const props = defineProps({ distId: null, showDetail: false });
const emit = defineEmits(["update:showDetail"]);
const dialog = ref(false);
const distStore = useDistStore();
const dist = ref();

watch(
    () => props.showDetail,
    async () => {
        dialog.value = props.showDetail;
        if (props.showDetail) {
            await distStore.GET__DISTRIBUTION_BY_ID(props.distId);
            dist.value = distStore.selectedDist["data"];
        }
    }
);

const formatCurrency = (value, notCurr) => {
    if (notCurr) return Intl.NumberFormat("id-ID").format(value);
    else
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
.detail {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .section-1 {
        display: flex;
        gap: 3rem;
        // justify-content: space-between;

        .section-sub {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .section-item {
                display: flex;

                span:first-of-type {
                    width: 7rem;
                    margin-right: 0.5rem;
                    display: flex;
                    justify-content: space-between;
                    color: var(--text-color-secondary);
                    &::after {
                        content: ": ";
                    }
                }
            }
        }
    }
}
.d-table {
    td {
        color: var(--text-color-secondary);
        .subtotal {
            color: var(--text-color);
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
