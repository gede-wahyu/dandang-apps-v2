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
                return item["status"]["code"] === 2;
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

        filterTransaction(filters, paramData) {
            let data = paramData ? paramData : this.transaction;

            for (let item in filters) {
                let field = item.includes(".") ? item.split(".")[0] : item;
                let key = item.includes(".") ? item.split(".")[1] : null;

                if (!key) {
                    data = data.filter((t) => {
                        if (filters[item]["matchMode"] === "CONTAINS")
                            return CONTAINS(t[field], filters[item]["value"]);

                        if (filters[item]["matchMode"] === "EQUALS")
                            return EQUALS(t[field], filters[item]["value"]);

                        if (filters[item]["matchMode"] === "DATE")
                            return DATE(t[field], filters[item]["value"]);
                    });
                } else {
                    data = data.filter((t) => {
                        if (filters[item]["matchMode"] === "CONTAINS")
                            return CONTAINS(
                                t[field][key],
                                filters[item]["value"]
                            );

                        if (filters[item]["matchMode"] === "EQUALS")
                            return EQUALS(
                                t[field][key],
                                filters[item]["value"]
                            );

                        if (filters[item]["matchMode"] === "DATE")
                            return DATE(t[field][key], filters[item]["value"]);
                    });
                }
            }

            function CONTAINS(data, query) {
                if (!query) return true;
                return data
                    .toString()
                    .toLowerCase()
                    .includes(query.toString().toLowerCase());
            }
            function EQUALS(data, query) {
                if (!query && query !== 0) return true;
                return (
                    data.toString().toLowerCase() ===
                    query.toString().toLowerCase()
                );
            }
            function DATE(data, query) {
                if (!query) return true;
                data = new Date(data).getTime();
                query[0] = new Date(query[0]).getTime();
                query[1] = new Date(query[1]).getTime();

                return data >= query[0] && data < query[1];
            }

            return data;
        },

        sortTransaction(data, sortState) {
            let target = GET_FIELD();
            let field =
                target && target.includes(".") ? target.split(".")[0] : target;
            let key =
                target && target.includes(".") ? target.split(".")[1] : null;

            if (!key) {
                if (sortState[target]) {
                    return data.sort((a, b) =>
                        a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
                    );
                } else {
                    return data.sort((a, b) =>
                        a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0
                    );
                }
            } else {
                if (sortState[target]) {
                    return data.sort((a, b) =>
                        a[field][key] > b[field][key]
                            ? 1
                            : a[field][key] < b[field][key]
                            ? -1
                            : 0
                    );
                } else {
                    return data.sort((a, b) =>
                        a[field][key] < b[field][key]
                            ? 1
                            : a[field][key] > b[field][key]
                            ? -1
                            : 0
                    );
                }
            }

            function GET_FIELD() {
                let target = null;
                for (let item in sortState) {
                    if (sortState[item] !== null) {
                        return (target = item);
                    }
                }
                return target;
            }
        },
    },
});
