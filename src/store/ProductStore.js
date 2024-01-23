import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";
import { useAuthStore } from "./AuthStore";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductStore = defineStore("productStore", {
    state: () => ({
        products: [],
        salerProducts: [],
        bestseller: [],
        isLoading: false,
    }),
    getters: {
        getProductsForTransaction() {
            const { isAdmin, isSalerTO } = useAuthStore();

            if (isAdmin || isSalerTO) return this.products;
            else return this.salerProducts;
        },
    },
    actions: {
        async GET__PRODUCTS() {
            this.isLoading = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/api/products`)
                .then((result) => (this.products = result.data))
                .catch((error) => error);

            return result;
        },

        async GET__SALES_PRODUCTS_BY_ID(userId) {
            this.isLoading = true;
            const { auth, isAdmin } = useAuthStore();

            if (!isAdmin) userId = auth.user["id"];
            else if (isAdmin && !userId) return;

            const result = await fetchWrapper
                .get(`${baseUrl}/api/sellers-products/${userId}`)
                .then((result) => (this.salerProducts = result.data))
                .catch((error) => error);

            return result;
        },

        async GET__PRODUCTS_TRANSACTION() {
            const { isAdmin, isSalerTO } = useAuthStore();
            if (isAdmin || isSalerTO) {
                await this.GET__PRODUCTS();
            } else {
                await this.GET__SALES_PRODUCTS_BY_ID();
            }
        },

        async GET__PRODUCTS_BESTSELLER() {
            // const result = fetchWrapper
            //     .get(`${baseUrl}/api/products-bestseller`)
            //     .then((result) => (this.bestseller = result.data))
            //     .catch((error) => error);

            // return result;

            await this.GET__PRODUCTS();
            this.bestseller = this.products.slice(0, 5);
        },

        filterData(data, filters) {
            if (!data) return;
            if (!filters) return;

            return data.filter((item) => {
                for (let field of filters["fields"]) {
                    if (item[field] && CONTAINS(item[field], filters["value"]))
                        return true;
                    else return false;
                }
            });

            function CONTAINS(data, query) {
                if (!query) return true;
                return data
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase());
            }
        },
    },
});
