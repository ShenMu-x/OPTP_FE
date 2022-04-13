<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UploadFile from '@/components/common/UploadFile.vue';
import { labRules } from './rule';
import { useCourseId } from '@/utils/helper';
import { createLab } from '@/utils/services';

// 创建实验表格
const refFormEl = ref();
const props = defineProps<{
    closeDialog?: () => void,
}>();

const formLabelWidth = '80px';
const refUploadEl = ref();

const courseId = useCourseId();
const form = reactive({
    title: '',
    content: '',
    attachmentUrl: '',
    deadLine: '',
})

const formRules = reactive(labRules);
const updateFile = (url: string) => {
    form.attachmentUrl = url;
}

const commitForm = () => {
    refFormEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            // todo
            ElMessageBox.confirm(
                '确定提交？',
                '实验信息提交确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                    lockScroll: false,
                }
            )
                .then(() => {
                    createLab({
                        courseId,
                        title: form.title,
                        content: form.content,
                        attachmentUrl: form.attachmentUrl,
                        deadLine: form.deadLine,
                    }).then((value: any) => {
                        if (value.code === 0) {
                            ElMessage({
                                type: 'success',
                                message: '创建成功',
                            })
                            props.closeDialog?.();
                        }
                    })
                })
                .catch(() => {
                    // 取消提交
                })
        }
    });
}

const resetForm = () => {
    refFormEl.value.resetFields();
    refUploadEl?.value?.resetUpload();
}

defineExpose({
    commitForm,
    resetForm
})
</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refFormEl">
        <el-form-item label="实验名称" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off" placeholder="请输入实验名称"></el-input>
        </el-form-item>
        <el-form-item label="实验描述" :label-width="formLabelWidth" prop="content">
            <el-input
                v-model="form.content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入实验描述"
                maxlength="100"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth" prop="deadLine">
            <el-date-picker v-model="form.deadLine" type="datetime" placeholder="请选择截止时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件" :label-width="formLabelWidth">
            <UploadFile type="attachment" @update="updateFile" ref="refUploadEl" />
        </el-form-item>
    </el-form>
</template>
