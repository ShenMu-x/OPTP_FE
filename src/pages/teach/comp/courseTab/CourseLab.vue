<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import LabForm from '../form/LabForm.vue';
import BtnCt from '../common/BtnCt.vue';
import { createLab, getLabs } from '@/utils/services';
import { isBefore } from '@/utils/helper';

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
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="toCreateLab">创建实验</el-button>
            </template>
        </BtnCt>
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
                <el-table-column prop="labId" label="实验ID" min-width="80" />
                <el-table-column prop="title" label="实验名称" min-width="140" />
                <el-table-column prop="content" label="实验描述" min-width="280" />
                <el-table-column prop="isFinish" label="实验状态" min-width="140">
                    <template #default="scope">
                        <div v-if="isBefore(scope.row.deadLine)">进行中</div>
                        <div v-else>已截止</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <BtnBlue @click="toDetail(scope?.row?.labId)">详情</BtnBlue>
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

.toDetailBtn {
    color: #409eff;
    text-decoration: none;
}
</style>