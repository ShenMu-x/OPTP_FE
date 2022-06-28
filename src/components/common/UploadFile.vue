<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type';
import { wrapHeaderWithToken, showFailWrap } from '@/utils/helper';
import { UPLOAD_PDF_URL, UPLOAD_ATTACHMENT_URL } from '@/utils/option';

let allowType = ref([
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
    'application/pdf',
    'text/plain',
]);
let fileType = ref(['doc', 'pdf', 'txt', 'docx']);
let name = ref('attachment');
let uploadUrl = UPLOAD_ATTACHMENT_URL;

const props = defineProps<{
    type: 'attachment' | 'report';
    afterUpload?: any;
}>();
if (props.type === 'report') {
    allowType.value = ['application/pdf'];
    fileType.value = ['pdf'];
    uploadUrl = UPLOAD_PDF_URL;
    name.value = 'pdf';
}
const refUploadEl = ref();

const handleFileSuccess = (res: { code: number; data: { url: string } }, file: UploadFile) => {
    emits('update', res.data.url);
    props.afterUpload?.(res.data.url);
};
const handleFileError = () => {
    showFailWrap({
        text: '上传失败，请稍后再试',
    });
};
const handleRemove = () => {
    emits('update', '');
    props.afterUpload?.('');
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

const emits = defineEmits(['update']);
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
        :action="uploadUrl"
        :headers="wrapHeaderWithToken()"
        :accept="allowType.join(',')"
        :on-success="handleFileSuccess"
        :on-error="handleFileError"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeFileUpload"
        :name="name"
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