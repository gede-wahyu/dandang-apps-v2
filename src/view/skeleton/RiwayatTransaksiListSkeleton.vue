<template>
    <div v-for="item in transactions" class="transaction-item">
        <div class="trans-props nofak">
            <span>No Faktur</span>
            <Skeleton width="15rem" height="1.3rem" />
        </div>
        <div class="trans-props">
            <span>Pelanggan</span>
            <Skeleton width="6rem" height="1.3rem" />
        </div>
        <div class="trans-props">
            <span>Tanggal</span>
            <div>
                <Skeleton
                    width="6rem"
                    height="1.3rem"
                    style="margin-bottom: 0.5rem"
                />
                <Skeleton width="5rem" height="1.3rem" />
            </div>
        </div>
        <div class="trans-props">
            <span>Status Transaksi</span>
            <Skeleton width="6rem" height="1.7rem" />
        </div>
        <div class="trans-props">
            <span>Nilai Transaksi</span>
            <Skeleton width="8rem" height="1.3rem" />
        </div>
        <div class="trans-props">
            <span>Sales</span>
            <Skeleton width="7rem" height="1.3rem" />
        </div>
        <div class="trans-props">
            <span>Depo</span>
            <Skeleton width="6rem" height="1.3rem" />
        </div>
        <div class="trans-props">
            <span>Status Pembayaran</span>
            <Skeleton width="6rem" height="1.3rem" />
        </div>
        <div class="trans-button">
            <div><Button label="Detail" /></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
    rowPerPage: null,
});
const transactions = ref(props.rowPerPage);
</script>

<style scoped lang="scss">
.transaction-list {
    display: none;
}

.transaction-item {
    padding: 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &:nth-of-type(even) {
        background-color: var(--primary-a0);
    }

    &:hover {
        .trans-props.nofak {
            position: relative;
            &::before {
                content: "";
                position: absolute;
                left: -0.75rem;
                top: -3px;
                width: 4px;
                height: 2rem;
                border-radius: 99px;
                background-color: var(--primary);
            }
        }
    }
}

.trans-props {
    &.nofak {
        display: flex;
        & > span:first-of-type {
            &::after {
                content: ".";
                margin-right: 0.5rem;
            }
        }
    }

    &:not(.nofak) {
        display: grid;
        grid-template-columns: 11rem 1fr;

        & > span:first-of-type {
            display: flex;
            justify-content: space-between;
            margin-right: 0.5rem;

            &::after {
                content: ":";
            }
        }

        & > div {
            display: flex;
            flex-direction: column;
        }
    }
}

.trans-button {
    display: flex;
    justify-content: end;
}
</style>
