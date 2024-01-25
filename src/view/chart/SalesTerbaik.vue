<template>
    <div class="sales">
        <div class="sales-list">
            <div v-for="(item, index) in sales" class="sales-item">
                <div class="rank">
                    <span>#{{ index + 1 }}</span>
                </div>
                <div class="image">
                    <img
                        v-if="item.image"
                        :src="`${baseUrl}/${item.image}`"
                        :alt="item.name"
                        class="img-style"
                    />
                    <div v-else class="img-none">
                        <span class="material-symbols-outlined"> person </span>
                    </div>
                </div>
                <div class="name">
                    <span>{{ item.name }}</span>
                </div>
                <div class="code">
                    <span>{{ item.code }}</span>
                </div>
                <div class="type">
                    <span>{{ item.name }}</span>
                </div>
                <div class="amount">
                    <span>Total transaksi</span><br />
                    <span>{{ 2.1 }} juta</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useReportStore } from "../../store/ReportStore";
const reportStore = useReportStore();
const sales = ref(null);
onMounted(async () => {
    await reportStore.GET__TOP_SELLER();
    sales.value = reportStore.topSeller;
});
</script>

<style scoped lang="scss">
.img-none {
    width: 3rem;
    height: 3rem;
    aspect-ratio: 1 / 1;
    background-color: var(--surface-ground);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        color: var(--icon-color-secondary);
        font-size: 2rem;
    }
}
.sales-item {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: max-content min-content 1fr 1fr;
    column-gap: 1rem;
    .rank {
        grid-column: 1 / 2;
        grid-row: 1 / 4;
        color: var(--text-color-secondary);
        margin-top: 0.5rem;
    }
    .image {
        grid-column: 2 / 3;
        grid-row: 1 / 4;
        margin-top: 0.5rem;
    }
    .name {
        grid-column: 3 / 4;
        grid-row: 1 / 2;
        text-transform: capitalize;
    }
    .code {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
        text-transform: uppercase;
        color: var(--text-color-secondary);
    }
    .type {
        grid-column: 3 / 4;
        grid-row: 3 / 4;
        text-transform: capitalize;
        color: var(--text-color-secondary);
    }
    .amount {
        grid-column: 4 / 5;
        grid-row: 1 / 4;
        align-self: center;
        span:first-of-type {
            color: var(--text-color-secondary);
        }
        span:last-of-type {
            font-size: 1.25rem;
        }
    }
}
</style>
