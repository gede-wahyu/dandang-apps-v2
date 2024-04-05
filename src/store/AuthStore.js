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
        isAdmin() {
            if ((this.auth.role ? this.auth.role["role_id"] : null) === 1001)
                return true;
            return false;
        },
        isDepo() {
            if ((this.auth.role ? this.auth.role["role_id"] : null) === 3)
                return true;
            return false;
        },
        isSalerTO() {
            if ((this.auth.role ? this.auth.role["role_id"] : null) === 4)
                return true;
            return false;
        },
    },
    actions: {
        async POST__LOGIN(username, password) {
            const result = await fetchWrapper
                .post(`${baseUrl}/api/login`, { email: username, password })
                .then((result) => {
                    this.auth = result.data;
                    this.setBaseRolePermission();
                    this.setAdditionalRolePermission();
                    localStorage.setItem("session", JSON.stringify(this.auth));

                    return result;
                })
                .catch((error) => ({ error }));

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

        async PATCH__PERSONAL_INFO(data) {
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
                    "sales-product-list",
                    "product-list",
                    "product-add",
                    "product-edit",
                    "transaction-list",
                    "transaction-detail",
                    "invoice",
                    "transaction-add",
                    "transaction-delay",
                    "report-income",
                    "report-pnl",
                    "distribution-add",
                    "distribution-saler",
                    "distribution-customer",
                    "saler-list",
                    "saler-add",
                    "saler-edit",
                    "depo-list",
                    "depo-add",
                    "depo-edit",
                    "cust-list",
                    "cust-add",
                    "cust-edit",

                    "transactionPost",
                    "tax",
                    "discount",
                    "due",
                    "warehouse",
                    "selectSalerProducts"
                );
            } else if (this.auth.role.role_id == 3) {
                this.auth.role.permission.push(
                    "product-list",
                    "product-add",
                    "distribution-add",
                    "distribution-saler",
                    "distribution-customer",
                    "saler-list",

                    "selectSalerProducts"
                );
            } else if (this.auth.role.role_id == 4) {
                this.auth.role.permission.push(
                    "product-list",
                    "transaction-list",
                    "transaction-detail",
                    "invoice",
                    "transaction-add",
                    "transaction-delay",
                    "cust-list",
                    "cust-add",
                    "cust-edit",

                    "transactionPost",
                    "tax",
                    "discount",
                    "due",
                    "warehouse"
                );
            } else if (this.auth.role.role_id == 5) {
                this.auth.role.permission.push(
                    "product-list",
                    "sales-product-list",
                    "transaction-list",
                    "transaction-detail",
                    "invoice",
                    "transaction-add",
                    "cust-list",
                    "cust-add",
                    "cust-edit",

                    "transactionPost"
                );
            } else if (this.auth.role.role_id == 6) {
                this.auth.role.permission.push(
                    "product-list",
                    "sales-product-list",
                    "transaction-detail",
                    "invoice",
                    "transaction-list",
                    "transaction-add",
                    "cust-list",
                    "cust-add",
                    "cust-edit",

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
