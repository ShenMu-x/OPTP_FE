<script lang="ts" setup>
import { useDirect } from '@/utils/helper';
const { routerBack, routerToHome } = useDirect();
const redirectToHome = () => routerToHome('redirect');
</script>
<template>
    <div class="ct">
        <div class="code">404</div>
        <div class="text">当前页面无法访问</div>
        <div class="buttons">
            <el-button @click="routerBack">返回上一页</el-button>
            <el-button @click="redirectToHome">返回主页</el-button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ct {
    height: calc(100vh - 60px - 30px);
    background-color: #002d54;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.code {
    color: #fff;
    font-size: 160px;
    letter-spacing: 0.1em;
}

.text {
    color: #fff;
    font-size: 20px;
    letter-spacing: 0.1em;
}

.buttons {
    margin: 30px 0;
}
</style>