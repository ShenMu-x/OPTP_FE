<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UploadFile from '@/components/common/UploadFile.vue';
import { labRules } from './rule';
import { labInfoType } from '@/type';

const refFormEl = ref();
const props = defineProps<{
    closeDialog?: () => void,
    fetchApi?: any,
    data?: labInfoType,
}>();

// config
const formLabelWidth = '80px';

// model
const form = reactive({
    labName: props.data?.title ?? '',
    description: props.data?.describe ?? '',
    endAt: props.data?.endAt ?? ''
})

const formRules = reactive(labRules);

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
                    props.fetchApi?.().then((value: any) => {
                        if (value.code === 0) {
                            ElMessage({
                                type: 'success',
                                message: '修改成功',
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
}

defineExpose({
    commitForm,
    resetForm
})


</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refFormEl">
        <el-form-item label="实验名称" :label-width="formLabelWidth" prop="labName">
            <el-input v-model="form.labName" autocomplete="off" placeholder="请输入实验名称"></el-input>
        </el-form-item>
        <el-form-item label="实验描述" :label-width="formLabelWidth" prop="description">
            <el-input
                v-model="form.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入实验描述"
                maxlength="100"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth" prop="endAt">
            <el-date-picker v-model="form.endAt" type="datetime" placeholder="请选择截止时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件" :label-width="formLabelWidth">
            <UploadFile type="attachment" />
        </el-form-item>
    </el-form>
</template>
