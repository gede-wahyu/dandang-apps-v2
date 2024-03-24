import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;
// const baseUrl = "https://my-json-server.typicode.com/gede-wahyu";

export const useDepoStore = defineStore("depoStore", {
    state: () => ({
        depo: [],
        selectedDepo: [],
        isLoading: false,
        loadingSelectedDepo: false,
    }),
    getters: {},
    actions: {
        async GET__DEPO(page, rpp, filters) {
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
                .get(`${baseUrl}/api/warehouses${query}`)
                .then((result) => (this.depo = result))
                .catch((error) => error);
            this.isLoading = false;
            return result;
        },

        async GET__DEPO_BY_ID(id) {
            console.log("depo id triger");
            this.loadingSelectedDepo = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/api/warehouses/${id}`)
                .then((result) => (this.selectedDepo = result))
                .catch((error) => error);
            this.loadingSelectedDepo = false;
            return result;
        },
    },
});
