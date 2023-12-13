import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";
// import { useAuthStore } from "../stores/AuthStore";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: AppLayout,
            children: [
                {
                    path: "/",
                    name: "dashboard",
                    component: () => import("../view/Dashboard.vue"),
                },
                {
                    path: "/riwayat-transaksi",
                    name: "transaction-list",
                    component: () => import("../view/RiwayatTransaksi.vue"),
                },
                {
                    path: "/buat-transaksi",
                    name: "transaction-add",
                    component: () => import("../view/BuatTransaksi.vue"),
                },
                {
                    path: "/transaksi-terjeda",
                    name: "transaction-delay",
                    component: () => import("../view/TransaksiTerjeda.vue"),
                },
                {
                    path: "/daftar-saler",
                    name: "saler-list",
                    component: () => import("../view/DaftarSaler.vue"),
                },
                {
                    path: "/tambah-saler",
                    name: "saler-add",
                    component: () => import("../view/TambahSaler.vue"),
                },
                {
                    path: "/daftar-depo",
                    name: "depo-list",
                    component: () => import("../view/DaftarDepo.vue"),
                },
                {
                    path: "/tambah-depo",
                    name: "depo-add",
                    component: () => import("../view/TambahDepo.vue"),
                },
            ],
        },
        // {
        //     path: "/coming-soon",
        //     name: "coming-soon",
        //     component: () => import("../views/pages/dev/ComingSoon.vue"),
        // },
        // {
        //     path: "/login",
        //     name: "login",
        //     component: () => import("../views/auth/Login.vue"),
        // },
        // {
        //     path: "/unauthorize",
        //     name: "unauthorize",
        //     component: () => import("../views/auth/Unauthorize.vue"),
        // },
    ],
});

export default router;
