<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useDirect } from '@/utils/helper';
import { getConfig, ConfigVal } from '@/utils/storage';
import { useWs } from './init';

const { routerBack } = useDirect();

// 获取url
const url = ref(getConfig(ConfigVal.IdeUrl) || "");
// url.value = 'http://175.178.37.132:31732';

const closeIDE = () => {
    alert('to close ide')
}


onMounted(() => {
    useWs()
})
</script>

<template>
    <div class="ct">
        <div class="ctr">
            <div class="ctrTitle">选项</div>
            <el-button class="closeBtn" @click="closeIDE">实验结束，关闭IDE</el-button>
            <el-button @click="routerBack">返回上一页</el-button>
        </div>
        <iframe :src="url" frameborder="0" v-if="url" class="iFrameCt"></iframe>
        <div class="errorCt" v-else>
            系统出错，请稍后再试
            <BtnBlue>点击返回上一级</BtnBlue>
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