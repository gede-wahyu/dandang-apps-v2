<template>
    <div v-for="n in rowPerPage" class="saler-products-item">
        <div class="spi-image" style="height: 5.4rem">
            <Skeleton width="4rem" height="5rem" />
        </div>
        <div class="spi-name">
            <Skeleton width="8rem" height="1.3rem" />
        </div>
        <div class="spi-tag">
            <Skeleton width="4rem" height="1.7rem" />
        </div>
        <div class="spi-stock">
            <Skeleton width="6rem" height="1.3rem" />
        </div>
        <div class="spi-price">
            <Skeleton width="8rem" height="1.3rem" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    rowPerPage: null,
});
</script>

<style>
.saler-products-item {
    padding: 1.5rem 0;
    display: grid;
    grid-template-columns: 5rem 1fr 1fr;
    row-gap: 0.5rem;
    grid-template-areas:
        "spi-image spi-name spi-price"
        "spi-image spi-tag spi-stock";

    &:not(:last-of-type) {
        border-bottom: 2px dashed var(--surface-input-border);
    }
    &:hover {
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: 3rem;
            left: -0.75rem;
            width: 4px;
            height: 2rem;
            border-radius: 99px;
            background-color: var(--primary);
        }
    }

    .spi-image {
        grid-area: spi-image;
        align-self: center;
    }
    .spi-name {
        grid-area: spi-name;
    }
    .spi-tag {
        grid-area: spi-tag;
    }
    .spi-stock {
        grid-area: spi-stock;
    }
    .spi-price {
        grid-row: spi-price;
    }
}
</style>
