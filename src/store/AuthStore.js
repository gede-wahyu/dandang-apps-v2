import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        auth: {
            authenticated: false,
            user: null,
            roleId: null,
            permission: []
        },
        users: [],
        isLoading: false
    }),
    getters: {},
    actions: {
        async getUsers() {
            this.isLoading = true;
            const res = await fetch("https://my-json-server.typicode.com/gede-wahyu/dandang-api/users");
            const data = await res.json();
            this.users = data;
            this.isLoading = false;
        },

        login(username, password) {
            let user = this.users.find((user) => user.username === username && user.password === password)
            if(user) {
                this.auth.authenticated = true;
                this.auth.user = user;
                this.auth.roleId = user.id_role
                this.setBaseRolePermission()
                this.setAdditionalRolePermission()


                return {
                    authenticated: true,
                    user: user
                }
            }
            else {
                this.auth.authenticated = false;
                return {
                    authenticated: false,
                    message: "Wrong credential"
                }
            }
        },

        logout() {
            this.auth.authenticated=false
            this.auth.user=null
            this.auth.roleId=null
            this.auth.permission=null
        },

        /** set basic permission for every (1)route-name and (2)function-name */
        setBaseRolePermission() {
            if(!this.auth.authenticated) return;
            if(!this.auth.user) return;
            this.auth.permission.push(
                'home',
                'notifications',
                'settings',
                'home-product-list',
                'coming-soon',
                'login',
                'unauthorize',
                
                'logout()',
                'settings-change()',
            )
        },

        /** set additional permission for every (1)route-name and (2)function-name */
        setAdditionalRolePermission() {
            if(!this.auth.authenticated) return;
            if(!this.auth.user) return;
            if(this.auth.roleId == 1) {
                this.auth.permission.push(
                    'store-list',
                    'transaction-add',
                    'home-transaction-list',
                    'home-transaction-delay',
                    'home-distribution-list',
                    'home-saler-list',

                    'make-transaction()'
                )
            }
            else if(this.auth.roleId == 2) {
                this.auth.permission.push(
                    'store-list',
                    'transaction-add',
                    'home-transaction-list',
                    'home-transaction-delay',

                    'make-transaction()'
                )
            }
            else if(this.auth.roleId == 3) {
                this.auth.permission.push(
                    'store-list',
                    'transaction-add',
                    'home-transaction-list',

                    'make-transaction()'
                )
            }
            else if(this.auth.roleId == 4) {
                this.auth.permission.push(
                    'store-list',
                    'transaction-add',
                    'home-transaction-list',

                    'make-transaction()'
                )
            }
            else if(this.auth.roleId == 5) {
                this.auth.permission.push(
                    'home-distribution-list',
                )
            }
        },

        isAuthorize(routerName) {
            return this.auth.permission.includes(routerName)
        }
    }
})