<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import UploadFile from '@/components/common/UploadFile.vue';
import BtnCt from '../common/BtnCt.vue';
import { comfirm } from '@/utils/helper';
import { getCourseNotice, createNotice } from '@/utils/services';
import { getCourseId } from './logic';

const courseId = getCourseId();

const isDialogOpen = ref(false);
const openDialog = () => { isDialogOpen.value = true; }
const closeDialog = () => { isDialogOpen.value = false; }

const refEl = ref();
const form = reactive({
    title: '',
    content: '',
    attachmentUrl: '',
})
const rules = reactive({
    title: [
        {
            required: true,
            message: '请输入公告标题',
            trigger: 'blur',
        },
    ],
})
const update = (url: string) => {
    form.attachmentUrl = url
}
const sumbit = () => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            comfirm({
                type: 'submit',
                refEl: refEl,
                onSuccTipClose: () => {
                    closeDialog();
                },
                fetchApi: createNotice,
                params: {
                    courseId,
                    title: form.title,
                    content: form.content,
                    attachmentUrl: form.attachmentUrl
                }
            });
        }
    });
}
const cancle = () => {
    refEl?.value?.resetFields();
    closeDialog();
}

const load = (url: string) => {
    window.location.href = url;
}

const remove = (id: number) => {

}

const updateResource = (id: number) => {

}

</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openDialog">新增课程公告</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="新增课程公告">
            <el-form :model="form" :rules="rules" ref="refEl">
                <el-form-item label="标题" label-width="80px" prop="title">
                    <el-input
                        v-model="form.title"
                        autocomplete="off"
                        placeholder="请输入资源标题"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px" prop="content">
                    <el-input
                        v-model="form.content"
                        autocomplete="off"
                        placeholder="请输入资源描述"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="资源上传" label-width="80px" prop="content">
                    <UploadFile type="attachment" @update="update" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="sumbit">提交</el-button>
                    <el-button @click="cancle">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :common="{ courseId }" :fetch-data="getCourseNotice" emptyDes="本课程暂无公告">
            <template v-slot:tableColumns>
                <el-table-column prop="title" label="公告名称" min-width="140" />
                <el-table-column prop="content" label="内容" min-width="280" />
                <el-table-column label="操作" min-width="300">
                    <template #default="scope">
                        <el-button
                            type="success"
                            size="default"
                            @click="load(scope?.row?.attachmentUrl)"
                        >下载</el-button>
                        <el-button
                            type="primary"
                            size="default"
                            @click="updateResource(scope?.row?.resourceId)"
                        >修改</el-button>
                        <el-button
                            type="danger"
                            size="default"
                            @click="remove(scope?.row?.resourceId)"
                        >删除</el-button>
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