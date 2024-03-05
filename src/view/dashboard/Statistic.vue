<template>
    <div class="d-card">
        <div class="header">
            <h5>Statistik</h5>
        </div>
        <div class="content">
            <div class="stat">
                <div class="icon">
                    <span class="material-symbols-outlined"> pie_chart </span>
                </div>
                <div class="label">
                    <span>
                        {{ nFormatter(statistic.total_sales_count, 1) }}
                    </span>
                    <span>Jumlah Transaksi</span>
                </div>
            </div>
            <div class="stat">
                <div class="icon">
                    <span class="material-symbols-outlined"> group </span>
                </div>
                <div class="label">
                    <span>
                        {{
                            nFormatter(statistic.total_customers_last_month, 1)
                        }}
                    </span>
                    <span>Pelanggan</span>
                </div>
            </div>
            <div class="stat">
                <div class="icon">
                    <span class="material-symbols-outlined">
                        shopping_cart
                    </span>
                </div>
                <div class="label">
                    <span>
                        {{ nFormatter(statistic.total_products_sold, 1) }}
                    </span>
                    <span>Produk Terjual</span>
                </div>
            </div>
            <div class="stat">
                <div class="icon">
                    <span class="material-symbols-outlined"> paid </span>
                </div>
                <div class="label">
                    <span>
                        {{ nFormatter(statistic.total_last_month, 1) }}
                    </span>
                    <span>Nilai Transaksi</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore.js";

const reportStore = useReportStore();
const statistic = ref({});

onMounted(async () => {
    await reportStore.GET__STATISTIC();
    statistic.value = reportStore.statistic;
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__STATISTIC();
        statistic.value = reportStore.statistic;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__STATISTIC();
        statistic.value = reportStore.statistic;
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
.d-card {
    display: flex;
    flex-direction: column;
}
.content {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.stat {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    &:nth-of-type(1) {
        .icon {
            background-color: var(--purple-100);
            span {
                color: var(--purple-500);
            }
        }
    }
    &:nth-of-type(2) {
        .icon {
            background-color: var(--blue-100);
            span {
                color: var(--blue-500);
            }
        }
    }
    &:nth-of-type(3) {
        .icon {
            background-color: var(--red-100);
            span {
                color: var(--red-500);
            }
        }
    }
    &:nth-of-type(4) {
        .icon {
            background-color: var(--green-100);
            span {
                color: var(--green-500);
            }
        }
    }
}
.icon {
    width: 3rem;
    height: 3rem;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    span {
        font-size: 1.5rem;
    }
}
.label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span:first-of-type {
        font-size: 1.25rem;
    }
    span:last-of-type {
        color: var(--text-color-secondary);
    }
}
</style>
