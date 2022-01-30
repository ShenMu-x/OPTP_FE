<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
import { reactive } from 'vue-demi';
import { userInfoType } from '@/type';
import { useRouter } from 'vue-router';

const router = useRouter();

// 从用户存储中取出
const userInfo: userInfoType = reactive({
    email: 'xxx@111.com',
    userName: '用户名',
    uid: '123456789'
})

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
        <div class="avatar"></div>
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
.avatar{
    height: 100px;
    width: 100px;
    background-color: #9f9f9f;
}
.username{
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
}

.info {
    height: 100px;
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>