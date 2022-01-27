<template>
    <div class="userCenterCt">
        <div class="pageTitle">
            我的主页
        </div>
        <div class="userInfo">
            <UserInfo />
        </div>
        <div class="codeStatistics">
            <div class="statTitle">我的编码时长统计（min）</div> 
            <CodingTimeTable />
        </div>
        <div class="courseInfo">
            面包屑+分页
        </div>
    </div>
</template>

<style lang="less" scoped>
.userCenterCt {
    display: flex;
    flex-direction: column;
    padding: 35px 80px;
}

.pageTitle {
    font-size: 25px;
    align-self: flex-start;
}

.userInfo, .codeStatistics, .courseInfo {
    background-color: #fff;
    margin-top: 20px;
     padding: 20px;
}
.statTitle {
    font-size: 20px;
    text-align: left;
    margin-bottom: 10px;
}

</style>

<script lang="ts" setup>
import UserInfo from './UserInfo.vue';
import CodingTimeTable from './CodingTimeTable.vue';
</script>