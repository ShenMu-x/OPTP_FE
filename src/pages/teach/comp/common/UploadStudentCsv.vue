<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'
import { wrapHeaderWithToken, showFailWrap, showSuccessWrap } from '@/utils/helper';
import { UPLOAD_CSV_STUDENT_TEMPLATE_URL } from '@/utils/option';

const refUploadEl = ref();
let allowType = ref(['text/csv'])
let fileType = ref(['csv']);
let name = ref('csv');
let uploadUrl = UPLOAD_CSV_STUDENT_TEMPLATE_URL;

const props = defineProps<{ courseId: number }>();
const emits = defineEmits(['upload']);

const handleFileSuccess = (res: { code: number, data: { url: string } }, file: UploadFile) => {
    emits('upload', res.data.url);
    showSuccessWrap({
        text: '学生列表导入成功'
    })
}
const handleFileError = () => {
    showFailWrap({
        text: '上传失败，请稍后再试'
    })
}
const handleRemove = () => {
    emits('upload', '');
}
const beforeFileUpload = (file: ElFile) => {
    const isAllow = allowType.value.includes(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isAllow) {
        ElMessage.error(`请上传${fileType.value.join('/')}格式文件`)
    }
    if (!isLt2M) {
        ElMessage.error('文件大小不能超过 2MB!')
    }
    return isAllow && isLt2M
}
const handleExceed = () => {
    showFailWrap({
        text: '限制上传 1 个文件'
    })
}

const resetUpload = () => {
    refUploadEl?.value?.clearFiles()
}
defineExpose({
    resetUpload,
})
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
        :data="{ courseId: props.courseId }"
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
            <div class="el-upload__tip">个数限制1个,大小不超过 2M</div>
        </template>
    </el-upload>
</template>

<style lang="less" scoped>
.el-upload__tip {
    line-height: 20px;
    font-size: 14px;
}
</style>