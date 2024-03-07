<template>
    <div class="d-card">
        <div class="header">
            <h5>{{ nFormatter(profit.total_profit, 1) }}</h5>
            <span>Laba</span>
        </div>
        <Knob
            v-model="knob"
            valueTemplate="{value}%"
            valueColor="var(--orange-500)"
            :size="120"
            :max="max"
            :min="min"
            readonly
        />
        <div
            class="status"
            :class="{
                increase: !isLoss(profit.total_increase),
                decrease: isLoss(profit.total_increase),
            }"
        >
            <span
                v-if="!isLoss(profit.total_increase)"
                class="material-symbols-outlined"
            >
                expand_less
            </span>
            <span v-else class="material-symbols-outlined"> expand_more </span>
            <span>Rp {{ nFormatter(profit.total_increase, 1) }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore.js";

const reportStore = useReportStore();
const profit = ref({});
const knob = ref(0);
const min = ref(0);
const max = ref();

onMounted(async () => {
    await reportStore.GET__PROFIT();
    profit.value = reportStore.profit;

    knob.value = round(profit.value.percentage_increase);
    if (knob.value > 100) max.value = knob.value;
    else max.value = 100;
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__PROFIT();
        profit.value = reportStore.profit;

        knob.value = round(profit.value.percentage_increase);
        if (knob.value > 100) max.value = knob.value;
        else max.value = 100;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__PROFIT();
        profit.value = reportStore.profit;

        knob.value = round(profit.value.percentage_increase);
        if (knob.value > 100) max.value = knob.value;
        else max.value = 100;
    }
);
const round = (value) => {
    if (!value) return 0;
    return Math.round(value);
};
const isLoss = (value) => {
    if (!value) return false;
    else if (value > 0) return false;
    else return true;
};
const nFormatter = (num, digits) => {
    const isNegative = num < 0;
    const absNum = Math.abs(num);
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
    const item = lookup.findLast((item) => absNum >= item.value);
    return item
        ? (isNegative ? "-" : "") +
              (absNum / item.value)
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
    .status {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        &.increase {
            span {
                color: var(--color-success);
            }
        }
        &.decrease {
            span {
                color: var(--color-danger);
            }
        }
    }
}
</style>
