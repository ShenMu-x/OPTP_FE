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
        <div class="lessonsInfo">
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="已创建课程" name="coursesCreated">
                    <LessonList />
                </el-tab-pane>
                <el-tab-pane label="已加入课程" name="coursesJoin">
                    <LessonList />
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="experiments">
                    <LessonList />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style lang="less" scoped>
.userCenterCt {
    display: flex;
    flex-direction: column;
    padding: 35px 80px;
    margin-bottom: 30px;
}

.pageTitle {
    font-size: 25px;
    align-self: flex-start;
}

.userInfo, .codeStatistics, .lessonsInfo {
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
import CodingTimeTable from './comp/CodingTimeTable.vue';
import { ref, reactive } from 'vue';
import LessonList from './comp/LessonList.vue';
const handleTabClick = (obj: any) => {
    console.log(obj?.props?.label);
}
const activeName = ref('coursesCreated')
</script>