<template>
    <tbody>
        <tr v-for="n in transactions">
            <td style="width: 13rem">
                <Skeleton
                    width="50%"
                    height="1.3rem"
                    style="margin-bottom: 0.5rem"
                />
                <Skeleton width="100%" height="1.3rem" />
            </td>
            <td style="width: 9.9rem">
                <Skeleton width="80%" height="1.3rem" />
            </td>
            <td style="width: 8.5rem">
                <Skeleton
                    width="50%"
                    height="1.3rem"
                    style="margin-bottom: 0.5rem"
                />
                <Skeleton width="70%" height="1.3rem" />
            </td>
            <td style="width: 8.5rem">
                <Skeleton width="60%" height="1.3rem" />
            </td>
            <td style="width: 12.01rem">
                <span><Skeleton width="80%" height="1.3rem" /></span>
            </td>
            <td style="width: 7.66rem">
                <span>
                    <Skeleton width="100%" height="1.3rem" />
                </span>
            </td>
            <td style="width: 7.65rem">
                <span>
                    <Skeleton width="100%" height="1.3rem" />
                </span>
            </td>
            <td style="width: 14.8rem">
                <span>
                    <Skeleton width="60%" height="1.3rem" />
                </span>
            </td>
            <td>
                <div class="flex gap-0">
                    <Button icon="search" />
                    <Button icon="edit" severity="warning" />
                </div>
            </td>
        </tr>
    </tbody>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    rowPerPage: null,
});
const transactions = ref(props.rowPerPage);

//
</script>
