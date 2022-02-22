<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'
import { wrapHeaderWithToken, UPLOAD_PIC_URL, showSuccess, showFail } from '@/utils/helper';


const props = defineProps<{
    avatarUrl?: string,
    submitApi?: any,
    afterUpload?: any,
}>();

const avatar = toRef(props, 'avatarUrl');
const imageUrl = ref('');
const avatarUrl = computed(() => {
    if (imageUrl.value !== '') return imageUrl.value;
    else if (avatar.value) return avatar.value;
    else return '';
})

const handleAvatarSuccess = (res: { code: number, data: { url: string } }, file: UploadFile) => {
    imageUrl.value = URL.createObjectURL(file.raw)
    props.submitApi?.({ avatar_url: res.data.url }).then((value: any) => {
        if (value.code === 0) {
            showSuccess();
            props.afterUpload?.(res.data.url);
        }
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
</script>

<template>
    <el-upload
        class="avatarUploader"
        :action="UPLOAD_PIC_URL"
        name="pic"
        :headers="wrapHeaderWithToken()"
        :data="{ width: '256' }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
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
    position: relative;

    &:hover::after {
        content: "上传aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        height: 100px;
        width: 100px;
        // position: absolute;
        top: 0;
        left: 0;
        background-color: #000;
    }
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