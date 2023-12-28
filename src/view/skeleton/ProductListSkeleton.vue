<template>
    <DataTable
        :value="products"
        class="table-view"
        style="width: 100%"
        paginator
        :rows="5"
    >
        <template #header>
            <div class="modal-header">
                <h5 style="margin-bottom: 0">Daftar Produk</h5>
                <span class="d-sideicon-set d-input-iconleft">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText placeholder="Cari produk" />
                </span>
            </div>
        </template>

        <Column header="Nama" style="width: 25%">
            <template #body>
                <Skeleton width="50%" height="1.5rem" />
            </template>
        </Column>
        <Column header="Gambar" style="width: 15%">
            <template #body>
                <Skeleton width="5rem" height="5rem" />
            </template>
        </Column>
        <Column header="Varian" style="width: 15%">
            <template #body>
                <Skeleton width="55%" height="1.5rem" />
            </template>
        </Column>
        <Column header="Stok" style="width: 15%">
            <template #body>
                <Skeleton width="40%" height="1.5rem" />
            </template>
        </Column>
        <Column header="Harga" style="width: 15%">
            <template #body>
                <Skeleton width="75%" height="1.5rem" />
            </template>
        </Column>
        <Column>
            <template #body>
                <Skeleton width="6rem" height="2.5rem" />
            </template>
        </Column>
    </DataTable>

    <DataView :value="products" class="list-view">
        <template #list="slotProps">
            <div class="search">
                <InputText placeholder="Cari produk" />
            </div>
            <div class="products-list">
                <div v-for="item in slotProps.items" class="products-item">
                    <div class="item-left">
                        <Skeleton width="4rem" height="5rem" />
                        <div class="detail">
                            <Skeleton width="10rem" />
                            <Skeleton width="3rem" height="1.5rem" />
                            <Skeleton width="5rem" />
                        </div>
                    </div>
                    <div class="item-right">
                        <Skeleton width="4rem" />
                        <Skeleton width="6rem" height="2rem" />
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>

<script setup>
import { ref } from "vue";
const products = ref(new Array(15));
</script>

<style scoped lang="scss">
.table-view {
    display: none;
}
@media screen and (min-width: 640px) {
    .table-view {
        display: contents;
    }
    .list-view {
        display: none;
    }
}
@media screen and (max-width: 991px) {
    .products-list {
        max-height: 35rem;
        overflow-y: auto;
        padding-right: 10px;
    }
    .modal-header {
        flex-direction: column;
        gap: 1rem;
        align-items: start;

        & > span,
        input {
            width: 100%;
        }
    }
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.products-list {
    display: flex;
    flex-direction: column;
}
.search {
    width: 100%;
    padding-bottom: 1rem;

    input {
        width: 100%;
    }
}

.products-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0 1.5rem 5px;
    border-left: 2px solid transparent;

    &:not(:first-of-type) {
        border-top: 2px dashed var(--surface-input-border);
    }

    &:hover {
        border-left: 2px solid var(--primary-a);
    }

    &:nth-child(odd) {
        box-shadow: 0 0 0 100vmax var(--primary-a0);
        clip-path: inset(0 -100vmax);
        background: var(--primary-a0);
    }

    .item-left {
        display: flex;
        gap: 0.75rem;
        justify-content: start;
        align-items: center;

        .detail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 12rem;
        }
    }
    .item-right {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: end;
        gap: 0.5rem;
    }
}
</style>
