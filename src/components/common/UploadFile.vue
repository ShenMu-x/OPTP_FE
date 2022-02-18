<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { UPLOAD_PDF_URL, UPLOAD_ATTACHMENT_URL, wrapHeaderWithToken } from '@/utils/helper';
import { onMounted } from 'vue-demi';

const props = defineProps<{
    type: 'attachment' | 'report';
}>();

const uploadUrl = props.type === 'report' ? UPLOAD_PDF_URL : UPLOAD_ATTACHMENT_URL;
const fileType = props.type === 'report' ? 'pdf' : 'docx/pdf/txt/rar'

const headers = wrapHeaderWithToken({
    'ContentType': 'multipart/form-data'
})

</script>

<template>
    <el-upload class="upload-demo" drag :action="uploadUrl" multiple :headers="headers">
        <el-icon class="el-icon--upload">
            <upload-filled />
        </el-icon>
        <div class="el-upload__text">
            拖动文件至此处上传
            <em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">只能上传{{ fileType }}文件, 文件大小不超过 2M</div>
        </template>
    </el-upload>
</template>

<style lang="less" scoped>
.el-upload__tip {
    font-size: 14px;
}
</style>