<template>
    <div class="d-card">
        <div class="header">
            <h5>Produk Terlaris</h5>
        </div>
        <div class="content">
            <div class="product-list">
                <div v-for="(item, index) in products" class="product-item">
                    <div class="rank">
                        <span>#{{ index + 1 }}</span>
                    </div>
                    <div class="image">
                        <img
                            :src="`${baseUrl}/${item.product.image}`"
                            :alt="item.product.name"
                            class="img-style"
                        />
                    </div>
                    <div class="name">
                        <span>{{ item.product.name }}</span>
                    </div>
                    <div class="varian">
                        <span class="d-tag d-lowercase">
                            {{ item.product.size }}
                            {{ formatUom(item.product.uom) }}
                        </span>
                    </div>
                    <div class="price">
                        <span>{{ formatCurrency(item.product.price) }}</span>
                    </div>
                    <div class="sold">
                        <span>Terjual</span><br /><span>{{
                            nFormatter(item.total_quantity, 1)
                        }}</span>
                    </div>
                </div>
                <div v-if="!products" class="no-data">Loading</div>
                <div v-else-if="products.length < 1" class="no-data">
                    Data Tidak Tersedia
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useReportStore } from "../../store/ReportStore";
const baseUrl = import.meta.env.VITE_BASE_URL;

const reportStore = useReportStore();
const products = ref();

onMounted(async () => {
    await reportStore.GET__BESTSELLER();
    products.value = reportStore.bestseller;
});
watch(
    () => reportStore.filter.year,
    async () => {
        products.value = null;
        await reportStore.GET__BESTSELLER();
        products.value = reportStore.bestseller;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        products.value = null;
        await reportStore.GET__BESTSELLER();
        products.value = reportStore.bestseller;
    }
);

const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

const formatUom = (value) => {
    if (!value) return;
    if (value.toLowerCase() === "grams" || value.toLowerCase() === "gram")
        return "gr";
    else return value;
};

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

//
</script>

<style scoped lang="scss">
.no-data {
    color: var(--text-color-secondary);
}
.img-style {
    width: 3rem;
    height: 4rem;
    object-fit: cover;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-set);
}
.product-item {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: max-content min-content 2fr 1fr;
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
    }
    .name {
        grid-column: 3 / 4;
        text-transform: capitalize;
    }
    .varian {
        grid-column: 3 / 4;
    }
    .price {
        grid-column: 3 / 4;
        color: var(--text-color-secondary);
    }
    .sold {
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
