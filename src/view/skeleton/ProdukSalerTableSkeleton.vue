<template>
    <tbody>
        <tr v-for="n in rowPerPage">
            <td style="width: 16.73rem">
                <Skeleton width="70%" height="1.3rem" />
            </td>
            <td style="width: 8.44rem; height: 7.5rem;">
                <Skeleton width="4rem" height="5rem" />
            </td>
            <td style="width: 7.37rem;">
                <Skeleton width="50%" height="1.7rem" />
            </td>
            <td style="width: 9.57rem;">
                <Skeleton width="50%" height="1.7rem" />
            </td>
            <td style="width: 10.84rem;">
                <Skeleton width="40%" height="1.7rem" />
            </td>
            <td style="width: 9.5rem;">
                <Skeleton width="50%" height="1.7rem" />
            </td>
            <td style="width: 13.1rem;">
                <Skeleton width="70%" height="1.3rem" />
            </td>
            <td>
                <Skeleton width="70%" height="1.3rem" />
            </td>
        </tr>
    </tbody>
</template>

<script setup>
const props = defineProps({
    rowPerPage: null,
});
</script>
