<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/common/PageHeader.vue';
import CourseInfoEdit from './comp/courseTab/CourseInfoEdit.vue';
import CourseLab from './comp/courseTab/CourseLab.vue';
import CourseStud from './comp/courseTab/CourseStud.vue';
import { getCourseById } from '@/utils/services';
import { CourseType } from '@/type';

const route = useRoute();
const router = useRouter();

const courseId = parseInt(route.params?.courseId?.[0]);
const data = reactive<{
  course: CourseType
}>({
  course: {},
})
const { course } = toRefs(data);

getCourseById({ courseId })
  .then(res => {
    if (res.code === 0 && res.data) {
      Object.assign(data.course, res.data.course);
      console.log(data.course)
    } else {
      router.replace('/404');
    }
  })

const focusTab = ref('manage');

</script>

<template>
  <PageHeader content="课程管理" />
  <div class="courseCtrCt">
    <el-tabs tab-position="left" class="demo-tabs" v-model="focusTab">
      <el-tab-pane label="课程管理" name="manage">
        <CourseStud />
      </el-tab-pane>
      <el-tab-pane label="课程实验" name="lab">
        <CourseLab />
      </el-tab-pane>
      <el-tab-pane label="课程公告" name="notice">课程公告</el-tab-pane>
      <el-tab-pane label="课程问答" name="qa">课程问答</el-tab-pane>
      <el-tab-pane label="课程信息" name="info">
        <CourseInfoEdit :course="course" />
      </el-tab-pane>
      <el-tab-pane label="学生成绩" name="score">学生成绩</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.courseCtrCt {
  margin: 10px 30px;
  padding: 10px;
  background-color: #fff;
}
</style>
