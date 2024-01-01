<template>
    <div class="content-wrapper">
        <div class="d-card">
            <div class="header">
                <span class="material-symbols-outlined"> warning </span>
                <h5>404 Not Found</h5>
            </div>
            <div class="main">
                <p>
                    Laman yang dituju tidak dapat ditemukan. Silahkan kembali ke
                    Beranda.
                </p>
            </div>
            <div class="footer">
                <Button
                    icon="home"
                    label="Kembali"
                    @click="router.push({ name: 'dashboard' })"
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
        color: var(--color-danger);
    }
}
.main {
    padding: 1rem 0;
    text-align: center;
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
