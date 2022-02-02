<template>
    <el-button class="el-btn" type="text" @click="handlerReturn" :icon="Back">返回</el-button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';
const router = useRouter();
const handlerReturn = () => {
    router.go(-1);
};
</script>

<style lang="less" scoped>
.el-btn {
    color: #3e3e3e;
    font-size: 16px;

    &:hover {
        cursor: pointer;
        color: #000;
    }
}
</style>