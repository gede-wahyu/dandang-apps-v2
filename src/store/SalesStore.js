import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

// const baseUrl = import.meta.env.VITE_BASE_URL;
const baseUrl = "https://my-json-server.typicode.com/gede-wahyu";

export const useSalesStore = defineStore("salesStore", {
    state: () => ({
        sales: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async GET__SALES() {
            this.isLoading = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/dandang-api-v2/sales`)
                .then((result) => (this.sales = result))
                .catch((error) => error);

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
    },
});
