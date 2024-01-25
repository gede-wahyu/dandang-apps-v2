<template>
    <div class="container">
        <div class="d-card insight">
            <div>
                <h5>
                    Halo,
                    <span>{{ authStore.auth.user.name }}</span>
                </h5>
                <p>Nilai transaksi bulan lalu</p>
                <h4>Rp {{ nFormatter(userSales, 1) }}</h4>
            </div>
            <div>
                <div class="profile">
                    <img
                        v-if="
                            authStore.auth.user && authStore.auth.user.profile
                        "
                        :src="`https://omahit.my.id/${authStore.auth.user.profile}`"
                        :alt="authStore.auth.user.name"
                    />
                    <div class="profile-none" v-else>
                        <span class="material-symbols-outlined"> person </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-card statistic">
            <div class="header">
                <h5>Statistik</h5>
                <span>Bulan lalu</span>
            </div>
            <div class="inner-card-group">
                <div class="inner-card trans-count">
                    <div class="icon">
                        <span class="material-symbols-outlined">
                            pie_chart
                        </span>
                    </div>
                    <div class="label">
                        <span v-if="statistic">
                            {{ nFormatter(statistic.total_sales_count, 1) }}
                        </span>
                        <span v-else>0</span>
                        <span>Jumlah Transaksi</span>
                    </div>
                </div>
                <div class="inner-card cust-count">
                    <div class="icon">
                        <span class="material-symbols-outlined"> group </span>
                    </div>
                    <div class="label">
                        <span v-if="statistic">
                            {{
                                nFormatter(
                                    statistic.total_customers_last_month,
                                    1
                                )
                            }}
                        </span>
                        <span v-else>0</span>
                        <span>Pelanggan</span>
                    </div>
                </div>
                <div class="inner-card product-count">
                    <div class="icon">
                        <span class="material-symbols-outlined">
                            shopping_cart
                        </span>
                    </div>
                    <div class="label">
                        <span v-if="statistic">
                            {{ nFormatter(statistic.total_products_sold, 1) }}
                        </span>
                        <span v-else>0</span>
                        <span>Produk Terjual</span>
                    </div>
                </div>
                <div class="inner-card trans-value">
                    <div class="icon">
                        <span class="material-symbols-outlined"> paid </span>
                    </div>
                    <div class="label">
                        <span v-if="statistic">
                            {{ nFormatter(statistic.total_last_month, 1) }}
                        </span>
                        <span v-else>0</span>
                        <span>Nilai Transaksi</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-card default increase-profit">
            <div>
                <h5 v-if="profit">
                    {{ nFormatter(profit.total_profit, 1) }}
                </h5>
                <h5 v-else>0</h5>
                <span>Laba</span>
            </div>
            <Knob
                v-model="knob"
                valueTemplate="{value}%"
                valueColor="var(--orange-500)"
                :size="120"
                readonly
            />
            <div class="increase">
                <span class="material-symbols-outlined"> expand_less </span>
                <span v-if="profit">Rp {{ profit.total_increase }}</span>
                <span v-else>Rp 0</span>
            </div>
        </div>
        <div class="d-card default profit">
            <div>
                <h5>Laba</h5>
                <span>Bulan lalu</span>
            </div>
            <ChartLaba />
            <span>Laba per minggu</span>
        </div>
        <div class="d-card default total-trans">
            <div>
                <h5>Nilai Transaksi</h5>
                <span>Total nilai transaksi bulan lalu</span>
                <div>
                    <h3 v-if="sales">
                        Rp {{ nFormatter(sales.total_amount, 1) }}
                    </h3>
                    <h3 v-else>Rp 0</h3>
                    <div class="increase">
                        <span class="material-symbols-outlined"
                            >expand_less</span
                        >
                        <span v-if="sales"
                            >{{ sales.percentage_increase }}%</span
                        >
                        <span v-else>0</span>
                    </div>
                </div>
            </div>
            <ChartTotalTrans />
        </div>
        <div class="d-card income-tax">
            <div class="flex justify-content-between">
                <h5>Pendapatan dan Pajak</h5>
                <Dropdown
                    v-model="incomeTaxYear"
                    :options="incomeTaxYearOpt"
                    @update:modelValue="reqNewIncomeTaxData()"
                />
            </div>
            <ChartPendapatanPajak :year="incomeTaxYear" />
        </div>
        <div class="d-card default top-saler">
            <div>
                <h5>Sales Terbaik</h5>
                <span>Bulan lalu</span>
            </div>
            <div>
                <SalesTerbaik />
            </div>
        </div>
        <div class="d-card default best-seller">
            <div>
                <h5>Produk Terlaris</h5>
                <span>Bulan lalu</span>
            </div>
            <div>
                <ProdukTerlaris />
            </div>
        </div>
        <div class="d-card default top-cust">
            <div>
                <h5>Pelanggan Setia</h5>
                <span>Bulan lalu</span>
            </div>
            <div>
                <PelangganSetia />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../store/AuthStore";
