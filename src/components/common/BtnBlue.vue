<script lang="ts" setup>
const props = defineProps<{
    size?: 'default' | 'large'
}>()
</script>


<template>
    <el-button type="primary" color="#002D54" :size="props.size ?? 'default'" style="color: #fff">
        <slot>详情</slot>
    </el-button>
</template>