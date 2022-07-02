<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import UserInfo from './comp/UserInfo.vue';
import CourseForm from '../teach/comp/form/CourseForm.vue';
import CourseList from '@/components/course/CourseList.vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import { createCourse, getCoursesCreated } from '@/utils/services';
import { useReloader, useDialog } from '@/utils/helper';

const activeTabName = ref('coursesCreated');

const { isDialogOpen, openDialog, closeDialog } = useDialog();

const refCourseFormEl = ref();
const commitHandler = () => {
    refCourseFormEl.value.commitForm();
};
const resetHandler = () => {
    refCourseFormEl.value.resetForm();
    closeDialog();
};

const refListEl = ref();
const { isReloading, reloadHandler, finishReload } = useReloader(refListEl);

const successCommitHandler = () => {
    resetHandler();
    closeDialog();
    refListEl?.value?.reload?.();
};
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
                        <el-button :icon="Plus" @click="openDialog">创建课程</el-button>
                        <LoadBtn
                            @reload="reloadHandler"
                            :is-loding="isReloading"
                            class="loadButton"
                        />
                    </div>
                    <CourseList
                        :fetchData="getCoursesCreated"
                        ref="refListEl"
                        @reloadend="finishReload"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog v-model="isDialogOpen" title="创建课程" :lock-scroll="false">
            <CourseForm
                type="create"
                :fetchApi="createCourse"
                ref="refCourseFormEl"
                @success-commit="successCommitHandler"
            />
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

    .loadButton {
        margin-left: 12px;
    }
}
</style>