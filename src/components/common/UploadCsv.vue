<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type';
import { wrapHeaderWithToken, showFailWrap } from '@/utils/helper';

const props = defineProps<{ uploadUrl: string; data?: any }>();
const refUploadEl = ref();
let allowType = ref(['text/csv']);
let fileType = ref(['csv']);

const emits = defineEmits(['upload']);

const handleFileSuccess = () => {
    emits('upload');
    ElMessageBox.alert('文件导入成功', '操作提示', {
        confirmButtonText: '确定',
        type: 'success',
        lockScroll: false,
    });
    resetUpload();
};
const handleFileError = (res: Error) => {
    let code = -1;
    try {
        code = JSON.parse(res.message)?.code ?? -1;
    } catch (err) {
        console.log(err);
    }
    showFailWrap({
        text: code === -19999 ? '文件内信息有误，请检查文件' : '上传失败，请稍后再试',
    });
};
const handleRemove = () => {
    emits('upload', '');
};
const beforeFileUpload = (file: ElFile) => {
    const isAllow = allowType.value.includes(file.type);
    const isLt30M = file.size / 1024 / 1024 < 30;

    if (!isAllow) {
        ElMessage.error(`请上传${fileType.value.join('/')}格式文件`);
    }
    if (!isLt30M) {
        ElMessage.error('文件大小不能超过 30MB!');
    }
    return isAllow && isLt30M;
};
const handleExceed = () => {
    showFailWrap({
        text: '限制上传 1 个文件',
    });
};

const resetUpload = () => {
    refUploadEl?.value?.clearFiles();
};
defineExpose({
    resetUpload,
});
</script>

<template>
    <el-upload
        drag
        ref="refUploadEl"
        :limit="1"
        :action="props.uploadUrl"
        :headers="wrapHeaderWithToken()"
        :accept="allowType.join(',')"
        :on-success="handleFileSuccess"
        :on-error="handleFileError"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeFileUpload"
        name="csv"
        :data="props.data ?? {}"
    >
        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            拖动文件至此处上传
            <em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">只能上传{{ fileType.join('/') }}类型文件</div>
            <div class="el-upload__tip">个数限制1个,大小不超过 30M</div>
        </template>
    </el-upload>
</template>

<style lang="less" scoped>
.el-upload__tip {
    line-height: 20px;
    font-size: 14px;
}
</style>