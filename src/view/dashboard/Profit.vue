<template>
    <div class="d-card">
        <div class="header">
            <h5>Laba</h5>
            <span>Laba per minggu</span>
        </div>
        <Chart
            type="line"
            :data="chartData"
            :options="chartOptions"
            style="height: 8.5rem"
        />
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore";
const reportStore = useReportStore();

onMounted(async () => {
    await reportStore.GET__WEEKLY_PROFIT();
    chartData.value = setChartData(reportStore.weeklyProfit.weekly_data);
    chartOptions.value = setChartOptions();
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__WEEKLY_PROFIT();
        chartData.value = setChartData(reportStore.weeklyProfit.weekly_data);
        chartOptions.value = setChartOptions();
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__WEEKLY_PROFIT();
        chartData.value = setChartData(reportStore.weeklyProfit.weekly_data);
        chartOptions.value = setChartOptions();
    }
);

const chartData = ref();
const chartOptions = ref();

const setChartData = (data) => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ["M1", "M2", "M3", "M4"],
        datasets: [
            {
                label: "Laba",
                fill: false,
                borderColor: documentStyle.getPropertyValue("--blue-500"),
                yAxisID: "y",
                tension: 0.4,
                data: data,
            },
        ],
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                display: false,
            },
        },
    };
};
</script>

<style scoped lang="scss">
.d-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .header {
        margin-bottom: 1rem;
        h5 {
            margin: 0;
        }
        span {
            color: var(--text-color-secondary);
        }
    }
}
</style>
