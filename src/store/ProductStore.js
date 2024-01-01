import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getProducts() {
            this.isLoading = true;
            const result = await fetchWrapper.get(`${baseUrl}/api/products`);

            if (result.success) {
                this.products = result.data;
            }

            return result;
        },
    },
});
