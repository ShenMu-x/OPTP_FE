<script lang="ts" setup>
import { ElMessage } from 'element-plus'
const props = defineProps<{
    params?: any,
    postApi?: any,
    successAction?: any,
    failAction?: any,
    title?: string,
    successText?: string,
    failText?: string,
}>();

const submitHandler = () => {
    const params = props.params;
    const postApi = props.postApi;

    postApi(params).then((res: any) => {
        if (res.code === 0) {
            props.successAction?.();
            ElMessage({
                showClose: true,
                message: props.successText || '提交成功',
                type: 'success',
                duration: 2000,
            })
        } else {
            props.failAction?.();
            ElMessage({
                showClose: true,
                message: props.failText || res.error.message || '提交失败',
                type: 'error',
                duration: 2000,
            })
        }
    })
}
</script>

<template>
    <el-button type="primary" @click="submitHandler()">{{ props.title ?? '提交' }}</el-button>
</template>