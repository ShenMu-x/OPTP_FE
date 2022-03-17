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
import { useCourseId, useDirect } from '@/utils/helper';
import { getCourseById } from '@/utils/services';
import { CourseType } from '@/type';

const { redirect } = useDirect();
const courseId = useCourseId();
const data = reactive<{
  course: CourseType
}>({
  course: {},
})
const { course } = toRefs(data);
const focusTab = ref('lab');

getCourseById({ courseId })
  .then(res => {
    if (res.code === 0 && res.data) Object.assign(data.course, res.data);
    else redirect('/404');
  })
</script>

<template>
  <PageHeader content="课程管理" />
  <div class="courseCtrCt">
    <el-tabs tab-position="left" class="demo-tabs" v-model="focusTab">
      <el-tab-pane label="课程实验" name="lab">
        <CourseLab />
      </el-tab-pane>
      <el-tab-pane label="签到管理" name="attend">
        <CourseAttend />
      </el-tab-pane>
      <el-tab-pane label="成员管理" name="manage">
        <CourseStud />
      </el-tab-pane>
      <el-tab-pane label="课程公告" name="notice">
        <CourseNotice />
      </el-tab-pane>
      <el-tab-pane label="课程问答" name="qa">
        <QACard class="qaCt" type="course" />
      </el-tab-pane>
      <el-tab-pane label="课程信息" name="info">
        <CourseInfo :course="course" />
      </el-tab-pane>
      <el-tab-pane label="学生成绩" name="score">
        <CourseState />
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
