<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'

import { wrapHeaderWithToken, UPLOAD_PIC_URL } from '@/utils/helper';
import { } from '@/utils/helper';
import { showSuccess, showFail } from '@/utils/helper';

const props = defineProps<{
    avatarUrl?: string,
    submitApi?: any,
}>();

console.log('avatar upload', props.avatarUrl);

const uploadReqHeader = wrapHeaderWithToken();

const imageUrl = ref(props.avatarUrl ?? '');
const resUrl = ref('');
const handleAvatarSuccess = (res: { code: number, data: { url: string } }, file: UploadFile) => {
    resUrl.value = res.data.url;
    imageUrl.value = URL.createObjectURL(file.raw)
    props.submitApi?.({ avatar_url: imageUrl.value }).then((value: any) => {
        if (value.code === 0) showSuccess();
        else showFail();
    })
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
const getImage = () => {
    return imageUrl.value;
}

defineExpose({
    getImage,
})
</script>

<template>
    <el-upload
        class="avatarUploader"
        :action="UPLOAD_PIC_URL"
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
    object-fit: cover;

    // &:hover::after {
    //     content: "上传";
    //     height: 100px;
    //     width: 100px;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     background-color: #00000011;
    // }
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