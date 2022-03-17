<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import UserInfo from './comp/UserInfo.vue';
import CodingTimeTable from '@/components/common/CodingTimeTable.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import CourseList from '@/components/course/CourseList.vue';
import LabList from '@/components/lab/LabList.vue';
import { getAllCourseList, getStudyCourseList, getMyCodingTime } from '@/utils/services';

const activeName = ref('coursesCreated');
const handleTabClick = (obj: any) => {
    console.log(obj?.props?.label);
};

const searchText = ref('');
const search = () => {
    console.log(searchText.value);
}

const list = ref<any>([]);
getMyCodingTime()
    .then(res => {
        if (res.code === 0) {
            list.value = res.data?.codingTime;
        }
    })
</script>

<template>
    <div class="userCenterCt">
        <div class="pageTitle">我的主页</div>
        <UserInfo class="infoCard" />
        <div class="stats">
            <div class="statTitle">我的编码时长统计（min）</div>
            <CodingTimeTable :list="list" />
        </div>
        <div class="coursesInfo">
            <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                <el-tab-pane label="我的课程" name="coursesCreated">
                    <CourseList :fetchData="getStudyCourseList" />
                </el-tab-pane>
                <el-tab-pane label="搜索课程" name="coursesJoin">
                    <div class="btnCt">
                        <BtnBlue class="searchBtn" @click="search" size="large">查询</BtnBlue>
                        <el-input
                            v-model="searchText"
                            size="large"
                            placeholder="输入课程ID查询"
                            :prefix-icon="Search"
                        ></el-input>
                    </div>
                    <CourseList :fetchData="getAllCourseList" />
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

.btnCt {
    display: flex;
    width: 300px;
    .searchBtn {
        margin-right: 20px;
    }
}
</style>