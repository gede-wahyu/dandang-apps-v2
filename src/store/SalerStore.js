import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

export const useSalerStore = defineStore("salerStore", {
    state: () => ({
        saler: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getSaler() {
            this.isLoading = true;
            const result = await fetchWrapper.get(
                "https://my-json-server.typicode.com/gede-wahyu/dandang-api-v2/saler"
            );

            if (result) {
                this.saler = result;
            }

            return result;
        },
    },
});
