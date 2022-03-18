<script lang="ts" setup>
import FooterVue from '@/components/common/Footer.vue';
import HeaderVue from '@/components/common/Header.vue';
import { provideUser } from './logic';
provideUser();
</script>

<template>
    <div class="layout">
        <HeaderVue />
        <main class="layoutMain">
            <router-view />
        </main>
        <FooterVue />
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