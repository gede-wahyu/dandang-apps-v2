import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCustomerStore = defineStore("customerStore", {
    state: () => ({
        customers: [],
        topCustomers: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async GET__CUSTOMERS(page, search) {
            this.isLoading = true;
            let query = "?perPage=5";

            if (page && search)
                query = `?search=${search}&page=${page}&perPage=5`;
            else if (page) query = `?page=${page}&perPage=5`;
            else if (search) query = `?search=${search}&perPage=5`;

            const result = await fetchWrapper
                .get(`${baseUrl}/api/customers${query}`)
                .then((result) => (this.customers = result))
                .catch((error) => error);

            return result;
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
