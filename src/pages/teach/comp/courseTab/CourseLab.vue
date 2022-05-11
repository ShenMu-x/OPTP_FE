<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import LabForm from '../form/LabForm.vue';
import { showFailWrap, showSuccessWrap, isBefore, useCourseId, useDirect, useDialog } from '@/utils/helper';
import { createLab, getCourseLabList, deleteLab } from '@/utils/services';

const refLabFormEl = ref();
const refTableEl = ref();
const courseId = useCourseId();
const { isDialogOpen, openDialog, closeDialog } = useDialog();
const { routerToLabDetail } = useDirect();

const toCreateLab = () => {
    refLabFormEl.value?.resetForm?.()
    openDialog()
}
const closeCreatePanel = () => {
    closeDialog();
    // 存在对话框展示收起，自动触发列表刷新
}
const commitHandler = () => {
    refLabFormEl.value?.commitForm?.();
}
const clickToLabDetail = (labId: number) => {
    routerToLabDetail('direct', { labId })
}
const deleteHandler = (labId: number) => {
    ElMessageBox.confirm(
        '确定删除？',
        '实验删除确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            lockScroll: false,
        }
    )
        .then(() => {
            deleteLab(labId)
                .then((value: any) => {
                    if (value.code === 0) {
                        showSuccessWrap({ text: '实验已删除' });
                        refTableEl.value.reload?.()
                    } else {
                        showFailWrap({ text: '删除失败，请稍后再试' })
                    }
                })
        })
        .catch(() => {
            // 取消删除
        })
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
            <LabForm ref="refLabFormEl" :closeDialog="closeCreatePanel" :fetch-api="createLab" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="commitHandler">提交</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :common="{ courseId }" :fetch-data="getCourseLabList" ref="refTableEl">
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
                <el-table-column label="操作" min-width="180">
                    <template #default="scope">
                        <BtnBlue @click="clickToLabDetail(scope.row.labId)">详情</BtnBlue>
                        <el-button type="danger" size="default" @click="deleteHandler(scope?.row?.labId)">删除</el-button>
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