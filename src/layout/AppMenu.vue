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
            {
                label: "transaksi tertunda",
                icon: "other_admission",
                to: { name: "transaction-delay" },
            },
        ],
    },
    {
        label: "Saler",
        items: [
            {
                label: "daftar saler",
                icon: "group",
                to: { name: "saler-list" },
            },
            {
                label: "tambah saler",
                icon: "person_add",
                to: { name: "saler-add" },
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
            },
            {
                label: "tambah depo",
                icon: "add_business",
                to: { name: "depo-add" },
            },
        ],
    },
]);

//
</script>
