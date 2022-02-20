<script lang="ts" setup>
import { ElMessage } from 'element-plus'
const props = defineProps<{
    params?: any,
    postApi?: any,
    successAction?: () => void,
    failAction?: () => void,
    title?: string,
    successText?: string,
    failText?: string,
}>();

const submitHandler = () => {
    const params = props.params;
    const postApi = props.postApi;

    postApi(params);
    const res = { code: 1 };
    const { code } = res;
    if (code === 0) {
        props.successAction?.();
        ElMessage({
            showClose: true,
            message: props.successText ?? '提交成功',
            type: 'success',
            duration: 2000,
        })
    } else {
        props.failAction?.();
        ElMessage({
            showClose: true,
            message: props.failText ?? '提交失败',
            type: 'error',
            duration: 2000,
        })
    }
}
</script>

<template>
    <el-button type="primary" @click="submitHandler()">{{props.title ?? '提交'}}</el-button>
</template>