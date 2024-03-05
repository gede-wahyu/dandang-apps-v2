<template>
    <div class="d-card">
        <div class="header">
            <h5>{{ nFormatter(profit.total_profit, 1) }}</h5>
            <span>Kenaikan laba</span>
        </div>
        <Knob
            v-model="knob"
            valueTemplate="{value}%"
            valueColor="var(--orange-500)"
            :size="120"
            readonly
        />
        <div class="increase">
            <span class="material-symbols-outlined"> expand_less </span>
            <span>Rp {{ profit.total_increase }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore.js";

const reportStore = useReportStore();
const profit = ref({});
const knob = ref(0);

onMounted(async () => {
    await reportStore.GET__PROFIT();
    profit.value = reportStore.profit;
    knob.value = profit.value.percentage_increase;
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__PROFIT();
        profit.value = reportStore.profit;
        knob.value = profit.value.percentage_increase;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__PROFIT();
        profit.value = reportStore.profit;
        knob.value = profit.value.percentage_increase;
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

//
</script>

<style scoped lang="scss">
.d-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h5 {
        margin: 0;
    }
    span {
        color: var(--text-color-secondary);
    }
    .p-knob {
        display: flex;
        justify-content: center;
    }
    .increase {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        span {
            color: var(--color-success);
        }
    }
}
</style>
