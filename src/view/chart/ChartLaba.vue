<template>
    <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        style="height: 8.5rem"
    />
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
        labels: ["M1", "M2", "M3", "M4"],
        datasets: [
            {
                label: "Laba",
                fill: false,
                borderColor: documentStyle.getPropertyValue("--blue-500"),
                yAxisID: "y",
                tension: 0.4,
                data: [2.4, 2.7, 2.4, 2.9],
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

//
</script>
