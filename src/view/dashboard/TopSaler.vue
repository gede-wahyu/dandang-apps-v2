<template>
    <div class="d-card">
        <div class="header">
            <h5>Sales Terbaik</h5>
        </div>
        <div class="content">
            <div class="sales-list">
                <div v-for="(item, index) in sales" class="sales-item">
                    <div class="rank">
                        <span>#{{ index + 1 }}</span>
                    </div>
                    <div class="image">
                        <img
                            v-if="item.image"
                            :src="`${baseUrl}/${item.image}`"
                            :alt="item.name"
                            class="img-style"
                        />
                        <div v-else class="img-none">
                            <span class="material-symbols-outlined">
                                person
                            </span>
                        </div>
                    </div>
                    <div class="name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="code">
                        <span>{{ item.code }}</span>
                    </div>
                    <div class="type">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="amount">
                        <span>Total transaksi</span><br />
                        <span>{{ nFormatter(item.total_amount) }}</span>
                    </div>
                </div>
                <div v-if="!sales" class="no-data">Loading</div>
                <div v-else-if="sales.length < 1" class="no-data">
                    Data Tidak Tersedia
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore";
const reportStore = useReportStore();
const sales = ref([]);
onMounted(async () => {
    await reportStore.GET__TOP_SELLER();
    sales.value = reportStore.topSeller;
});
watch(
    () => reportStore.filter.year,
    async () => {
        sales.value = null;
        await reportStore.GET__TOP_SELLER();
        sales.value = reportStore.topSeller;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        sales.value = null;
        await reportStore.GET__TOP_SELLER();
        sales.value = reportStore.topSeller;
    }
);
const nFormatter = (num, digits) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " Ribu" },
        { value: 1e6, symbol: " Juta" },
        { value: 1e9, symbol: " Miliar" },
        { value: 1e12, symbol: " Triliun" },
        { value: 1e15, symbol: " Kuadriliun" },
        { value: 1e18, symbol: " Kuintiliun" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
        ? (num / item.value)
              .toFixed(digits)
              .replace(regexp, "")
              .concat(item.symbol)
        : "0";
};
</script>

<style scoped lang="scss">
.no-data {
    color: var(--text-color-secondary);
}
.img-none {
    width: 3rem;
    height: 3rem;
    aspect-ratio: 1 / 1;
    background-color: var(--surface-ground);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        color: var(--icon-color-secondary);
        font-size: 2rem;
    }
}
.sales-item {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: max-content min-content 1fr 1fr;
    column-gap: 1rem;
    .rank {
        grid-column: 1 / 2;
        grid-row: 1 / 4;
        color: var(--text-color-secondary);
        margin-top: 0.5rem;
    }
    .image {
        grid-column: 2 / 3;
        grid-row: 1 / 4;
        margin-top: 0.5rem;
    }
    .name {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
        text-transform: capitalize;
    }
    .code {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
        text-transform: uppercase;
        color: var(--text-color-secondary);
    }
    .type {
        grid-column: 3 / 4;
        grid-row: 3 / 4;
        text-transform: capitalize;
        color: var(--text-color-secondary);
    }
    .amount {
        grid-column: 4 / 5;
        grid-row: 1 / 4;
        align-self: center;
        span:first-of-type {
            color: var(--text-color-secondary);
        }
        span:last-of-type {
            font-size: 1.25rem;
        }
    }
}
</style>
