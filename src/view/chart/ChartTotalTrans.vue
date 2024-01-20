<template>
    <div class="card flex justify-content-center">
        <Chart
            type="doughnut"
            :data="chartData"
            :options="chartOptions"
            style="height: 10rem"
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
const chartOptions = ref(null);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ["Saler Motor", "Saler Mobil", "Saler TO", "Lainnya"],
        datasets: [
            {
                data: [340000, 450000, 700000, 575000],
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
</script>
