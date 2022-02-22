<script lang="ts" setup>
import { ref } from 'vue';
import { Refresh } from '@element-plus/icons-vue'
const props = defineProps<{
    isLoding?: boolean
}>();

const emits = defineEmits(['reload']);
const clickHandler = () => {
    emits('reload');
}

</script>

<template>
    <el-button v-show="props.isLoding" loading>刷新</el-button>
    <el-button v-show="!props.isLoding" :icon="Refresh" @click="clickHandler">刷新</el-button>
</template>