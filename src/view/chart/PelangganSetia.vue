<template>
    <div class="customer">
        <div class="customer-list">
            <div v-for="(item, index) in customers" class="customer-item">
                <div class="rank">
                    <span>#{{ index + 1 }}</span>
                </div>
                <div class="name">
                    <span>{{ item.customer.name }}</span>
                </div>
                <div class="code">
                    <span>{{ item.customer.id }}</span>
                </div>
                <div class="address">
                    <span>{{ item.customer.address }}</span>
                </div>
                <div class="amount">
                    <span>Total transaksi</span> <br />
                    <span>{{ nFormatter(item.total_amount, 1) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "../../store/ReportStore";
const reportStore = useReportStore();
const customers = ref(null);

onMounted(async () => {
    await reportStore.GET__TOP_CUSTOMER();
    customers.value = reportStore.topCustomer;
});

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
.customer-item {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: max-content 1fr 1fr;
    column-gap: 1rem;
    .rank {
        grid-column: 1 / 2;
        grid-row: 1 / 4;
        color: var(--text-color-secondary);
        margin-top: 0.5rem;
    }
    .name {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        text-transform: capitalize;
    }
    .code {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        text-transform: uppercase;
        color: var(--text-color-secondary);
    }
    .address {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        color: var(--text-color-secondary);
    }
    .amount {
        grid-column: 3 / 4;
        grid-row: 1 / 4;
        span:first-of-type {
            color: var(--text-color-secondary);
        }
        span:last-of-type {
            font-size: 1.25rem;
        }
    }
}
</style>
