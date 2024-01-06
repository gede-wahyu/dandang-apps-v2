<template>
    <DataTable
        class="table-view"
        v-model:filters="filters"
        :value="customers"
        :globalFilterFields="['name', 'code', 'contact', 'address']"
        style="width: 100%; height: 100%"
        paginator
        :rows="5"
    >
        <template #header>
            <div class="modal-header">
                <span class="d-sideicon-set d-input-iconleft">
                    <span class="material-symbols-outlined"> search </span>
                    <InputText
                        v-model="filters['global'].value"
                        placeholder="Cari pelanggan"
                    />
                </span>
            </div>
        </template>

        <Column header="Nama">
            <template #body="slotProps">
                <div class="d-capitalize">{{ slotProps.data.name }}</div>
            </template>
        </Column>
        <Column header="Kode">
            <template #body="slotProps">
                <div class="d-uppercase">#{{ slotProps.data.code }}</div>
            </template>
        </Column>
        <Column header="No Hp">
            <template #body="slotProps">
                <div>{{ slotProps.data.contact }}</div>
            </template>
        </Column>
        <Column header="Alamat">
            <template #body="slotProps">
                <div>{{ slotProps.data.address }}</div>
            </template>
        </Column>
        <Column>
            <template #body="slotProps">
                <Button label="Pilih" @click="selectCustomer(slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <DataView
        :value="customers"
        class="list-view"
        :pt="{
            header: (options) => ({
                style: {
                    width: '100%',
                    padding: '1rem 1.5rem',
                    position: 'fixed',
                    top: '5rem',
                    left: 0,
                    'z-index': 2,
                },
            }),
            content: {
                style: {
                    'padding-top': '5rem',
                },
            },
        }"
    >
        <template #header>
            <div class="search">
                <InputText
                    v-model="searchCustomer"
                    placeholder="Cari pelanggan"
                    @update:modelValue="filteredCustomer()"
                />
            </div>
        </template>
        <template #list="slotProps">
            <div class="customers-list">
                <div
                    v-for="cust in slotProps.items"
                    class="customer-li"
                    :class="{ hidden: filteredCustomer(cust.id) }"
                >
                    <div class="customer-data">
                        <span>#{{ cust.code }}</span>
                        <span>{{ cust.name }}</span>
                        <span>{{ cust.contact }}</span>
                        <span>{{ cust.address }}</span>
                    </div>
                    <div class="customer-selectBtn">
                        <Button label="Pilih" @click="selectCustomer(cust)" />
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>

<script setup>
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";
const props = defineProps({
    customers: null,
});
const emit = defineEmits(["selectCustomer"]);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const searchCustomer = ref("");

const filteredCustomer = (id) => {
    let _filteredCustomer = props.customers
        ? props.customers
              .filter((cust) =>
                  cust.name
                      .toLowerCase()
                      .includes(searchCustomer.value.toLowerCase())
              )
              .map((cust) => cust.id)
        : props.customers;
    return !_filteredCustomer.includes(id);
};

const selectCustomer = (data) => {
    emit("selectCustomer", data);
};
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
.modal-header {
    display: flex;
    justify-content: end;
}

.customers-list {
    display: flex;
    flex-direction: column;

    .customer-li {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        position: relative;

        &:nth-child(odd) {
            background-color: var(--primary-a0);
            box-shadow: 0 0 0 100vmax var(--primary-a0);
            clip-path: inset(0 -100vmax);
        }

        &:hover::before {
            content: "";
            position: absolute;
            top: 0;
            left: -1.5rem;
            height: 100%;
            width: 2px;
            background-color: var(--primary);
        }

        .customer-data {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            span:first-of-type {
                text-transform: uppercase;
                color: var(--text-color-secondary);
            }
            span:nth-of-type(2) {
                text-transform: capitalize;
            }
        }
        .customer-selectBtn {
            display: flex;
            align-items: center;

            button {
                padding: 0.75rem 1rem;
            }
        }
    }
}
</style>
