import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;
// const baseUrl = "https://my-json-server.typicode.com/gede-wahyu";

export const useSalesStore = defineStore("salesStore", {
    state: () => ({
        sales: [],
        isLoading: false,
        selectedSales: [],
        loadingSelectedSales: false,
    }),
    getters: {},
    actions: {
        async GET__SALES(page, rpp, filters) {
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
                .get(`${baseUrl}/api/sellers${query}`)
                .then((result) => (this.sales = result))
                .catch((error) => error);
            this.isLoading = false;
            return result;
        },

        async GET__SALES_SALER_PRODUCTS() {
            this.isLoading = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/dandang-api-v2/sales`)
                .then((result) => (this.sales = result))
                .catch((error) => error);

            return result;
        },

        async GET__SALES_BY_ID(id) {
            this.loadingSelectedSales = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/api/sellers/${id}`)
                .then((result) => (this.selectedSales = result.data))
                .catch((error) => error);
            this.loadingSelectedSales = false;
            return result;
        },
    },
});
