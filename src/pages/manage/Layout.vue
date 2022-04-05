<script lang="ts" setup>
import FooterVue from '@/components/common/Footer.vue';
import HeaderVue from './Header.vue';
</script>

<template>
    <div class="layout">
        <HeaderVue />
        <main class="layoutMain">
            <slot></slot>
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