<template>
    <div class="card">
        <Chart
            type="bar"
            :data="chartData"
            :options="chartOptions"
            class="chart"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agt",
            "Sep",
            "Okt",
            "Nov",
            "Des",
        ],
        datasets: [
            {
                label: "Pendapatan",
                backgroundColor: documentStyle.getPropertyValue("--purple-500"),
                hoverBackgroundColor:
                    documentStyle.getPropertyValue("--purple-600"),
                borderColor: documentStyle.getPropertyValue("--purple-500"),
                data: [65, 59, 80, 81, 56, 55, 40, 64, 43, 75, 53, 56],
            },
            {
                label: "Pajak",
                backgroundColor: documentStyle.getPropertyValue("--orange-500"),
                hoverBackgroundColor:
                    documentStyle.getPropertyValue("--orange-600"),
                borderColor: documentStyle.getPropertyValue("--orange-500"),
                data: [28, 48, 40, 19, 86, 27, 90, 87, 81, 77, 88, 90],
            },
        ],
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
    );

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColorSecondary,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500,
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    display: false,
                },
            },
        },
    };
};
</script>

<style scoped lang="scss">
.chart {
    height: 100%;
}
</style>
