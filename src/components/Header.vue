<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SCNULogo from '../assets/scnulogo.png';
import { HomeFilled, ArrowLeftBold, Avatar } from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();

const toHome = (command: string | number | object) => {
    if(command === 'toHome') {
        // router.replace('/user');
    } else if(command === 'logout') {
        // console.log('logout')
    }
}

</script>

<template>
    <div class="container">
        <div class="logo">
            <img :src="SCNULogo">
        </div>
        <div class="title">在线编程教学平台</div>
        <el-dropdown @command="toHome">
            <span  class="el-dropdown-link">
                <Avatar class="avatar"/>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="HomeFilled" command="toHome">我的主页</el-dropdown-item>
                    <el-dropdown-item :icon="ArrowLeftBold" command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <div class="user"  @mouseover="showPanel" @mouseout="closePanel">
            
            <div class="userPanel" v-show="isShowPanel">
                <template v-for="item in userPanel" :key="item.key">
                    <div class="option">{{item.title}}</div>
                </template>
            </div>
        </div> -->
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

.logo{
    margin-right: 40px;
    img {
        height: 50px;
        margin-top: 5px;
    }
}

.title {
    flex: 1;
    margin-right: 10px;
    color: #FFF;
    text-align: left;
    font-size: 20px;
    letter-spacing: 5px;
}

.avatar {
    height: 32px;
    width: 32px;
    color: #FFF;
}
</style>
