<template>
    <div class="filter">
        <Dropdown
            v-model="month"
            :options="monthOpt"
            optionLabel="name"
            placeholder="Filter bulan"
            style="width: 12rem"
        />
        <Dropdown
            v-model="year"
            :options="yearOpt"
            placeholder="Filter tahun"
            style="width: 8rem"
        />
        <Button label="Filter" @click="onFilter()" />
    </div>
    <div class="container">
        <Insight class="insight" />
        <Statistic class="statistic" />
        <IncreaseProfit
            v-if="authStore.isAdmin || authStore.isDepo"
            class="increase-profit"
        />
        <Profit v-if="authStore.isAdmin || authStore.isDepo" class="profit" />
        <Transaction
            v-if="authStore.isAdmin || authStore.isDepo"
            class="transaction"
        />
        <IncomeTax
            v-if="authStore.isAdmin || authStore.isDepo"
            class="income-tax"
        />
        <TopSaler
            v-if="authStore.isAdmin || authStore.isDepo"
            class="top-saler"
        />
        <TopProduct
            v-if="authStore.isAdmin || authStore.isDepo"
            class="top-product"
        />
        <TopCustomer
            v-if="authStore.isAdmin || authStore.isDepo"
            class="top-customer"
        />
    </div>
</template>

<script setup>
import Insight from "./Insight.vue";
import Statistic from "./Statistic.vue";
import IncreaseProfit from "./IncreaseProfit.vue";
import Profit from "./Profit.vue";
import Transaction from "./Transaction.vue";
import IncomeTax from "./IncomeTax.vue";
import TopSaler from "./TopSaler.vue";
import TopProduct from "./TopProduct.vue";
import TopCustomer from "./TopCustomer.vue";
import { ref, onMounted } from "vue";
import { useReportStore } from "../../store/ReportStore";
import { useAuthStore } from "../../store/AuthStore";

const authStore = useAuthStore();
const reportStore = useReportStore();
const month = ref();
const year = ref();
const monthOpt = ref([
    { num: 1, name: "Januari" },
    { num: 2, name: "Februari" },
    { num: 3, name: "Maret" },
    { num: 4, name: "April" },
    { num: 5, name: "Mei" },
    { num: 6, name: "Juni" },
    { num: 7, name: "Juli" },
    { num: 8, name: "Agustus" },
    { num: 9, name: "September" },
    { num: 10, name: "Oktober" },
    { num: 11, name: "November" },
    { num: 12, name: "Desember" },
]);
const yearOpt = ref(["2022", "2023", "2024"]);
const currDate = new Date();
month.value = monthOpt.value.find(
    (item) => item.num == currDate.getMonth() + 1
);
year.value = `${currDate.getFullYear()}`;
reportStore.filter.month = month.value.num;
reportStore.filter.year = year.value;

const onFilter = () => {
    reportStore.filter.month = month.value.num;
    reportStore.filter.year = year.value;
};

//
</script>

<style scoped lang="scss">
.filter {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}
.container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 1.5rem;
    row-gap: 1.5rem;

    .insight {
        grid-column: 1 / 5;
    }
    .statistic {
        grid-column: 5 / 13;
    }
    .increase-profit {
        grid-column: 1 / 3;
    }
    .profit {
        grid-column: 3 / 5;
    }
    .income-tax {
        grid-column: 5 / 13;
        grid-row: 2 / 4;
    }
    .transaction {
        grid-column: 1 / 5;
    }
    .top-saler {
        grid-column: 1 / 5;
    }
    .top-product {
        grid-column: 5 / 9;
    }
    .top-customer {
        grid-column: 9 / 13;
    }
}

@media screen and (max-width: 1300px) {
    .container {
        .increase-profit {
            grid-column: 1 / 4;
            grid-row: 2 / 4;
        }
        .profit {
            grid-column: 4 / 7;
            grid-row: 2 / 4;
        }
        .transaction {
            grid-column: 7 / 13;
            grid-row: 2 / 4;
        }
        .income-tax {
            grid-column: 1 / 13;
            grid-row: 4 / 5;
        }
        .top-saler {
            grid-column: 1 / 7;
        }
        .top-product {
            grid-column: 7 / 13;
        }
        .top-customer {
            grid-column: 1 / 7;
        }
    }
}

@media screen and (max-width: 767px) {
    .container {
        // grid-template-columns: 1fr 1fr;
        .insight {
            grid-column: 1 / 13;
            grid-row: 1;
        }
        .statistic {
            grid-column: 1 / 13;
            grid-row: 2;
        }
        .increase-profit {
            grid-column: 1 / 7;
            grid-row: 3;
        }
        .profit {
            grid-column: 7 / 13;
            grid-row: 3;
        }
        .transaction {
            grid-column: 1 / 13;
            grid-row: 4;
        }
        .income-tax {
            grid-column: 1 / 13;
            grid-row: 5;
        }
        .top-saler {
            grid-column: 1 / 13;
        }
        .top-product {
            grid-column: 1 / 13;
        }
        .top-customer {
            grid-column: 1 / 13;
        }
    }
}
</style>
