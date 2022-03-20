<script lang="ts" setup>
import { ref } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import LabEdit from './comp/labTab/LabEdit.vue';
import Homework from './comp/labTab/Homework.vue';
import Plagiarism from './comp/labTab/Plagiarism.vue';
import ErrorLog from './comp/labTab/ErrorLog.vue';
const focusTab = ref('info');
</script>

<template>
    <PageHeader content="实验详情" />
    <div class="card tabCt">
        <el-tabs tab-position="top" class="demo-tabs" v-model="focusTab">
            <el-tab-pane label="修改实验信息" name="info" lazy>
                <LabEdit />
            </el-tab-pane>
            <el-tab-pane label="作业完成情况" name="homework" lazy>
                <Homework />
            </el-tab-pane>
            <el-tab-pane label="代码查重" name="plagiarism" lazy>
                <Plagiarism />
            </el-tab-pane>
            <el-tab-pane label="编译日志失败收集" name="log" lazy>
                <ErrorLog />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="less" scoped>
.card {
    background-color: #fff;
    margin: 10px 90px;
    padding: 20px;
    padding-top: 10px;
}
</style>