<script lang="ts" setup>
import { ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { getConfig, ConfigVal } from '@/utils/storage';

const url = ref(getConfig(ConfigVal.IdeUrl) || "");
// url.value = 'http://175.178.37.132:31732';
</script>

<template>
    <div>
        <iframe :src="url" frameborder="0" v-if="url" class="iFrameCt"></iframe>
        <div class="errorCt" v-else>
            系统出错，请稍后再试
            <BtnBlue>点击返回上一级</BtnBlue>
        </div>
    </div>
</template>

<style lang="less" scoped>
.iFrameCt {
    height: calc(100vh - 60px - 30px);
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