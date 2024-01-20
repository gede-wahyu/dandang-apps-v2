<template>
    <div class="products">
        <div class="product-list">
            <div v-for="(item, index) in products" class="product-item">
                <div class="rank">
                    <span>#{{ index + 1 }}</span>
                </div>
                <div class="image">
                    <img
                        :src="`${baseUrl}/${item.image}`"
                        :alt="item.name"
                        class="img-style"
                    />
                </div>
                <div class="name">
                    <span>{{ item.name }}</span>
                </div>
                <div class="varian">
                    <span class="d-tag d-lowercase">
                        {{ item.size }} {{ formatUom(item.uom) }}
                    </span>
                </div>
                <div class="price">
                    <span>{{ formatCurrency(item.price) }}</span>
                </div>
                <div class="sold">
                    <span>Terjual</span><br /><span>{{ 5.4 }} juta</span>
                </div>
            </div>
        </div>
    </div>

    <!-- <pre>{{ products }}</pre> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../../store/ProductStore";
const baseUrl = import.meta.env.VITE_BASE_URL;

const productStore = useProductStore();
const products = computed(() => {
    return productStore.bestseller;
});

onMounted(async () => {
    await productStore.GET__PRODUCTS_BESTSELLER();
    productStore.isLoading = false;
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(value);
};

const formatUom = (value) => {
    if (value.toLowerCase() === "grams" || value.toLowerCase() === "gram")
        return "gr";
    else return value;
};

//
</script>

<style scoped lang="scss">
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
