<script lang="ts" setup>
import { reactive, ref } from 'vue';
import UserInfo from './comp/UserInfo.vue';
import CodingTimeTable from './comp/CodingTimeTable.vue';
import LessonList from '@/components/lesson/LessonList.vue';
import LabList from '@/components/lesson/LabList.vue';
import { LessonListType, labsType } from '@/type';
import { mockLessonsData, mockLab } from './mockdata';

const activeName = ref('coursesCreated');

const mockData = reactive<LessonListType>(mockLessonsData);
const labs = reactive<labsType>(mockLab);

const handleTabClick = (obj: any) => {
    console.log(obj?.props?.label);
};

</script>

<template>
    <div class="userCenterCt">
        <div class="pageTitle">我的主页</div>
        <div class="userInfo">
            <UserInfo />
        </div>
        <div class="codeStatistics">
            <div class="statTitle">我的编码时长统计（min）</div>
            <CodingTimeTable />
        </div>
        <div class="lessonsInfo">
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="我的课程" name="coursesCreated">
                    <LessonList :lessons="mockData" />
                </el-tab-pane>
                <el-tab-pane label="搜索课程" name="coursesJoin">
                    <div>放一个搜索框</div>
                    <LessonList />
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="experiments">
                    <LabList :labList="labs"/>
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

.userInfo,
.codeStatistics,
.lessonsInfo {
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