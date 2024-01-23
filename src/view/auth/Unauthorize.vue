<template>
    <div class="content-wrapper">
        <div class="d-card">
            <div class="header">
                <span class="material-symbols-outlined"> warning </span>
                <h3>Oopss!</h3>
            </div>
            <div class="main">
                <p>
                    Percobaan akses tanpa otorisasi. Silakan hubungi admin untuk
                    mengakses.
                </p>
            </div>
            <div class="footer">
                <Button
                    icon="home"
                    label="Kembali"
                    @click="router.push({ name: 'dashboard' })"
                    style="background-color: #34d399"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    h5 {
        margin: 0;
    }

    span {
        font-size: 3rem;
        color: var(--color-danger);
    }
}
.main {
    padding: 1rem 1rem 1.5rem 1rem;
    text-align: center;
    p {
        color: var(--text-color-secondary);
    }
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;

    button {
        padding: 0.75rem;
    }
}
</style>
