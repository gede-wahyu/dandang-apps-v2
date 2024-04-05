import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCustomerStore = defineStore("customerStore", {
    state: () => ({
        customers: [],
        isLoading: false,
        selectedCust: [],
        loadingSelectedCust: false,
    }),
    getters: {},
    actions: {
        async GET__CUSTOMERS(page, rpp, filters) {
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
                .get(`${baseUrl}/api/customers${query}`)
                .then((result) => (this.customers = result))
                .catch((error) => error);

            this.isLoading = false;
            return result;
        },

        async GET__CUST_BY_ID(id) {
            this.loadingSelectedCust = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/api/customers/${id}`)
                .then((result) => (this.selectedCust = result.data))
                .catch((error) => error);
            this.loadingSelectedCust = false;
            return result;
        },
    },
});
