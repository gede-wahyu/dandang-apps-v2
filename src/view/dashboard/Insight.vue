<template>
    <div class="d-card">
        <div class="content">
            <h5>
                Halo, <span>{{ user }}</span>
            </h5>
            <p>Nilai transaksi bulanan</p>
            <h4>Rp {{ nFormatter(userSales, 1) }}</h4>
        </div>
        <div class="profile">
            <img v-if="profile" :src="profile" :alt="user" />
            <div v-else class="profile-none">
                <span class="material-symbols-outlined"> person </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "../../store/AuthStore.js";
import { useReportStore } from "../../store/ReportStore";

const authStore = useAuthStore();
const reportStore = useReportStore();
const user = ref();
const profile = ref();
const userSales = ref();

onMounted(async () => {
    await reportStore.GET__USER_SALES(authStore.auth.user.id);
    user.value = authStore.auth.user ? authStore.auth.user.name : "User";
    profile.value = authStore.auth.user ? authStore.auth.user.profile : null;
    userSales.value = reportStore.userSales;
});
watch(
    () => reportStore.filter.year,
    async () => {
        await reportStore.GET__USER_SALES(authStore.auth.user.id);
        userSales.value = reportStore.userSales;
    }
);
watch(
    () => reportStore.filter.month,
    async () => {
        await reportStore.GET__USER_SALES(authStore.auth.user.id);
        userSales.value = reportStore.userSales;
    }
);

const nFormatter = (num, digits) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " Ribu" },
        { value: 1e6, symbol: " Juta" },
        { value: 1e9, symbol: " Miliar" },
        { value: 1e12, symbol: " Triliun" },
        { value: 1e15, symbol: " Kuadriliun" },
        { value: 1e18, symbol: " Kuintiliun" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
        ? (num / item.value)
              .toFixed(digits)
              .replace(regexp, "")
              .concat(item.symbol)
        : "0";
};

//
</script>

<style scoped lang="scss">
.d-card {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    h5 span {
        text-transform: capitalize;
    }
    h4 {
        color: var(--primary);
        text-wrap: nowrap;
    }
}
.profile {
    display: flex;
    align-items: center;
    justify-content: center;
}
.profile-none {
    width: 9rem;
    height: 9rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: var(--surface-ground);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    span {
        font-size: 8rem;
        color: var(--icon-color-secondary);
    }
}

@media screen and (max-width: 1200px) {
    .profile-none {
        width: 5rem;
        height: 5rem;
        span {
            font-size: 3rem;
        }
    }
}
</style>
