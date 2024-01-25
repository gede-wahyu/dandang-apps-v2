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
    <!-- ELEMENT FOR TESTING START -->
    <div
        class="d-card ELEMENT FOR TESTING"
        style="
            max-width: fit-content;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        "
    >
        <small class="d-error" style="width: 100%; text-align: center"
            >This element is only used in the development and testing stage and
            will disappear in the production stage.</small
        >
        <div
            style="
                display: flex;
                gap: 1rem;
                padding: 0.5rem 0;
                overflow-x: auto;
            "
        >
            <Button
                label="Login as Master"
                severity="danger"
                @click="LOGIN_TESTING(1001)"
                style="text-wrap: nowrap"
            />
            <Button
                label="Login as Depo"
                severity="danger"
                @click="LOGIN_TESTING(1)"
                style="text-wrap: nowrap"
            />
            <Button
                label="Login as TO"
                severity="danger"
                @click="LOGIN_TESTING(2)"
                style="text-wrap: nowrap"
            />
            <Button
                label="Login as Mobilis"
                severity="danger"
                @click="LOGIN_TESTING(3)"
                style="text-wrap: nowrap"
            />
            <Button
                label="Login as Motoris"
                severity="danger"
                @click="LOGIN_TESTING(4)"
                style="text-wrap: nowrap"
            />
            <Button
                label="Login as Driver"
                severity="danger"
                @click="LOGIN_TESTING(5)"
                style="text-wrap: nowrap"
            />
        </div>
    </div>
    <!-- ELEMENT FOR TESTING END -->
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../store/AuthStore";
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";

const FOR_TESTING = async (id) => {
    if (id === 1001)
        await authStore.POST__LOGIN("superadmin@example.com", "password123");
    if (id === 1)
        await authStore.POST__LOGIN("depo@example.com", "password123");
    if (id === 2)
        await authStore.POST__LOGIN("salesto1@example.com", "password123");
    if (id === 3)
        await authStore.POST__LOGIN("salesmobilis1@example.com", "password123");
    if (id === 4)
        await authStore.POST__LOGIN("salesmotoris1@example.com", "password123");
    if (id === 5)
        await authStore.POST__LOGIN("drrs1@example.com", "password123");
};
const LOGIN_TESTING = async (id) => {
    await FOR_TESTING(id);
    toast.add({
        severity: "success",
        summary: "Login Berhasil",
        detail: `Selamat datang ${authStore.auth.user.nama}`,
        life: 3000,
    });
    if (route.redirectedFrom) router.push({ name: route.redirectedFrom.name });
    else router.push({ name: "dashboard" });
};

const router = useRouter();
const route = useRoute();
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
    const result = await authStore.POST__LOGIN(username.value, password.value);

    if (!result.error) {
        toast.add({
            severity: "success",
            summary: "Login Berhasil",
            detail: `Selamat datang ${authStore.auth.user.name}`,
            life: 3000,
        });
        if (route.redirectedFrom)
            router.push({ name: route.redirectedFrom.name });
        else router.push({ name: "dashboard" });
    } else if (result.error && result.error === "Unauthorized") {
        toast.add({
            severity: "error",
            summary: "Login Gagal",
            detail: `Username atau password salah`,
            life: 3000,
        });
    } else {
        toast.add({
            severity: "error",
            summary: "Terjadi Kesalahan",
            detail: `Sedang terjadi kesalahan, silahkan coba beberapa saat lagi.`,
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
