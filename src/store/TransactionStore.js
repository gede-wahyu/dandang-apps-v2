import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useTransactionStore = defineStore("transactionStore", {
    state: () => ({
        transaction: [],
        isLoading: false,
    }),
    getters: {
        getPendingTransaction() {
            return this.transaction.filter((item) => {
                return item["status"]["kode"] === 2;
            });
        },
    },
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
