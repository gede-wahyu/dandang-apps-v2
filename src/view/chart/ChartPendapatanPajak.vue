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
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore";

const reportStore = useReportStore();
const props = defineProps({
    year: null,
});
onMounted(async () => {
    await reportStore.GET__INCOME_TAX(props.year);
    chartData.value = setChartData(reportStore.incomeTax);
    chartOptions.value = setChartOptions();
});
watch(
    () => props.year,
    async () => {
        console.log(props.year);
        await reportStore.GET__INCOME_TAX(props.year);
        chartData.value = setChartData(reportStore.incomeTax);
    }
);

const chartData = ref();
const chartOptions = ref();

const setChartData = (data) => {
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
                data: data["total_amount"],
            },
            {
                label: "Pajak",
                backgroundColor: documentStyle.getPropertyValue("--orange-500"),
                hoverBackgroundColor:
                    documentStyle.getPropertyValue("--orange-600"),
                borderColor: documentStyle.getPropertyValue("--orange-500"),
                data: data["tax_amount"],
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
