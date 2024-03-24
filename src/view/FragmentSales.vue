<template>
    <div class="data-header">
        <h5>Pilih Sales</h5>
        <span class="d-sideicon-set d-input-iconleft">
            <span class="material-symbols-outlined"> search </span>
            <InputText
                v-model="search"
                placeholder="Cari sales"
                @update:modelValue="onSearch()"
            />
        </span>
    </div>
    <div class="table-wrapper">
        <table class="d-table">
            <tr>
                <th>Kode</th>
                <th>Nama</th>
                <th>Tipe Sales</th>
                <th></th>
            </tr>
            <tr v-for="item in sales">
                <td class="d-uppercase">
                    <span>{{ item.code ? item.code : "-" }}</span>
                </td>
                <td>
                    <span>{{ item.name ? item.name : "-" }}</span>
                </td>
                <td>
                    <span>{{ item.seller_type ? item.seller_type : "-" }}</span>
                </td>
                <td>
                    <Button label="Pilih" @click="onSelectSales(item)" />
                </td>
            </tr>
        </table>
    </div>
    <div class="list">
        <div v-for="item in sales" class="item">
            <div class="code">
                <span>Kode</span>
                <span class="d-uppercase">{{
                    item.code ? item.code : "-"
                }}</span>
            </div>
            <div class="name">
                <span>Nama</span>
                <span>{{ item.name ? item.name : "-" }}</span>
            </div>
            <div class="contact">
                <span>Tipe Sales</span>
                <span>{{ item.seller_type ? item.seller_type : "-" }}</span>
            </div>
            <div class="button">
                <Button label="Pilih" @click="onSelectSales(item)" />
            </div>
        </div>
    </div>
    <div class="paginator">
        <Paginator
            v-model:first="row"
            :rows="rpp"
            :total-records="total"
            :template="{
                '575px':
                    'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                default:
                    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            }"
            @page="page($event)"
        />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
    salesData: null,
});
const emit = defineEmits(["onChangePage", "onSelectSales", "onSearch"]);

const search = ref(null);
const sales = computed(() => {
    total.value = props.salesData["meta"]["total"];
    return props.salesData["data"];
});
const row = ref(0);
const total = ref();
const rpp = ref(5);

const page = (e) => {
    emit("onChangePage", e["page"] + 1);
};
const onSelectSales = (item) => {
    emit("onSelectSales", item);
};
const onSearch = () => {
    emit("onSearch", search.value);
};

//
</script>

<style scoped lang="scss">
.d-table {
    tr {
        th {
            text-wrap: nowrap;
        }
    }
}

.list {
    display: none;
    .item {
        padding: 1rem 1rem;
        display: grid;
        gap: 0.5rem;

        &:not(:last-of-type) {
            border-bottom: 2px dashed var(--text-color-secondary);
        }

        &:hover {
            position: relative;
            &::before {
                position: absolute;
                left: 0;
                top: 1rem;
                content: "";
                width: 4px;
                height: 2rem;
                background: red;
                border-radius: 99px;
                background-color: var(--primary);
            }
        }

        div:not(.button) {
            display: grid;
            grid-template-columns: 6rem 1fr;
            gap: 0.5rem;

            span:first-of-type {
                display: flex;
                justify-content: space-between;
                &::after {
                    content: ":";
                }
            }
            span:last-of-type {
            }
        }

        .button {
            display: flex;
            justify-content: end;
        }
    }
}

@media screen and (max-width: 575px) {
    .data-header {
        flex-direction: column;
        gap: 0.5rem;

        input {
            width: 100%;
        }
    }
    .table-wrapper {
        display: none;
    }
    .list {
        display: flex;
        flex-direction: column;
    }
    .paginator {
        border-top: 1px solid var(--surface-tborder);
    }
}
</style>
