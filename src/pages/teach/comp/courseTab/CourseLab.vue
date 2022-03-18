<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import LabForm from '../form/LabForm.vue';
import BtnCt from '../common/BtnCt.vue';
import { isBefore, useCourseId, useDirect, useDialog } from '@/utils/helper';
import { createLab, getLabs } from '@/utils/services';

const refLabFormEl = ref();
const courseId = useCourseId();
const { directTo } = useDirect();
const { isDialogOpen, openDialog, closeDialog } = useDialog();

const toCreateLab = () => {
    refLabFormEl.value?.resetForm?.()
    openDialog()
}
const commitHandler = () => {
    refLabFormEl.value?.commitForm?.();
}
</script>

<template>
    <div class="labCt">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="toCreateLab">创建实验</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="创建实验">
            <LabForm ref="refLabFormEl" :closeDialog="closeDialog" :fetch-api="createLab" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取消</el-button>
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
                        <BtnBlue @click="directTo(`/teach/lab_detail/${scope?.row?.labId}`)">详情</BtnBlue>
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