import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";
import { useAuthStore } from "./AuthStore";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [],
        salerProducts: [],
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

        async getSalerProducts(userId) {
            this.isLoading = true;

            const { auth } = useAuthStore();
            if (!userId) {
                if (auth.role.role_id != 1001) userId = auth.user.id;
                else userId = "";
            }

            const result = await fetchWrapper.get(
                `https://my-json-server.typicode.com/gede-wahyu/dandang-api-v2/saler-products/${userId}`
            );

            if (result) {
                this.salerProducts = result;
            }

            return result;
        },
    },
});
