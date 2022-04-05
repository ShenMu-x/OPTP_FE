<script setup lang="ts">
import SCNULogo from '@/assets/scnulogo.png';
</script>

<template>
    <div class="container">
        <div class="logo">
            <img :src="SCNULogo" />
        </div>
        <div class="title">在线编程教学平台</div>
    </div>
</template>

<style scoped lang="less">
.container {
    height: 60px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: #002d54;
}
.logo {
    margin-right: 40px;
    img {
        height: 50px;
        margin-top: 5px;
    }
}
.title {
    flex: 1;
    margin-right: 10px;
    color: #fff;
    text-align: left;
    font-size: 20px;
    letter-spacing: 5px;
}
</style>
