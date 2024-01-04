<template>
    <table class="d-table table-view">
        <thead>
            <tr>
                <th>No Faktur</th>
                <th>Pelanggan</th>
                <th>Tanggal</th>
                <th>Status Transaksi</th>
                <th>Nilai Transaksi</th>
                <th>Sales</th>
                <th>Depo</th>
                <th>Status Pembayaran</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in transactions">
                <td style="width: 17.75rem">
                    <span>
                        <Skeleton width="100%" height="1.3rem" />
                    </span>
                </td>
                <td style="width: 7.85rem">
                    <span>
                        <Skeleton width="100%" height="1.3rem" />
                    </span>
                </td>
                <td style="width: 10.15rem">
                    <span style="display: block; margin-bottom: 0.5rem"
                        ><Skeleton width="100%" height="1.3rem"
                    /></span>
                    <span><Skeleton width="70%" height="1.3rem" /></span>
                </td>
                <td style="width: 10.65rem">
                    <span>
                        <Skeleton width="60%" height="1.3rem" />
                    </span>
                </td>
                <td style="width: 9.7rem">
                    <span><Skeleton width="80%" height="1.3rem" /></span>
                </td>
                <td style="width: 7.3rem">
                    <span>
                        <Skeleton width="100%" height="1.3rem" />
                    </span>
                </td>
                <td style="width: 7.3rem">
                    <span>
                        <Skeleton width="100%" height="1.3rem" />
                    </span>
                </td>
                <td>
                    <span>
                        <Skeleton width="60%" height="1.3rem" />
                    </span>
                </td>
                <td><Button label="Detail" /></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="9">
                    <Paginator
                        :rows="rowPerPage"
                        :total-records="15"
                        style="width: 100%"
                    />
                </td>
            </tr>
        </tfoot>
    </table>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    rowPerPage: null,
});
const transactions = ref(props.rowPerPage);

//
</script>
<style scoped lang="scss">
.table-header {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .filter-separator {
            width: 100%;
            height: 1px;
            background-color: var(--surface-input-border);
            border-radius: 1px;
        }

        .filter-clear-btn {
            background-color: var(--primary-a0);
            width: 100%;
        }
    }
}

.table-view {
    display: none;
}

@media screen and (min-width: 640px) {
    .table-view {
        display: table;
    }
}
</style>
