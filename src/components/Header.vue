<script setup lang="ts">
import { ref } from 'vue';
import SCNULogo from '../assets/scnulogo.png';
import { HomeFilled, ArrowLeftBold, Avatar, AlarmClock } from '@element-plus/icons-vue';
import { isTeacher, useDirect } from '@/utils/helper';

const { directTo } = useDirect();
const commandHandler = (command: string) => {
    if (command === 'toHome') {
        directTo('/');
    } else if (command === 'logout') {
        // console.log('logout')
    } else if (command === 'attend') {
        directTo('/user_attend')
    }
}

</script>

<template>
    <div class="container">
        <div class="logo">
            <img :src="SCNULogo" />
        </div>
        <div class="title">在线编程教学平台</div>
        <el-dropdown @command="commandHandler">
            <span class="el-dropdown-link">
                <Avatar class="avatar" />
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="HomeFilled" command="toHome">我的主页</el-dropdown-item>
                    <el-dropdown-item :icon="AlarmClock" command="attend" v-if="!isTeacher()">我的签到</el-dropdown-item>
                    <el-dropdown-item :icon="ArrowLeftBold" command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style scoped lang="less">
.container {
    height: 60px;
    width:  100%;
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
.avatar {
    height: 32px;
    width: 32px;
    color: #fff;
}
</style>
