<script lang="ts" setup>
import { ref } from 'vue';
import UserInfo from './comp/UserInfo.vue';
import SearchPanel from './comp/SearchPanel.vue';
import OtherFeatures from './comp/OtherFeatures.vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import CodingTimeTable from '@/components/common/CodingTimeTable.vue';
import CourseList from '@/components/course/CourseList.vue';
import LabList from '@/components/lab/LabList.vue';
import { useReloader } from '@/utils/helper';
import { getStudyCourseList, getMyCodingTime, getMyLabs } from '@/utils/services';

const activeName = ref('join');
const list = ref<any>([]);

const refCreateList = ref();
const { isReloading, reloadHandler, finishReload } = useReloader(refCreateList);

const refAllList = ref();
const {
    isReloading: isReloadingAll,
    reloadHandler: reloadHandlerAll,
    finishReload: finishReloadAll,
} = useReloader(refAllList);

getMyCodingTime().then((res) => {
    if (res.code === 0) list.value = res.data?.codingTime;
});
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
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="我的课程" name="join">
                    <div class="btnCt">
                        <LoadBtn @reload="reloadHandler" :is-loding="isReloading" />
                    </div>
                    <CourseList
                        :fetchData="getStudyCourseList"
                        ref="refCreateList"
                        @reloadend="finishReload"
                    />
                </el-tab-pane>
                <el-tab-pane label="所有课程" name="all" lazy>
                    <SearchPanel />
                </el-tab-pane>
                <el-tab-pane label="我的实验" name="labs" lazy>
                    <div class="btnCt">
                        <LoadBtn @reload="reloadHandlerAll" :is-loding="isReloadingAll" />
                    </div>
                    <LabList
                        ref="refAllList"
                        @reloadend="finishReloadAll"
                        :fetch-lab-list="getMyLabs"
                    />
                </el-tab-pane>
                <el-tab-pane label="练习场" name="other" lazy>
                    <OtherFeatures></OtherFeatures>
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
}
</style>