<template>
    <Dialog
        v-model:visible="view"
        header="Mohon Diperhatikan"
        modal
        :style="{ width: '35rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '100vw' }"
    >
        <div class="msg">{{ msg }}</div>
        <div class="btn">
            <Button label="Kembali" @click="router.go(-1)" />
        </div>
    </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const view = ref(true);
const props = defineProps({
    msg: null,
});
</script>

<style scoped lang="scss">
.msg {
    color: var(--text-color-secondary);
}
.btn {
    margin-top: 1.5rem;
}
</style>
