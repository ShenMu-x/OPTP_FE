<script lang="ts">
import UserInfo from '../components/UserInfo.vue';
import FooterVue from '../components/Footer.vue';
export default {
    components: {
        UserInfo,
        FooterVue,
    }
}
</script>

<template>
    <div class="homeCt">
        <UserInfo />
        <FooterVue />
    </div>
</template>

<style lang="less" scoped>
.homeCt {
    background-color: #f0f3f7;
    position: absolute;
    height: 900px;
    left: 80px;
    right: 80px;
    top: 16px;
    border-radius: 5px;
}
</style>