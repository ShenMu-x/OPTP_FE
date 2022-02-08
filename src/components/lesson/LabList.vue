<script lang="ts" setup>
import { reactive } from 'vue-demi';
import Lab from './Lab.vue';
const list = reactive([{
    id: 1
}, {
    id: 2
}])
</script>

<template>
    <Lab v-for="lab in list" :key="lab.id"></Lab>
</template>