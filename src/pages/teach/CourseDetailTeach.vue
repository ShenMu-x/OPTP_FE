<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const courseId = route.params.courseId;

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <div>
    <el-page-header content="课程管理" @back="goBack" class="header"/>
    <div class="courseCtrCt">
      <el-tabs tab-position="left" class="demo-tabs">
        <el-tab-pane label="courseLab">课程实验</el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
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
  height: 100%;
  background-color: #fff;
}
</style>
