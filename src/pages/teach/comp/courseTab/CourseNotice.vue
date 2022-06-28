<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import NoticeForm from '../form/NoticeForm.vue';
import {
    useCourseId,
    useDialog,
    loadAttachment,
    showSuccessWrap,
    showFailWrap,
} from '@/utils/helper';
import { getCourseNotice, deleteNotice } from '@/utils/services';

const courseId = useCourseId();
const common = { courseId };
const { isDialogOpen, openDialog, closeDialog } = useDialog();
const {
    isDialogOpen: isEditPanelOpen,
    openDialog: openEditPanelOpen,
    closeDialog: closeEditPanelOpen,
} = useDialog();

const refCreateFormEl = ref();
const refEditFormEl = ref();
const refCtEl = ref();
const refTableEl = ref();

const sumbit = () => {
    refCreateFormEl?.value?.submit?.();
};
const submitCb = () => {
    closeDialog();
    closeEditPanelOpen();
    refTableEl?.value?.reload?.();
};
const cancleCreatePanel = () => {
    refCreateFormEl?.value?.resetFields?.();
    closeDialog();
};
const sumbitEdit = () => {
    refEditFormEl?.value?.submit?.();
};
const cancleEditPanel = () => {
    refEditFormEl?.value?.resetFields?.();
    closeEditPanelOpen();
};
const load = (url: string, title: string) => {
    loadAttachment(refCtEl, url);
};
const info = ref({
    resourceId: 0,
    title: '',
    content: '',
    attachmentUrl: '',
});
const updateResource = (row: any) => {
    info.value = {
        resourceId: row.resourceId,
        title: row.title,
        content: row.content,
        attachmentUrl: row.attachmentUrl,
    };
    openEditPanelOpen();
};
const remove = (id: number) => {
    ElMessageBox.confirm('确认删除?', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false,
    })
        .then(() => {
            deleteNotice(id).then((res) => {
                if (res.code === 0) {
                    showSuccessWrap({ text: '删除成功' });
                    refTableEl?.value?.reload?.();
                } else {
                    showFailWrap({ text: '服务出现问题，请稍后再试' });
                }
            });
        })
        .catch(() => {});
};
</script>
<template>
    <div class="ct" ref="refCtEl">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openDialog">新增课程公告</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="新增课程公告">
            <NoticeForm :success-cb="submitCb" ref="refCreateFormEl" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="sumbit">提交</el-button>
                    <el-button @click="cancleCreatePanel">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="isEditPanelOpen" title="修改课程公告">
            <NoticeForm :success-cb="submitCb" ref="refEditFormEl" type="edit" :info="info" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="sumbitEdit">提交</el-button>
                    <el-button @click="cancleEditPanel">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage
            :common="common"
            :fetch-data="getCourseNotice"
            emptyDes="本课程暂无公告"
            ref="refTableEl"
        >
            <template v-slot:tableColumns>
                <el-table-column prop="title" label="公告名称" min-width="140" />
                <el-table-column prop="content" label="内容" min-width="280" />
                <el-table-column label="操作" min-width="300">
                    <template #default="scope">
                        <el-button
                            type="success"
                            size="default"
                            v-if="scope?.row?.attachmentUrl"
                            @click="load(scope?.row?.attachmentUrl, scope?.row?.title)"
                        >
                            下载资料
                        </el-button>
                        <el-button type="success" size="default" disabled v-else>
                            暂无资料
                        </el-button>
                        <el-button
                            type="primary"
                            size="default"
                            @click="updateResource(scope?.row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            type="danger"
                            size="default"
                            @click="remove(scope?.row?.resourceId)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>
<style lang="less" scoped>
.ct {
    margin: 20px;
    margin-top: 0;
}
</style>