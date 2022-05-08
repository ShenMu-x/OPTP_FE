<script lang="ts" setup>
import { ref, watch } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import LabPlagiarismDialog from './LabPlagiarismDialog.vue';
import { useLabId, useDialog } from '@/utils/helper';
import { getLabPlagiarism, plagiarismType } from '@/utils/services';

const labId = useLabId();
let data: plagiarismType[] = [];
const current = ref(1);
const total = ref(0);
const pageSize = ref(7);
let list = ref<plagiarismType[]>([]);
const setList = () => {// 查重接口后台无分页
    list.value = data?.slice?.((current.value - 1) * pageSize.value, current.value * pageSize.value)
}

const { isDialogOpen, openDialog, closeDialog } = useDialog();
getLabPlagiarism(labId)
    .then(res => {
        if (res.code === 0) {
            data = res.data ?? [];
            total.value = data.length;
            setList()
        }
    })
watch(current, setList)

const dialogUrl = ref('');
const openDetail = (url: string) => {
    console.log(url);
    dialogUrl.value = url;
    openDialog();
}
</script>

<template>
    <div v-if="list.length">
        <el-dialog v-model="isDialogOpen" title="创建实验" width="80%">
            <LabPlagiarismDialog :url="dialogUrl" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">关闭</el-button>
                </span>
            </template>
        </el-dialog>
        <el-table :data="list" stripe highlight-current-row style="width: 100%">
            <el-table-column prop="num1" label="学生一学号" min-width="120" />
            <el-table-column prop="num2" label="学生二学号" min-width="120" />
            <el-table-column prop="realName1" label="学生一姓名" min-width="120" />
            <el-table-column prop="realName2" label="学生二姓名" min-width="120" />
            <el-table-column prop="similarity" label="相似度" min-width="120" />
            <el-table-column label="实验报告" min-width="100">
                <template #default="scope">
                    <BtnBlue @click="openDetail(scope.row.url)">查看</BtnBlue>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage="current" layout="prev, pager, next" :total="total" :page-size="pageSize"
            hide-on-single-page></el-pagination>
    </div>
    <el-empty v-else description="暂无查重记录" />
</template>