<template>
    <div class="content-wrapper">
        <div class="d-card">
            <div class="login">
                <form @submit="login">
                    <div class="login-header">
                        <h5>Login</h5>
                        <span>Silahkan login untuk melanjutkan.</span>
                    </div>
                    <div class="login-main">
                        <div class="input-group">
                            <label for="username">Username / Email</label>
                            <span class="d-sideicon-set d-input-iconleft">
                                <span class="material-symbols-outlined">
                                    person
                                </span>
                                <InputText
                                    id="username"
                                    v-model="username"
                                    placeholder="Username"
                                    v-bind="usernameAttrs"
                                    style="width: 100%"
                                />
                            </span>
                            <small class="d-error">{{ errors.username }}</small>
                        </div>
                        <div class="input-group">
                            <label for="password">Password</label>
                            <span
                                class="d-sideicon-set d-input-iconleft d-input-iconright"
                                style="width: 100%"
                            >
                                <span class="material-symbols-outlined">
                                    lock
                                </span>
                                <Password
                                    input-id="password"
                                    v-model="password"
                                    placeholder="Password"
                                    v-bind="passwordAttrs"
                                    style="width: 100%"
                                    :inputStyle="{ width: '100%' }"
                                    :feedback="false"
                                    toggleMask
                                />
                            </span>
                            <small class="d-error">{{ errors.password }}</small>
                        </div>
                    </div>
                    <div class="login-footer">
                        <Button type="submit" icon="login" label="Login" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/AuthStore";
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        username: yup.string().required("Username / email wajib diisi"),
        password: yup
            .string()
            .min(6, "Minimal 6 karakter")
            .required("Password wajib diisi"),
    }),
});
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const login = handleSubmit(async () => {
    const result = await authStore.login(username.value, password.value);

    if (result.success) {
        toast.add({
            severity: "success",
            summary: "Login Berhasil",
            detail: `Selamat datang ${authStore.auth.user.nama}`,
            life: 3000,
        });
        router.push({ name: "dashboard" });
    } else {
        console.log(result);
        let msg = errors;
        if (result.message.toLowerCase() === "user not found")
            msg = "Akun tidak ditemukan!";
        else if (result.message.toLowerCase() === "invalid credentials")
            msg = "Password salah!";
        toast.add({
            severity: "error",
            summary: "Login Gagal",
            detail: msg,
            life: 3000,
        });
    }
});

//
</script>

<style scoped lang="scss">
.login {
    .login-header {
        h5 {
            margin-bottom: 0.5rem;
        }
        span {
            color: var(--text-color-secondary);
        }
    }
    .login-main {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
    }
    .login-footer {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }
}
</style>
