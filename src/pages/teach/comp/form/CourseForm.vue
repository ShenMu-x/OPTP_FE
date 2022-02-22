<script lang="ts" setup>
import { reactive, ref } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { courseRules } from './rule';
import { CourseType } from '@/type';
import { comfirm } from '@/utils/helper';
import { createCourse } from '@/utils/services';

const refEl = ref();
const props = defineProps<{
    closeDialog?: () => void,
    fetchApi: any,
    data?: CourseType
}>();

const formLabelWidth = '80px';

const form = reactive({
    courseName: props.data?.courseName || '',
    courseDes: props.data?.courseDes || '',
    secretKey: props.data?.secretKey || '',
    picUrl: props.data?.secretKey || '',
    language: props.data?.language || 0
})

const formRules = reactive(courseRules);
const getUrl = (url: string) => { form.picUrl = url; console.log(form) }

const commitForm = () => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            // todo
            comfirm({
                type: 'submit',
                refEl: refEl,
                onSuccTipClose: () => {
                    props.closeDialog?.();
                },
                fetchApi: createCourse,
                params: {
                    courseName: form.courseName,
                    courseDes: form.courseDes,
                    secretKey: form.secretKey,
                    picUrl: form.picUrl,
                    language: form.language,
                }
            });
        }
    });
}

const resetForm = () => {
    refEl.value.resetFields();
}

defineExpose({
    commitForm,
    resetForm
})


</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refEl">
        <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
            <el-input v-model="form.courseName" autocomplete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth" prop="courseDes">
            <el-input
                v-model="form.courseDes"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入课程描述"
                maxlength="200"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="加入密码" :label-width="formLabelWidth" prop="secretKey">
            <el-input v-model="form.secretKey" autocomplete="off" placeholder="请输入课程加入密码（6位）"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
            <UploadAvatar :after-upload="getUrl" />
        </el-form-item>
        <el-form-item label="课程语言" :label-width="formLabelWidth">
            <el-radio-group v-model="form.language">
                <el-radio :label="0">python</el-radio>
                <el-radio :label="1">c++</el-radio>
                <el-radio :label="2">java</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>
