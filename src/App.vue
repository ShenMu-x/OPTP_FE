<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import FooterVue from './components/Footer.vue';
defineProps<{ msg?: string }>();

</script>

<template>
    <div class="bg-img"></div>
    <router-view></router-view>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    height: 100%;
    width: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>

<style lang="less" scoped>
.bg-img{
    height: 110%; // 100% 图像存在白边
    width: 110%;
    position: fixed;
    transform: translate(-5%, -5%);
    z-index: -2;
    background: url('./assets/scnuBg.jpg') no-repeat center center;
    filter:blur(5px);

}
</style>
