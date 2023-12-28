import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        users: [],
        isLoading: false,
    }),
    getters: {},
    actions: {
        async getUsers() {
            this.isLoading = true;
            const res = await fetch(
                "https://my-json-server.typicode.com/gede-wahyu/dandang-api-v2/users"
            );
            const data = await res.json();
            this.users = data;
            this.isLoading = false;
        },
    },
});
