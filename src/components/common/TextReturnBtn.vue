<script lang="ts" setup>
import { DArrowLeft } from '@element-plus/icons-vue';
import { useDirect } from '@/utils/helper';
const { routerBack } = useDirect();
</script>

<template>
    <el-button color="#002D54" class="textReturnBtn" :icon="DArrowLeft" @click="routerBack()" type="text">
        <slot>返回</slot>
    </el-button>
</template>

<style lang="less" scoped>
.textReturnBtn {
    margin-top: 20px;
    font-size: 18px;
    justify-self: flex-start;
    width: fit-content;
    color: #002D54;
    &:hover {
        cursor: pointer;
        color: rgb(51, 87, 118);;
    }
}
</style>