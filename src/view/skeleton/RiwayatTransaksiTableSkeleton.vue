<template>
    <tbody>
        <tr v-for="n in transactions">
            <td style="width: 12.78rem">
                <Skeleton
                    width="50%"
                    height="1.3rem"
                    style="margin-bottom: 0.5rem"
                />
                <Skeleton width="100%" height="1.3rem" />
            </td>
            <td style="width: 9.75rem">
                <Skeleton width="80%" height="1.3rem" />
            </td>
            <td style="width: 8.38rem">
                <Skeleton
                    width="50%"
                    height="1.3rem"
                    style="margin-bottom: 0.5rem"
                />
                <Skeleton width="70%" height="1.3rem" />
            </td>
            <td style="width: 12.88rem">
                <Skeleton width="60%" height="1.3rem" />
            </td>
            <td style="width: 11.8rem">
                <span><Skeleton width="80%" height="1.3rem" /></span>
            </td>
            <td style="width: 7.55rem">
                <span>
                    <Skeleton width="100%" height="1.3rem" />
                </span>
            </td>
            <td style="width: 7.51rem">
                <span>
                    <Skeleton width="100%" height="1.3rem" />
                </span>
            </td>
            <td>
                <span>
                    <Skeleton width="60%" height="1.3rem" />
                </span>
            </td>
            <td><Button icon="search" /></td>
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
