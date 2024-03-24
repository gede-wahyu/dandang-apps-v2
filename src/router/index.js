import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layout/AppLayout.vue";
import AuthLayout from "../layout/auth/AuthLayout.vue";
import { useAuthStore } from "../store/AuthStore";

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
                    component: () => import("../view/dashboard/Dashboard.vue"),
                },
                {
                    path: "/daftar-produk-sales",
                    name: "sales-product-list",
                    component: () => import("../view/ProdukSales.vue"),
                },
                {
                    path: "/daftar-produk",
                    name: "product-list",
                    component: () => import("../view/DaftarProduk.vue"),
                },
                {
                    path: "/tambah-produk",
                    name: "product-add",
                    component: () => import("../view/TambahProduk.vue"),
                },
                {
                    path: "/riwayat-transaksi",
                    name: "transaction-list",
                    component: () => import("../view/RiwayatTransaksi.vue"),
                },
                {
                    path: "/detail-transaksi/:id",
                    name: "transaction-detail",
                    component: () => import("../view/DetailTransaksi.vue"),
                },
                {
                    path: "/invoice/:id",
                    name: "invoice",
                    component: () => import("../view/Invoice.vue"),
                },
                {
                    path: "/buat-transaksi",
                    name: "transaction-add",
                    component: () => import("../view/BuatTransaksi.vue"),
                },
                {
                    path: "/transaksi-tertunda",
                    name: "transaction-delay",
                    component: () => import("../view/TransaksiTerjeda.vue"),
                },
                {
                    path: "/laporan-pendapatan",
                    name: "report-income",
                    component: () => import("../view/Pendapatan.vue"),
                },
                {
                    path: "/laporan-laba-rugi",
                    name: "report-pnl",
                    component: () => import("../view/LabaRugi.vue"),
                },
                {
                    path: "/buat-distribusi",
                    name: "distribution-add",
                    component: () =>
                        import("../view/distribution/BuatDistribusi.vue"),
                },
                {
                    path: "/distribusi-saler",
                    name: "distribution-saler",
                    component: () =>
                        import("../view/distribution/DistribusiSaler.vue"),
                },
                {
                    path: "/distribusi-pelanggan",
                    name: "distribution-customer",
                    component: () =>
                        import("../view/distribution/DistribusiPelanggan.vue"),
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
                {
                    path: "/pengguna",
                    name: "user",
                    component: () => import("../view/user/Pengguna.vue"),
                },
                {
                    path: "/daftar-pelanggan",
                    name: "cust-list",
                    component: () => import("../view/DaftarPelanggan.vue"),
                },
            ],
        },
        {
            path: "/auth",
            component: AuthLayout,
            children: [
                {
                    path: "/login",
                    name: "login",
                    component: () => import("../view/auth/Login.vue"),
                },
                {
                    path: "/unauthorize",
                    name: "unauthorize",
                    component: () => import("../view/auth/Unauthorize.vue"),
                },
                {
                    path: "/:pathMatch(.*)*",
                    name: "not-found",
                    component: () => import("../view/auth/NotFound.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    let isAuthenticated = authStore.isAunthenticated();

    if (!isAuthenticated && to.name !== "login") {
        next({ name: "login" });
    } else if (isAuthenticated && to.name === "login") {
        next({ name: "dashboard" });
    } else if (isAuthenticated && !authStore.isAuthorize(to.name)) {
        next({ name: "unauthorize" });
    } else {
        next();
    }
});

export default router;
