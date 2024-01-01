<template>
    <div class="profile-card">
        <div class="profile-card-img">
            <div class="profile-img">
                <img
                    v-if="authStore.auth.user && authStore.auth.user.profile"
                    :src="`https://omahit.my.id/${authStore.auth.user.profile}`"
                    :alt="authStore.auth.user.nama"
                />
                <div class="profile-img-none" v-else>
                    <span class="material-symbols-outlined"> person </span>
                </div>
            </div>
        </div>
        <div class="profile-card-data">
            <span class="profile-name">
                {{
                    authStore.auth.user ? authStore.auth.user.nama : "Username"
                }}
            </span>
            <span class="profile-role">
                {{ authStore.auth.role ? authStore.auth.role.role : "no-role" }}
            </span>
            <span class="profile-username">
                {{
                    authStore.auth.user && authStore.auth.user.username
                        ? `@${authStore.auth.user.username}`
                        : authStore.auth.user && authStore.auth.user.email
                        ? authStore.auth.user.email
                        : "@username"
                }}
            </span>
        </div>
        <div class="profile-card-button">
            <Button
                label="Lihat Profil"
                @click="router.push({ name: 'user' })"
            />
            <Button label="Log Out" severity="danger" @click="handleLogout()" />
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from "../../store/AuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.deleteSession();
    router.push({ name: "login" });
    authStore.logout();
};

//
</script>

<style scoped lang="scss">
.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.profile-card-img {
    width: 4rem;
    height: 4rem;
    .profile-img,
    .profile-img-none {
        width: 100%;
        height: 100%;
        background-color: var(--surface-ground);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .profile-img-none {
        span {
            font-size: 3rem;
        }
    }
}
.profile-card-data {
    padding: 0.5rem 0 1.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    .profile-name {
        text-transform: capitalize;
    }
    .profile-role {
        text-transform: uppercase;
        color: var(--text-color-secondary);
        font-size: 0.9rem;
    }
    .profile-username {
        color: var(--text-color-secondary);
    }
}
.profile-card-button {
    display: flex;
    gap: 0.5rem;
}
</style>
