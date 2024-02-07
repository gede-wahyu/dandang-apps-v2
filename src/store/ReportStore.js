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
        .get(`${baseUrl}/api/dashboard/summary`)
        .then((result) => {
          this.statistic = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__PROFIT() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/profit-last-month`)
        .then((result) => {
          this.profit = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__WEEKLY_PROFIT() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/profit-last-month`)
        .then((result) => {
          this.weeklyProfit = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__BESTSELLER() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/top-products`)
        .then((result) => {
          this.bestseller = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__TOP_CUSTOMER() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/top-customers`)
        .then((result) => {
          this.topCustomer = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__USER_SALES(id) {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/total-amount-seller/${id}`)
        .then((result) => {
          this.userSales = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__SALES_BY_ROLE() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/total-amount`)
        .then((result) => {
          this.sales = result.data;
        })
        .catch((error) => error);

      return result;
    },
    async GET__TOP_SELLER() {
      const result = await fetchWrapper
        .get(`${baseUrl}/api/dashboard/top-sellers`)
        .then((result) => {
          this.topSeller = result.data;
        })
        .catch((error) => error);

      return result;
    },

    async GET__REPORT_INCOME(page, rpp) {
      this.isLoading = true;
      let query = `?perPage=${rpp}`;
      if (page) query += `&page=${page}`;

      const result = await fetchWrapper
        .get(`${baseUrl}/api/reports-sales-tax${query}`)
        .then((result) => (this.reportIncome = result))
        .catch((error) => error);
      this.isLoading = false;
      return result;
    },
  },
});
