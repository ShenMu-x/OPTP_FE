<script lang="ts" setup>

    const clickHandler = () => {
        // $router.replace('./login');
    }
</script>

<template>
    <div class="userInfoCt">
        <div class="avatar"></div>
        <div class="username">userName</div>
        <el-button type="primary" size="large" @click="clickHandler">登录</el-button>
    </div>
</template>

<style lang="less" scoped>
.userInfoCt{
    height: 120px;
    padding: 0 60px;
    border-bottom: 1px solid #3e3e3e;
    display: flex;
    align-items: center;
}
.avatar{
    height: 42px;
    width: 42px;
    background-color: #9f9f9f;
}
.username{
    font-size: 14px;
    font-weight: 500;
    margin-left: 20px;
    margin-right: auto;
}
</style>