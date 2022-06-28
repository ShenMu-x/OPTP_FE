<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import CourseInfo from './comp/courseTab/CourseInfo.vue';
import CourseLab from './comp/courseTab/CourseLab.vue';
import CourseStud from './comp/courseTab/CourseStud.vue';
import CourseNotice from './comp/courseTab/CourseNotice.vue';
import CourseState from './comp/courseTab/CourseState.vue';
import CourseAttend from './comp/courseTab/courseAttend.vue';
import QACard from '@/components/comment/QACard.vue';
import { useCourseId, useDirect, showFailWrap } from '@/utils/helper';
import { getCourseById } from '@/utils/services';
import { CourseType } from '@/type';

const { redirectNotFound } = useDirect();
const courseId = useCourseId();
const data = reactive<{ course: CourseType }>({
    course: {},
});
const { course } = toRefs(data);
const focusTab = ref('lab');

getCourseById({ courseId }).then((res) => {
    if (res.code === 0 && res.data) Object.assign(data.course, res.data);
    else showFailWrap({ text: res.errorMsg, closeCb: redirectNotFound });
});
</script>

<template>
    <PageHeader content="课程管理" />
    <div class="courseCtrCt">
        <el-tabs tab-position="left" class="demo-tabs" v-model="focusTab">
            <el-tab-pane label="课程实验" name="lab" lazy>
                <CourseLab />
            </el-tab-pane>
            <el-tab-pane label="签到管理" name="attend" lazy>
                <CourseAttend />
            </el-tab-pane>
            <el-tab-pane label="成员管理" name="manage" lazy>
                <CourseStud />
            </el-tab-pane>
            <el-tab-pane label="课程问答" name="qa" lazy>
                <QACard class="qaCt" type="course" />
            </el-tab-pane>
            <el-tab-pane label="成绩统计" name="score" lazy>
                <CourseState />
            </el-tab-pane>
            <el-tab-pane label="课程信息" name="info" lazy>
                <CourseInfo :course="course" />
            </el-tab-pane>
            <el-tab-pane label="课程公告" name="notice" lazy>
                <CourseNotice />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="less" scoped>
.courseCtrCt {
    margin: 10px 30px;
    padding: 10px;
    background-color: #fff;
}

.qaCt {
    margin: 20px;
    margin-top: 0;
}
</style>
