<script lang="ts" setup>
import { ref, reactive, watch, toRef } from 'vue';
import UploadFile from '@/components/common/UploadFile.vue';
import { comfirm, useCourseId } from '@/utils/helper';
import { createNotice, editNotice } from '@/utils/services';

const props = defineProps<{
    successCb: any, type?: 'edit', info?: {
        resourceId: number,
        title: string,
        content: string,
        attachmentUrl: string,
    }
}>();
const info = toRef(props, 'info');
const courseId = useCourseId();
const refEl = ref();
const form = reactive({
    title: props?.info?.title ?? '',
    content: props?.info?.content ?? '',
    attachmentUrl: props?.info?.attachmentUrl ?? '',
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
watch(info, (newV, oldV) => {
    if (newV?.resourceId !== oldV?.resourceId) {
        form.title = newV?.title ?? '';
        form.content = newV?.content ?? '';
        form.attachmentUrl = newV?.attachmentUrl ?? '';
    }
})

const update = (url: string) => {
    form.attachmentUrl = url
}

const submitCreateNotice = () => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            comfirm({
                type: 'submit',
                refEl: refEl,
                onSuccTipClose: () => {
                    props.successCb?.();
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
const submitEditNotice = () => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            comfirm({
                type: 'edit',
                refEl: refEl,
                onSuccTipClose: () => {
                    props.successCb?.();
                },
                fetchApi: editNotice,
                params: {
                    courseResourceID: info?.value?.resourceId,
                    title: form.title,
                    content: form.content,
                    attachmentUrl: form.attachmentUrl
                }
            });
        }
    });
}
const submit = props.type ? submitEditNotice : submitCreateNotice;
defineExpose({
    submit,
    resetFields: () => { refEl?.value?.resetFields?.(); }
})
</script>
<template>
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
        <el-form-item label="实验附件" label-width="80px" v-if="props.type === 'edit'">
            <el-link v-if="form.attachmentUrl" :href="form.attachmentUrl" type="primary">点击下载附件</el-link>
            <div v-else>暂无附件</div>
        </el-form-item>
        <el-form-item label="资源上传" label-width="80px" prop="content">
            <UploadFile type="attachment" @update="update" />
        </el-form-item>
    </el-form>
</template>