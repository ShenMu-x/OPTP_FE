<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
</script>

<template>
    <div class="userInfoCt">
        <div class="avatar"></div>
        <div class="info">
            <div class="username">
                userName
                <el-button type="text" :icon="Edit" class="editBtn">编辑个人信息</el-button>  
            </div>
            <div>
                学号：2000000000
            </div>
        </div>
        <el-button type="primary">退出登录</el-button>
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