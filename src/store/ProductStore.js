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
    getters: {
        getProductsForTransaction() {
            const { isAdminOrSTO } = useAuthStore();

            if (isAdminOrSTO) return this.products;
            else return this.salerProducts;
        },
    },
    actions: {
        async getProducts() {
            this.isLoading = true;
            const result = await fetchWrapper.get(`${baseUrl}/api/products`);

            if (result.success) {
                this.products = result.data;
            }

            return result;
        },

        async getSalerProducts() {
            this.isLoading = true;
            const { auth, isAdminOrSTO } = useAuthStore();

            if (isAdminOrSTO) {
                return await this.getProducts();
            } else {
                const result = await fetchWrapper.get(
                    `${baseUrl}/api/sales-products/${auth.user["id"]}`
                );

                if (result) {
                    this.salerProducts = result.data;
                }

                return result;
            }
        },
    },
});
