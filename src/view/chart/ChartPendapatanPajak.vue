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
import { ref, onMounted, onUpdated } from "vue";
import { useReportStore } from "../../store/ReportStore";

const reportStore = useReportStore();
const props = defineProps({
    data: {
        type: Object,
        default: {
            total_amount: [],
            tax_amount: [],
        },
    },
    year: null,
});
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
onUpdated(() => {
    chartData.value = setChartData();
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
                data: props.data["total_amount"],
            },
            {
                label: "Pajak",
                backgroundColor: documentStyle.getPropertyValue("--orange-500"),
                hoverBackgroundColor:
                    documentStyle.getPropertyValue("--orange-600"),
                borderColor: documentStyle.getPropertyValue("--orange-500"),
                data: props.data["tax_amount"],
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
