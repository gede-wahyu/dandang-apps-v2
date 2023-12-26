import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customerStore", {
    state: () => ({
        customers: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getCustomers() {
            this.isLoading = true;
            try {
                // const res = await fetch("https://omahit.my.id/api/products", {
                //     method: "GET",
                //     mode: "cors",
                //     headers: {
                //         Authorization: `Bearer 88|oUcdHUqlT4OATwC510rep6NA94ffHAalbQR02p1b38a5130e`,
                //         "Content-Type": "application/json",
                //     },
                // });

                const res = await fetch(
                    "https://my-json-server.typicode.com/gede-wahyu/dandang-api-v2/customers"
                );

                if (res.ok) {
                    const data = await res.json();
                    this.customers = data;
                } else {
                    throw new Error(`${res.status} ${res.statusText}`);
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
