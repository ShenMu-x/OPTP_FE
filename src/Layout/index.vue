<script lang="ts" setup>
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
</script>


<template>
    <div class="layout">
        <Header />
        <main><router-view /></main>
        <Footer />
    </div>
</template>

<style lang="less" scoped>
.layout {
    display: flex;
    flex-direction: column;
}
</style>