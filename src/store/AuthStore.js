import { defineStore } from "pinia";
import { fetchWrapper } from "../helper/fetch-wrapper";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore("authStore", {
    state: () => ({
        auth: {
            user: null,
            role: null,
        },
    }),
    getters: {
        isAdminOrSTO() {
            if ((this.auth.role ? this.auth.role["role_id"] : null) === 1001)
                return true;
            if ((this.auth.role ? this.auth.role["role_id"] : null) === 4)
                return true;
            return false;
        },
    },
    actions: {
        async login(username, password) {
            const result = await fetchWrapper.post(`${baseUrl}/api/login`, {
                email: username,
                password,
            });

            if (result.success) {
                this.auth = result.data;
                this.setBaseRolePermission();
                this.setAdditionalRolePermission();

                localStorage.setItem("session", JSON.stringify(this.auth));
            }

            return result;
        },

        isAunthenticated() {
            let session = JSON.parse(localStorage.getItem("session"))
                ? JSON.parse(localStorage.getItem("session"))
                : {};

            if (this.auth.exp) {
                if (this.auth.exp > Date.now()) return true;
            } else {
                if (session.exp > Date.now()) {
                    this.auth = session;
                    return true;
                }
            }
            return false;
        },

        deleteSession() {
            localStorage.removeItem("session");
            this.auth.exp = null;
        },
        logout() {
            this.auth.user = null;
            this.auth.role = null;
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
            if (this.auth.role.role_id == 1001) {
                this.auth.role.permission.push(
                    "my-product-list",
                    "product-list",
                    "product-add",
                    "transaction-list",
                    "transaction-add",
                    "transaction-delay",
                    "report-income",
                    "report-pnl",
                    "distribution-add",
                    "distribution-saler",
                    "distribution-customer",
                    "saler-list",
                    "saler-add",
                    "depo-list",
                    "depo-add",

                    "transactionPost",
                    "tax",
                    "discount",
                    "due",
                    "warehouse",
                    "selectSalerProduct"
                );
            } else if (this.auth.role.role_id == 3) {
                this.auth.role.permission.push(
                    "product-list",
                    "product-add",
                    "distribution-add",
                    "distribution-saler",
                    "distribution-customer",
                    "saler-list"
                );
            } else if (this.auth.role.role_id == 4) {
                this.auth.role.permission.push(
                    "product-list",
                    "my-product-list",
                    "transaction-list",
                    "transaction-add",
                    "transaction-delay",

                    "transactionPost",
                    "tax",
                    "discount",
                    "due",
                    "warehouse"
                );
            } else if (this.auth.role.role_id == 5) {
                this.auth.role.permission.push(
                    "product-list",
                    "my-product-list",
                    "transaction-list",
                    "transaction-add",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 6) {
                this.auth.role.permission.push(
                    "product-list",
                    "my-product-list",
                    "transaction-list",
                    "transaction-add",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 7) {
                this.auth.role.permission.push("distribution-list");
            }
        },

        isAuthorize(ability) {
            if (this.isAunthenticated())
                return this.auth.role.permission.includes(ability);
            else return false;
        },
    },
});
