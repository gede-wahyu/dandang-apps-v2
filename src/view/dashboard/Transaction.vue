<template>
    <div class="d-card">
        <div class="left">
            <div class="header">
                <h5>Nilai Transaksi</h5>
                <span>Total nilai transaksi bulan lalu</span>
            </div>
            <div class="content">
                <h3>Rp {{ nFormatter(sales.total_amount, 1) }}</h3>
                <div
                    class="status"
                    :class="{
                        increase: !isLoss(sales.percentage_increase),
                        decrease: isLoss(sales.percentage_increase),
                    }"
                >
                    <span
                        v-if="!isLoss(sales.percentage_increase)"
                        class="material-symbols-outlined"
                    >
                        expand_less
                    </span>
                    <span v-else class="material-symbols-outlined">
                        expand_more
                    </span>
                    <span>{{ round(sales.percentage_increase) }}%</span>
                </div>
            </div>
        </div>
        <div>
            <Chart
                type="doughnut"
                :data="chartData"
                :options="chartOptions"
                style="height: 10rem"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore";

const sales = ref({});
const reportStore = useReportStore();
const chartData = ref();
const chartOptions = ref(null);

onMounted(async () => {
    await reportStore.GET__SALES_BY_ROLE();
    chartData.value = setChartData(reportStore.sales["total_amount_sales"]);
    chartOptions.value = setChartOptions();
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__SALES_BY_ROLE();
        chartData.value = setChartData(reportStore.sales["total_amount_sales"]);
        chartOptions.value = setChartOptions();
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__SALES_BY_ROLE();
        chartData.value = setChartData(reportStore.sales["total_amount_sales"]);
        chartOptions.value = setChartOptions();
    }
);

const isLoss = (value) => {
    if (!value) return false;
    else if (value > 0) return false;
    else return true;
};
const round = (value) => {
    if (!value) return 0;
    return Math.round(value);
};

const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ["Saler Motor", "Saler Mobil", "Saler TO", "Lainnya"],
        datasets: [
            {
                data: data,
                backgroundColor: [
                    documentStyle.getPropertyValue("--green-100"),
                    documentStyle.getPropertyValue("--green-300"),
                    documentStyle.getPropertyValue("--green-500"),
                    documentStyle.getPropertyValue("--green-600"),
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue("--green-100"),
                    documentStyle.getPropertyValue("--green-300"),
                    documentStyle.getPropertyValue("--green-500"),
                    documentStyle.getPropertyValue("--green-600"),
                ],
            },
        ],
    };
};

const setChartOptions = () => {
    return {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
};

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
.d-card {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.left {
    display: flex;
    flex-direction: column;
    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
.increase {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    span {
        color: var(--color-success);
    }
}
</style>
