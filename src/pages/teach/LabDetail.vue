<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/common/PageHeader.vue';
import LabEdit from './comp/labTab/LabEdit.vue';
import Homework from './comp/labTab/Homework.vue';
import { getLabById } from '@/utils/services';
import { mockLab } from './mock';


const route = useRoute();
const router = useRouter();
const labId = parseInt(route.params?.labId?.[0]);

console.log('labId', labId);
getLabById(labId).then(res => {
    console.log('lanRes' ,res);
    if(res.code === -19999) {
        router.replace('/404');
    }
})


const focusTab = ref('info');
// const focusTab = ref('homework');
</script>

<template>
    <PageHeader content="实验详情" />
    <div class="card tabCt">
        <el-tabs tab-position="top" class="demo-tabs" v-model="focusTab">
            <el-tab-pane label="修改实验信息" name="info">
                <LabEdit />
            </el-tab-pane>
            <el-tab-pane label="作业完成情况" name="homework">
                <Homework />
            </el-tab-pane>
            <el-tab-pane label="代码查重" name="plagiarism">代码查重</el-tab-pane>
            <el-tab-pane label="编译日志失败收集" name="errorLog">编译日志失败收集</el-tab-pane>
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