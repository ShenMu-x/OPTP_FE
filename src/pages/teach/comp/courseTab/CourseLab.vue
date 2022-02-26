<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import LabForm from '../form/LabForm.vue';
import { createLab, getLabs } from '@/utils/services';

const router = useRouter();
const route = useRoute();
const courseId = parseInt(route.params?.courseId?.[0]);

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

const toCreateLab = () => {
    refLabFormEl.value?.resetForm?.()
    openDialog()
}

const toDetail = (labId: number) => {
    router.push(`/teach/lab_detail/${labId}`)
}

</script>

<template>
    <div class="labCt">
        <div class="btnCt">
            <el-button :icon="Plus" @click="toCreateLab">创建实验</el-button>
        </div>
        <el-dialog v-model="dialogFormVisible" title="创建实验">
            <LabForm ref="refLabFormEl" :closeDialog="closeDialog" :fetch-api="createLab" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetHandler">取消</el-button>
                    <el-button type="primary" @click="commitHandler">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :common="{ courseId }" :fetch-data="getLabs">
            <template v-slot:tableColumns>
                <el-table-column prop="id" label="实验ID" width="100" />
                <el-table-column prop="title" label="实验名称" width="140" />
                <el-table-column prop="content" label="实验描述" width="280" />
                <el-table-column prop="deadLine" label="截止时间" sortable width="140" />
                <el-table-column prop="labStatus" label="实验状态" width="140" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="toDetail(scope?.row?.id)">详情</el-button>
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