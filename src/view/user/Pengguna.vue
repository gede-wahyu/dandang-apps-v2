<template>
    <div class="user-banner">
        <div class="user-banner-bg"></div>
        <div class="user-profile">
            <div class="user-profile-img">
                <img
                    v-if="authStore.auth.user && authStore.auth.user.profile"
                    :src="`https://omahit.my.id/${authStore.auth.user.profile}`"
                    :alt="authStore.auth.user.nama"
                />
                <div class="user-profile-none" v-else>
                    <span class="material-symbols-outlined"> person </span>
                </div>
            </div>
            <div class="user-profile-info">
                <h4>
                    {{
                        authStore.auth.user
                            ? authStore.auth.user.nama
                            : "Username"
                    }}
                </h4>
                <span>{{
                    authStore.auth.acc ? authStore.auth.acc : "@username"
                }}</span>
            </div>
            <div class="user-profile-button">
                <Button label="Kartu Profil" />
            </div>
        </div>
    </div>
    <div class="user-settings">
        <div class="user-setting-group">
            <div class="user-setting-group-title">
                <h6>Informasi Pribadi</h6>
                <span>Perbarui foto profil dan detail personal.</span>
            </div>
            <div class="user-setting-group-card d-card">
                <FormPersonal />
            </div>
        </div>
        <div class="user-setting-group">
            <div class="user-setting-group-title">
                <h6>Informasi Akun</h6>
                <span>Perbarui detail akun.</span>
            </div>
            <div class="user-setting-group-card d-card">
                <FormUsername />
            </div>
        </div>
        <div class="user-setting-group">
            <div class="user-setting-group-title"></div>
            <div class="user-setting-group-card d-card">
                <FormPassword />
            </div>
        </div>
    </div>
</template>

<script setup>
import FormPersonal from "./FormPersonal.vue";
import FormUsername from "./FormUsername.vue";
import FormPassword from "./FormPassword.vue";
import { useAuthStore } from "../../store/AuthStore";

const authStore = useAuthStore();

//
</script>

<style scoped lang="scss">
.user-banner {
    display: flex;
    margin-bottom: 10rem;
    position: relative;

    .user-banner-bg {
        width: 100%;
        height: 8rem;
        display: flex;
        background-color: var(--primary);
        border-radius: var(--border-radius);
    }

    .user-profile {
        width: calc(100% - 4rem);
        display: flex;
        gap: 1rem;
        position: absolute;
        top: 5rem;
        left: 4rem;

        .user-profile-img {
            width: 9rem;
            height: 9rem;
            border-radius: 50%;
            overflow: hidden;
            background-color: var(--surface-ground);
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            .user-profile-none {
                width: 8rem;
                height: 8rem;
                border-radius: 50%;
                background-color: var(--surface-card);
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    font-size: 7rem;
                }
            }
        }

        .user-profile-info {
            margin-top: 3.5rem;
            h4 {
                margin: 0 0 0.5rem 0;
                text-transform: capitalize;
            }
            span {
                color: var(--text-color-secondary);
            }
        }

        .user-profile-button {
            width: auto;
            margin: 4rem 1.5rem 0 auto;
        }
    }
}
.user-settings {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .user-setting-group {
        display: flex;
        flex-direction: row;
        gap: 1rem;

        .user-setting-group-title {
            width: 25%;
            span {
                color: var(--text-color-secondary);
            }
        }
    }
    .user-setting-group-card {
        width: 75%;
        padding: 2rem;
    }
}

@media screen and (max-width: 640px) {
    .user-banner {
        margin-bottom: 16rem;
        .user-profile {
            width: calc(100% - 1rem);
            top: 4rem;
            left: 1rem;
            flex-direction: column;
            gap: 0;

            .user-profile-info {
                margin: 0 0 0.5rem 0;
            }
            .user-profile-button {
                margin: 0;
            }
        }
    }

    .user-settings {
        .user-setting-group {
            flex-direction: column;

            .user-setting-group-title,
            .user-setting-group-card {
                width: 100%;
                h6 {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }
}
</style>
