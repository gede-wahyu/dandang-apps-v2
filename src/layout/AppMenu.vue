<template>
    <ul class="layout-menu">
        <template v-for="(item, index) in model">
            <AppMenuItem :item="item" :index="index" />
        </template>
    </ul>
</template>

<script setup>
import { ref } from "vue";
import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
    {
        label: "utama",
        items: [
            {
                label: "beranda",
                icon: "home",
                to: { name: "dashboard" },
            },
        ],
    },
    {
        label: "produk",
        items: [
            // {
            //     label: "produk sales",
            //     icon: "list_alt",
            //     to: { name: "sales-product-list" },
            //     block: true,
            // },
            {
                label: "daftar produk",
                icon: "dataset",
                to: { name: "product-list" },
            },
            {
                label: "tambah produk",
                icon: "add_box",
                to: { name: "product-add" },
                block: true,
            },
        ],
    },
    {
        label: "transaksi",
        items: [
            {
                label: "riwayat transaksi",
                icon: "overview",
                to: { name: "transaction-list" },
            },
            {
                label: "buat transaksi",
                icon: "add_notes",
                to: { name: "transaction-add" },
            },
            // {
            //     label: "transaksi tertunda",
            //     icon: "other_admission",
            //     to: { name: "transaction-delay" },
            //     block: true,
            // },
        ],
    },
    {
        label: "distribusi",
        items: [
            {
                label: "buat distribusi",
                icon: "box_add",
                to: { name: "distribution-add" },
                block: true,
            },
            {
                label: "distribusi sales",
                icon: "person_play",
                to: { name: "distribution-saler" },
                block: true,
            },
            // {
            //     label: "distribusi pelanggan",
            //     icon: "for_you",
            //     to: { name: "distribution-customer" },
            //     block: true,
            // },
        ],
    },
    {
        label: "laporan",
        items: [
            {
                label: "pendapatan",
                icon: "finance_mode",
                to: { name: "report-income" },
            },
            // {
            //     label: "laba rugi",
            //     icon: "currency_exchange",
            //     to: { name: "report-pnl" },
            //     block: true,
            // },
        ],
    },
    {
        label: "sales",
        items: [
            {
                label: "daftar sales",
                icon: "group",
                to: { name: "saler-list" },
                block: true,
            },
            {
                label: "tambah sales",
                icon: "person_add",
                to: { name: "saler-add" },
                block: true,
            },
        ],
    },
    {
        label: "depo",
        items: [
            {
                label: "daftar depo",
                icon: "store",
                to: { name: "depo-list" },
                block: true,
            },
            {
                label: "tambah depo",
                icon: "add_business",
                to: { name: "depo-add" },
                block: true,
            },
        ],
    },
    {
        label: "pelanggan",
        items: [
            {
                label: "daftar pelanggan",
                icon: "productivity",
                to: { name: "cust-list" },
            },
        ],
    },
]);

//
</script>
