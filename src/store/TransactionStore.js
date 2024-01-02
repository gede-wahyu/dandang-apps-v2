import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTransactionStore = defineStore("transactionStore", {
    state: () => ({
        transaction: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getTransaction() {
            this.isLoading = true;
            const result = await fetchWrapper.get(
                `https://my-json-server.typicode.com/gede-wahyu/dandang-apps-api-trans/riwayat-transaksi`
            );

            if (result) {
                this.transaction = result;
            }

            return result;
        },
        // async getTransaction() {
        //     const result = await fetchWrapper.get(`${baseUrl}/api/transaction`);

        //     if (result.success) {
        //         this.transaction = result.data;
        //     }

        //     return result;
        // },

        async postTransaction(payload) {
            const result = await fetchWrapper.post(
                `${baseUrl}/api/transaction`,
                payload
            );

            if (result.success) {
                this.transaction.push(payload);
            }

            return result;
        },
    },
});
