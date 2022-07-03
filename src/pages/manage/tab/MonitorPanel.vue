<script lang="ts" setup>
import { ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { useDirect, useLoader } from '@/utils/helper';
import { fetchMonitorUrl } from '@/utils/services';

const { routerBack } = useDirect();
const refEl = ref();
const url = ref('');
fetchMonitorUrl().then((res) => {
    if (res.code === 0) {
        url.value = res.data?.url || '';
    }
});
const { isLoading } = useLoader(refEl, true);
</script>

<template>
    <div class="ct">
        <iframe :src="url" frameborder="0" v-if="!isLoading && url" class="iFrameCt"></iframe>
        <div class="errorCt" v-else-if="isLoading" ref="refEl">加载中</div>
        <div class="errorCt" v-else>
            系统出错，请稍后再试
            <BtnBlue @click="routerBack">点击返回上一级</BtnBlue>
        </div>
    </div>
</template>

<style lang="less" scoped>
.iFrameCt {
    height: 550px;
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