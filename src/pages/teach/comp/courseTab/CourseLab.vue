<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';

import LabForm from '../form/LabForm.vue';

import { createLab as createLabApi } from '@/utils/services';
import { labs } from './mock';

const router = useRouter();

const dialogFormVisible = ref(false);
const refLabFormEl = ref();
const closeDialog = () => {
    dialogFormVisible.value = false;
}
const openDialog = () => {
    dialogFormVisible.value = true;
}
const resetHandler = () => {
    closeDialog();
}
const commitHandler = () => {
    refLabFormEl.value?.commitForm?.();
}


const createLab = () => {
    refLabFormEl.value?.resetForm?.()
    openDialog()
}

const toDetail = (labId: string) => {
    router.push(`/teach/labdetail/${labId}`)
}



</script>

<template>
    <div class="labCt">
        <div class="btnCt">
            <el-button :icon="Plus" @click="createLab">创建实验</el-button>
        </div>
        <el-dialog v-model="dialogFormVisible" title="创建实验" :fullscreen="true">
            <LabForm ref="refLabFormEl" :closeDialog="closeDialog" :fetch-api="createLabApi" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetHandler">取消</el-button>
                    <el-button type="primary" @click="commitHandler">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :data="labs">
            <template v-slot:tableColumns>
                <el-table-column prop="labId" l label="实验ID" width="80" />
                <el-table-column prop="labName" label="实验名称" width="180" />
                <el-table-column prop="labDesc" label="实验描述" width="280" />
                <el-table-column prop="createAt" label="创建时间" sortable width="280" />
                <el-table-column prop="labStatus" label="实验状态" width="180" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="toDetail(scope?.row?.labId)">详情</el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
.labCt {
    margin: 20px;
    margin-top: 0;
}

.btnCt {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
}

.toDetailBtn {
    color: #409eff;
    text-decoration: none;
}
</style>