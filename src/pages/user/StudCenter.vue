<script lang="ts" setup>
import { ref } from 'vue';
import UserInfo from './comp/UserInfo.vue';
import CodingTimeTable from './comp/CodingTimeTable.vue';
import CourseList from '@/components/course/CourseList.vue';
import LabList from '@/components/lab/LabList.vue';
import {
    getUserInfoByTk,
    getCoursesAll,
    getCoursesStudy,
    getMyAttend
} from '@/utils/services';

const activeName = ref('coursesCreated');
const handleTabClick = (obj: any) => {
    console.log(obj?.props?.label);
};

getUserInfoByTk()
getMyAttend({
    pageCurrent: 1,
    pageSize: 20,
    courseId: 2
})
</script>

<template>
    <div class="userCenterCt">
        <div class="pageTitle">我的主页</div>
        <UserInfo class="infoCard" />
        <div class="stats">
            <div class="statTitle">我的编码时长统计（min）</div>
            <CodingTimeTable />
        </div>
        <div class="coursesInfo">
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="我的课程" name="coursesCreated">
                    <CourseList :fetchData="getCoursesStudy" />
                </el-tab-pane>
                <el-tab-pane label="搜索课程" name="coursesJoin">
                    <div>放一个搜索框</div>
                    <CourseList :fetchData="getCoursesAll" />
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="experiments">
                    <LabList />
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

.infoCard,
.stats,
.coursesInfo {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
}
.statTitle {
    font-size: 20px;
    text-align: left;
    margin-bottom: 20px;
}
</style>