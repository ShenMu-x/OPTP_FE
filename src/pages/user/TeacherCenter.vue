<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

import UserInfo from './comp/UserInfo.vue';
import CourseCreateForm from '../teach/comp/CourseCreateForm.vue';
import CourseList from '@/components/course/CourseList.vue';

import { CourseListType } from '@/type';
import { mockLessonsData } from './mockdata';

const mockData = reactive<CourseListType>(mockLessonsData);
const activeTabName = ref('coursesCreated');
const refCourseFormEl = ref();

const dialogFormVisible = ref(false);
const openDialog = () => {
    dialogFormVisible.value = true;
}
const closeDialog = () => {
    dialogFormVisible.value = false;
}

const commitHandler = () => {
    refCourseFormEl.value.commitForm();
}
const resetHandler = () => {
    refCourseFormEl.value.resetForm();
    closeDialog();
}

</script>

<template>
    <div class="userCenterCt">
        <div class="pageTitle">我的主页</div>
        <div class="userInfo">
            <UserInfo :role="1" />
        </div>
        <div class="coursesInfo">
            <el-tabs v-model="activeTabName" type="card">
                <el-tab-pane label="我的课程" name="coursesCreated">
                    <div class="btnCt">
                        <el-button :icon="Plus" class="floatLeft" @click="openDialog">创建课程</el-button>
                    </div>
                    <CourseList :courses="mockData" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-model="dialogFormVisible" title="创建课程" :fullscreen="true">
            <CourseCreateForm ref="refCourseFormEl" :closeDialog="closeDialog" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetHandler">取消</el-button>
                    <el-button type="primary" @click="commitHandler">提交</el-button>
                </span>
            </template>
        </el-dialog>
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
.coursesInfo {
    background-color: #fff;
    margin-top: 20px;
    padding: 20px;
}

.btnCt {
    display: flex;
}
</style>