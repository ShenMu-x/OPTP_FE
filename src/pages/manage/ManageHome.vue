<script lang="ts" setup>
import { ref } from 'vue';
import UserPanel from './tab/UserPanel.vue';
import CoursePanel from './tab/CoursePanel.vue';
import IDEPanel from './tab/IDEPanel.vue';
import MonitorPanel from './tab/MonitorPanel.vue';
const focusTab = ref('user');
</script>
<template>
    <div class="courseCtrCt">
        <el-tabs tab-position="left" class="demo-tabs" v-model="focusTab">
            <el-tab-pane label="用户管理" name="user" lazy>
                <UserPanel />
            </el-tab-pane>
            <el-tab-pane label="课程管理" name="course" lazy>
                <CoursePanel />
            </el-tab-pane>
            <el-tab-pane label="实验管理" name="lab" lazy>
                <IDEPanel />
            </el-tab-pane>
            <el-tab-pane label="系统监控" name="monitor" lazy>
                <MonitorPanel />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lang="less" scoped>
.courseCtrCt {
    margin: 30px;
    padding: 10px;
    background-color: #fff;
}
</style>