<template>
    <div class="customer">
        <div class="customer-list">
            <div v-for="(item, index) in customers" class="customer-item">
                <div class="rank">
                    <span>#{{ index + 1 }}</span>
                </div>
                <div class="name">
                    <span>{{ item.name }}</span>
                </div>
                <div class="code">
                    <span>{{ item.code }}</span>
                </div>
                <div class="address">
                    <span>{{ item.address }}</span>
                </div>
                <div class="amount">
                    <span>Total transaksi</span> <br />
                    <span>{{ 1.9 }} juta</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCustomerStore } from "../../store/CustomerStore";
const customerStore = useCustomerStore();
const customers = computed(() => {
    return customerStore.customers;
});
onMounted(() => {
    customerStore.GET__TOP_CUSTOMERS();
    customerStore.isLoading = false;
});
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
