<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
import { reactive } from 'vue-demi';
import { userInfoType } from '@/type';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Avatar from '@/components/user/Avatar.vue';

const router = useRouter();
const store = useStore();

// 从用户存储中取出
const userInfo: userInfoType = reactive(store.state.user);

const handlerEditInfo = () => {
    // 跳转修改用户信息页
    router.push('./editinfo');
}

const handlerLogOut = () => {
    // 清除token，跳转登录
};
</script>

<template>
    <div class="userInfoCt">
        <Avatar type="large"/>
        <div class="info">
            <div class="username">
                {{userInfo.userName}}
                <el-button type="text" :icon="Edit" class="editBtn" @click="handlerEditInfo">编辑个人信息</el-button>  
            </div>
            <div>
                学号: {{userInfo.uid}}
            </div>
        </div>
        <el-button type="primary" @click="handlerLogOut">退出登录</el-button>
    </div>
</template>

<style lang="less" scoped>
.userInfoCt{
    display: flex;
    align-items: center;
}

.username{
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
}

.info {
    height: 80px;
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>