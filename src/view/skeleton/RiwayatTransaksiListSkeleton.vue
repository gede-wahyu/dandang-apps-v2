<template>
    <div class="transaction-list">
        <div v-for="(item, index) in transactions" class="transaction-item">
            <div style="margin-bottom: 1rem; display: inline-block">
                <span>No Faktur. </span>
                <span
                    ><Skeleton
                        width="16.2rem"
                        height="1.3rem"
                        style="display: inline-block"
                /></span>
            </div>
            <div class="row">
                <div class="header">Pelanggan</div>
                <div>:</div>
                <div class="body">
                    <Skeleton width="11rem" height="1.3rem" />
                </div>
            </div>
            <div class="row">
                <div class="header">Tanggal</div>
                <div>:</div>
                <div class="body" style="display: inline-block">
                    <Skeleton
                        width="8rem"
                        height="1.3rem"
                        style="display: inline-block"
                    />
                    <Skeleton
                        width="6rem"
                        height="1.3rem"
                        style="display: inline-block"
                    />
                </div>
            </div>
            <div class="row">
                <div class="header">Status Transaksi</div>
                <div>:</div>
                <div class="body">
                    <Skeleton width="5rem" height="1.3rem" />
                </div>
            </div>
            <div class="row">
                <div class="header">Nilai Transaksi</div>
                <div>:</div>
                <div class="body">
                    <Skeleton width="7rem" height="1.3rem" />
                </div>
            </div>
            <div class="row">
                <div class="header">Sales</div>
                <div>:</div>
                <div class="body">
                    <Skeleton width="8rem" height="1.3rem" />
                </div>
            </div>
            <div class="row">
                <div class="header">Depo</div>
                <div>:</div>
                <div class="body">
                    <Skeleton width="8rem" height="1.3rem" />
                </div>
            </div>
            <div class="row">
                <div class="header">Status Pembayaran</div>
                <div>:</div>
                <div><Skeleton width="5rem" height="1.3rem" /></div>
            </div>
            <div class="row">
                <div class="header"></div>
                <div></div>
                <div class="body">
                    <div class="row-button">
                        <Button label="Detail" />
                    </div>
                </div>
            </div>
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
.transaction-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    padding: 1.5rem 0;
    position: relative;

    &:not(:first-of-type) {
        border-top: 2px dashed var(--surface-input-border);
    }

    &:hover {
        &::before {
            content: "";
            position: absolute;
            left: -0.75rem;
            width: 4px;
            height: 60%;
            border-radius: 99px;
            background-color: var(--primary);
        }
    }

    &:nth-child(odd) {
        box-shadow: 0 0 0 100vmax var(--primary-a0);
        clip-path: inset(0 -100vmax);
        background: var(--primary-a0);
    }

    .row {
        display: grid;
        grid-template-columns: 11rem 1rem 1fr;

        .row-button {
            display: flex;
            justify-content: end;
            margin-top: 1.5rem;
        }
    }
}
</style>