import { useReportStore } from "../store/ReportStore";
import { ref, onMounted } from "vue";
import ChartLaba from "./chart/ChartLaba.vue";
import ChartTotalTrans from "./chart/ChartTotalTrans.vue";
import ChartPendapatanPajak from "./chart/ChartPendapatanPajak.vue";
import ProdukTerlaris from "./chart/ProdukTerlaris.vue";
import SalesTerbaik from "./chart/SalesTerbaik.vue";
import PelangganSetia from "./chart/PelangganSetia.vue";

const authStore = useAuthStore();
const reportStore = useReportStore();
const knob = ref(0);
const incomeTaxYear = ref(2023);
const incomeTaxYearOpt = ref([2022, 2023, 2024]);
const statistic = ref();
const profit = ref();
const incomeTax = ref();
const userSales = ref();
const sales = ref();

onMounted(async () => {
    await reportStore.GET__STATISTIC();
    await reportStore.GET__PROFIT();
    await reportStore.GET__INCOME_TAX(incomeTaxYear.value);
    await reportStore.GET__USER_SALES(authStore.auth.user.id);
    await reportStore.GET__SALES_BY_ROLE();
    statistic.value = reportStore.statistic;
    profit.value = reportStore.profit;
    knob.value = profit.value["percentage_increase"];
    incomeTax.value = reportStore.incomeTax;
    userSales.value = reportStore.userSales;
    sales.value = reportStore.sales;
});

const reqNewIncomeTaxData = async () => {
    await reportStore.GET__INCOME_TAX(incomeTaxYear.value);
    incomeTax.value = reportStore.incomeTax;
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
.d-card {
    padding: 1.5rem;
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
    .total-trans {
        grid-column: 1 / 5;
    }
    .top-saler {
        grid-column: 1 / 5;
    }
    .best-seller {
        grid-column: 5 / 9;
    }
    .top-cust {
        grid-column: 9 / 13;
    }
}
.insight {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    & > div:last-of-type {
        display: flex;
        justify-content: center;
    }
    h5 {
        span {
            text-transform: capitalize;
        }
    }
    p {
        color: var(--text-color-secondary);
    }
    h4 {
        color: var(--primary);
        text-wrap: nowrap;
    }
    .profile {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
        }
        .profile-none {
            width: 9rem;
            height: 9rem;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            background-color: var(--surface-ground);
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            span {
                font-size: 8rem;
                color: var(--icon-color-secondary);
            }
        }
    }
}
.default {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    h5 {
        margin: 0;
    }
    span {
        color: var(--text-color-secondary);
    }
}
.statistic {
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        justify-content: space-between;
        span {
            color: var(--text-color-secondary);
        }
    }
    .inner-card-group {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .inner-card {
        padding: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        &.trans-count {
            .icon {
                background-color: var(--purple-100);
                span {
                    color: var(--purple-500);
                }
            }
        }
        &.cust-count {
            .icon {
                background-color: var(--blue-100);
                span {
                    color: var(--blue-500);
                }
            }
        }
        &.product-count {
            .icon {
                background-color: var(--red-100);
                span {
                    color: var(--red-500);
                }
            }
        }
        &.trans-value {
            .icon {
                background-color: var(--green-100);
                span {
                    color: var(--green-500);
                }
            }
        }
        .icon {
            width: 3rem;
            height: 3rem;
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            span {
                font-size: 1.5rem;
            }
        }
        .label {
            display: flex;
            flex-direction: column;
            justify-content: center;
            span:first-of-type {
                font-size: 1.25rem;
            }
            span:last-of-type {
                color: var(--text-color-secondary);
            }
        }
    }
}
.increase {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    span {
        color: var(--color-success);
    }
}
.increase-profit {
    span {
        text-align: center;
    }
    .p-knob {
        display: flex;
        justify-content: center;
    }
}
.total-trans {
    flex-direction: row;
    justify-content: space-between;
    & > div {
        display: flex;
        flex-direction: column;
        & > div {
            h3 {
                margin-bottom: 1rem;
            }
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
.income-tax {
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
        .total-trans {
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
        .best-seller {
            grid-column: 7 / 13;
        }
        .top-cust {
            grid-column: 1 / 7;
        }
    }
    .statistic {
        .inner-card-group {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}

@media screen and (max-width: 1200px) {
    .insight {
        .profile {
            .profile-none {
                width: 5rem;
                height: 5rem;
                span {
                    font-size: 3rem;
                }
            }
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
        .total-trans {
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
        .best-seller {
            grid-column: 1 / 13;
        }
        .top-cust {
            grid-column: 1 / 13;
        }
    }
}
</style>
