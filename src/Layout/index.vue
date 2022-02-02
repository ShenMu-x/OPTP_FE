<script lang="ts" setup>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
</script>


<template>
    <div class="layout">
        <Header />
        <main class="layoutMain"><router-view /></main>
        <Footer />
    </div>
</template>

<style lang="less" scoped>
.layout {
    display: flex;
    flex-direction: column;
    background-color: #e9eef3;
    min-height: 100%;

    .layoutMain {
        position: relative;
    }
}


</style>