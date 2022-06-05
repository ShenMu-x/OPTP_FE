<script lang="ts" setup>
import { ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { useDirect, useIsLabFinish } from '@/utils/helper';
import { useGetIDEAndCheckBeat } from './logic';

const isFinish = ref(useIsLabFinish());
const { routerBack } = useDirect();
const refEl = ref();
const { url, isLoading } = useGetIDEAndCheckBeat(refEl);
</script>

<template>
    <div class="ct">
        <div class="ctr">
            <div class="ctrTitle">选项</div>
            <el-button @click="routerBack" class="closeBtn">返回</el-button>
            <div class="finishTip" v-if="isFinish">实验已结束，无法再进行修改</div>
        </div>
        <iframe :src="url" frameborder="0" v-if="!isLoading && url" class="iFrameCt"></iframe>
        <div class="errorCt" v-else-if="isLoading" ref="refEl">加载中</div>
        <div class="errorCt" v-else>
            系统出错，请稍后再试
            <BtnBlue @click="routerBack">点击返回上一级</BtnBlue>
        </div>
    </div>
</template>

<style lang="less" scoped>
@ctr-height: 60px;

.ct {
    display: flex;
    flex-direction: column;
}

.ctr {
    height: @ctr-height;
    display: flex;
    align-items: center;
    background-color: #3e3e3e;
    color: #fff;
    border-bottom: 1px solid #fff;
}

.ctrTitle {
    height: @ctr-height;
    line-height: @ctr-height;
    width: 90px;
    border-right: 1px solid #fff;
    margin-right: 20px;
}

.closeBtn {
    margin-right: 20px;
}

.finishTip {
    font-weight: bold;
}

.iFrameCt {
    height: calc(100vh - @ctr-height);
    width: 100%;
}

.errorCt {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0 30%;
}
</style>