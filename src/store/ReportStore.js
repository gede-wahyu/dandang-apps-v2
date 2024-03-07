import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useReportStore = defineStore("reportStore", {
    state: () => ({
        isLoading: false,
        incomeTax: null,
        statistic: null,
        profit: null,
        weeklyProfit: null,
        bestseller: null,
        topCustomer: null,
        userSales: null,
        sales: null,
        topSeller: null,
        reportIncome: [],
        filter: {
            month: null,
            year: null,
        },
    }),
    getters: {},
    actions: {
        async GET__INCOME_TAX(year) {
            const result = await fetchWrapper
                .get(`${baseUrl}/api/dashboard/sales-tax/${year}`)
                .then((result) => {
                    this.incomeTax = result.data;
                })
                .catch((error) => error);

            return result;
        },

        async GET__STATISTIC() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/summary?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.statistic = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__PROFIT() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/profit-last-month?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.profit = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__WEEKLY_PROFIT() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/weekly-profit-last-month?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.weeklyProfit = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__BESTSELLER() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/top-products?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.bestseller = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__TOP_CUSTOMER() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/top-customers?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.topCustomer = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__USER_SALES(id) {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/total-amount-seller/${id}?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.userSales = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__SALES_BY_ROLE() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/total-amount?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.sales = result.data;
                })
                .catch((error) => error);

            return result;
        },
        async GET__TOP_SELLER() {
            const result = await fetchWrapper
                .get(
                    `${baseUrl}/api/dashboard/top-sellers?year=${this.filter.year}&month=${this.filter.month}`
                )
                .then((result) => {
                    this.topSeller = result.data;
                })
                .catch((error) => error);

            return result;
        },

        async GET__REPORT_INCOME(page, rpp, filters) {
            this.isLoading = true;
            let query = `?perPage=${rpp}`;
            if (page) query += `&page=${page}`;
            if (filters) {
                for (let props in filters) {
                    if (filters[props]) {
                        query += `&${props}=${filters[props]}`;
                    }
                }
            }

            const result = await fetchWrapper
                .get(`${baseUrl}/api/reports-sales-tax${query}`)
                .then((result) => (this.reportIncome = result))
                .catch((error) => error);
            this.isLoading = false;

            return result;
        },

        async GET__EXPORTED_REPORT_INCOME_TAX(filters) {
            this.isLoading = true;
            let query = `?`;
            if (filters) {
                for (let props in filters) {
                    if (filters[props]) {
                        query += `&${props}=${filters[props]}`;
                    }
                }
            }
            query += "&exports=json";
            const result = await fetchWrapper
                .get(`${baseUrl}/api/reports-sales-tax${query}`)
                .then((result) => result)
                .catch((error) => error);
            this.isLoading = false;

            return result;
        },
    },
});
