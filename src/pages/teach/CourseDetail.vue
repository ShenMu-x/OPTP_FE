<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '@/components/common/PageHeader.vue';
import CourseInfoEdit from './comp/CourseInfoEdit.vue';

const route = useRoute();

const courseId = route.params.courseId;

const focusTab = ref('manage');

</script>

<template>
  <div>
    <PageHeader content="课程管理" class="header" />
    <div class="courseCtrCt">
      <el-tabs tab-position="left" class="demo-tabs" v-model="focusTab">
        <el-tab-pane label="课程管理" name="manage">
          <CourseInfoEdit />
        </el-tab-pane>
        <el-tab-pane label="课程实验" name="lab">课程实验</el-tab-pane>
        <el-tab-pane label="课程公告" name="notice">课程公告</el-tab-pane>
        <el-tab-pane label="课程问答" name="qa">课程问答</el-tab-pane>
        <el-tab-pane label="课程信息" name="info3">课程信息</el-tab-pane>
        <el-tab-pane label="学生成绩" name="score">学生成绩</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header{
  margin: 20px;
}
.courseCtrCt {
  margin: 10px 30px;
  background-color: #fff;
}
</style>
