import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";
const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        auth: {
            user: null,
            role: null,
            acc: null,
        },
    }),
    getters: {
        user() {
            return this.auth ? this.auth.user : null;
        },
    },
    actions: {
        async login(username, password) {
            const result = await fetchWrapper.post(`${baseUrl}/login`, {
                email: username,
                password,
            });

            if (result.success) {
                this.auth = result.data;
                this.setBaseRolePermission();
                this.setAdditionalRolePermission();
            }

            return result;
        },

        isAunthenticated() {
            // return await fetchWrapper.post(
            //     "https://omahit.my.id/api/refresh-token",
            //     {
            //         "api-token": this.user["api_token"],
            //     }
            // );
            if (this.auth) return true;
            else return false;
        },

        logout() {
            this.auth = null;
        },

        async updatePersonalInfo(data) {
            // const result = await fetchWrapper.patch(
            //     `${baseUrl}/user/${this.auth.user.id}`,
            //     data
            // );
            console.log(data);
        },

        /** set basic permission for every (1)route-name and (2)function-name */
        setBaseRolePermission() {
            if (!this.isAunthenticated()) return;
            if (!this.auth.user) return;
            this.auth.role.permission.push(
                "dashboard",
                "notification",
                "user",
                "login",
                "unauthorize",

                "login()",
                "logout()"
            );
        },

        /** set additional permission for every (1)route-name and (2)function-name */
        setAdditionalRolePermission() {
            if (!this.isAunthenticated()) return;
            if (!this.auth.user) return;
            if (this.auth.role.role_id == 1) {
                this.auth.role.permission.push(
                    "transaction-list",
                    "transaction-add",
                    "transaction-delay",
                    "saler-list",
                    "saler-add",
                    "depo-list",
                    "depo-add",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 2) {
                this.auth.role.permission.push(
                    "transaction-list",
                    "transaction-add",
                    "transaction-delay",
                    "depo-list",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 3) {
                this.auth.role.permission.push(
                    "transaction-list",
                    "transaction-add",
                    "depo-list",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 4) {
                this.auth.role.permission.push(
                    "transaction-list",
                    "transaction-add",
                    "depo-list",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 5) {
                this.auth.role.permission.push("distribution-list");
            }
        },

        isAuthorize(routerName) {
            if (this.isAunthenticated())
                return this.auth.role.permission.includes(routerName);
            else return false;
        },
    },
});
