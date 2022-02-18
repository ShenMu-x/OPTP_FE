<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'

import { wrapHeaderWithToken } from '@/utils/helper';

const props = defineProps<{
    avatarurl?: string,
    uploadurl?: string
}>()

const uploadReqHeader = wrapHeaderWithToken({
    'ContentType': 'multipart/form-data'
});

const imageUrl = ref(props.avatarurl ?? '')
const handleAvatarSuccess = (res: ElUploadProgressEvent, file: UploadFile) => {
    imageUrl.value = URL.createObjectURL(file.raw)
}
const beforeAvatarUpload = (file: ElFile) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage.error('请上传JPEG/JPG格式图片')
    }
    if (!isLt2M) {
        ElMessage.error('头像大小不能超过 2MB!')
    }
    return isJPG && isLt2M
}
</script>

<template>
    <el-upload
        class="avatarUploader"
        :action="props.uploadurl"
        name="pic"
        :headers="uploadReqHeader"
        :data="{ width: '256' }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <div v-else class="noImg">
            <Plus style="height: 2em; width: 2em;" />
        </div>
    </el-upload>
</template>

<style lang="less" scoped>
.avatarUploader {
    cursor: pointer;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
.noImg {
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px dashed #aaa;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover,
    &:active,
    &.el-upload:focus {
        color: rgb(90, 90, 90);
    }
}
</style>