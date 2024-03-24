import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useDistStore = defineStore("distStore", {
    state: () => ({
        dist: [],
        selectedDist: [],
        isLoading: false,
        loadingSelectedDist: false,
    }),
    getters: {},
    actions: {
        async GET__DISTRIBUTION(page, rpp, filters) {
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
                .get(`${baseUrl}/api/sd${query}`)
                .then((result) => (this.dist = result))
                .catch((error) => error);

            this.isLoading = false;
            return result;
        },

        async GET__DISTRIBUTION_BY_ID(id) {
            this.loadingSelectedDist = true;
            const result = await fetchWrapper
                .get(`${baseUrl}/api/sd/${id}`)
                .then((result) => (this.selectedDist = result))
                .catch((error) => error);
            this.loadingSelectedDist = false;
            return result;
        },
    },
});
