<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { HomeFilled, ArrowRightBold, Avatar, AlarmClock } from '@element-plus/icons-vue';
import SCNULogo from '../../assets/scnulogo.png';
import { isTeacher, isStudent, useDirect, logout } from '@/utils/helper';
import { getMyAttendRecordsInProgress } from '@/utils/services';

const { routerToHome, routerToStudentAttend } = useDirect();
const isUserStudent = isStudent();
const isUserTeacher = isTeacher();
const hasAttendInProgress = ref(false);
const cancleAttendTip = () => {
    hasAttendInProgress.value = false;
};
const showAttendTip = () => {
    hasAttendInProgress.value = true;
};
const commandHandler = (command: string) => {
    if (command === 'toHome') routerToHome('direct');
    else if (command === 'logout') logout();
    else if (command === 'attend') routerToStudentAttend('direct');
};
let intreval: any = null;
const requestAttend = () => {
    getMyAttendRecordsInProgress().then((res) => {
        if (res.code === 0 && res?.data?.length) showAttendTip();
        else cancleAttendTip();
    });
};
if (isUserStudent) {
    requestAttend();
    intreval = setInterval(requestAttend, 4 * 1000); // 轮询请求签到信息
}

onUnmounted(() => {
    intreval && clearInterval(intreval);
});
</script>

<template>
    <div class="container">
        <div class="logo" @click="() => routerToHome('direct')">
            <img :src="SCNULogo" />
        </div>
        <div class="title">在线编程教学平台</div>
        <el-dropdown @command="commandHandler">
            <span class="avatarCt">
                <Avatar class="avatar" />
                <span class="avatarPoint" v-show="hasAttendInProgress"></span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        :icon="HomeFilled"
                        command="toHome"
                        v-if="isUserTeacher || isUserStudent"
                    >
                        我的主页
                    </el-dropdown-item>
                    <el-dropdown-item :icon="AlarmClock" command="attend" v-if="isUserStudent">
                        <span
                            :class="['attendCt', { point: hasAttendInProgress }]"
                            @click="cancleAttendTip"
                        >
                            我的签到
                        </span>
                    </el-dropdown-item>
                    <el-dropdown-item :icon="ArrowRightBold" command="logout">
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
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
    &:hover {
        cursor: pointer;
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

.attendCt {
    position: relative;
}

.avatarCt {
    display: inline-block;
    height: 36px;
    width: 36px;
    position: relative;
}

.avatarPoint {
    position: absolute;
    top: 0;
    right: 0;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: orange;
}

.avatar {
    height: 32px;
    width: 32px;
    color: #fff;
}

.point {
    &::after {
        content: '';
        display: inline-block;
        position: relative;
        left: 4px;
        bottom: 3px;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: orange;
    }
}
</style>
