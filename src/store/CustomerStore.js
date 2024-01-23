import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

// const baseUrl = import.meta.env.VITE_BASE_URL;
const baseUrl = "https://my-json-server.typicode.com/gede-wahyu";

export const useCustomerStore = defineStore("customerStore", {
    state: () => ({
        customers: [],
        topCustomers: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async GET__CUSTOMERS() {
            this.isLoading = true;
            const result = fetchWrapper
                .get(`${baseUrl}/dandang-api-v2/customers`)
                .then((result) => (this.customers = result))
                .catch((error) => error);

            return result;
        },

        async GET__TOP_CUSTOMERS() {
            this.isLoading = true;
            // const result = fetchWrapper
            //     .get(`${baseUrl}/api/top-customers`)
            //     .then((result) => (this.topCustomers = result))
            //     .catch((error) => error);

            // return result;

            await this.GET__CUSTOMERS();
            this.topCustomers = this.customers.slice(0, 5);
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
