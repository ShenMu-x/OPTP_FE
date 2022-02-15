<script lang="ts" setup>
import { reactive } from 'vue-demi';
import Lab from './Lab.vue';
import { labsType } from '@/type'

const props = defineProps<{
    labList: labsType
}>();

const list = reactive([{
    id: 1
}, {
    id: 2
}])
</script>

<template>
    <Lab v-for="lab in props.labList" :key="lab.labId" :lab-info="lab"></Lab>
</template>