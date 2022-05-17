<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type';
import { wrapHeaderWithToken, showSuccess, showFail } from '@/utils/helper';
import { UPLOAD_PIC_URL } from '@/utils/option';

const props = defineProps<{
    avatarUrl?: string;
    submitApi?: any;
    afterSubmit?: any;
    afterUpload?: any;
}>();

const avatar = toRef(props, 'avatarUrl');
const imageUrl = ref('');
const avatarUrl = computed(() => {
    if (imageUrl.value !== '') return imageUrl.value;
    else if (avatar.value) return avatar.value;
    else return '';
});

const handleAvatarSuccess = (res: { code: number; data: { url: string } }, file: UploadFile) => {
    imageUrl.value = URL.createObjectURL(file.raw);
    props.afterUpload?.(res.data.url);
    props.submitApi?.({ avatar_url: res.data.url }).then((value: any) => {
        if (value.code === 0) {
            showSuccess();
            props.afterSubmit?.(res.data.url);
        } else {
            showFail();
        }
    });
};
const beforeAvatarUpload = (file: ElFile) => {
    const isAllow = file.type === 'image/jpeg' || 'image/png' || 'image/jpg' || 'image/gif';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isAllow) {
        ElMessage.error('请上传JPEG/JPG/PNG/GIF格式图片');
    }
    if (!isLt2M) {
        ElMessage.error('头像大小不能超过 2MB!');
    }
    return isAllow && isLt2M;
};

const isHover = ref(false);
const hover = () => {
    isHover.value = true;
};
const leave = () => {
    isHover.value = false;
};
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
        accept="image/jpg, image/jpeg, image/png, image/gif"
    >
        <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
        <div v-else class="noImg">
            <Plus style="height: 2em; width: 2em" />
        </div>
        <div
            :class="['maskCt', isHover ? 'mask' : 'opacity0']"
            @mouseenter.stop="hover"
            @mouseleave.stop="leave"
        >
            <div v-show="isHover">点击上传</div>
        </div>
    </el-upload>
</template>

<style lang="less" scoped>
.avatarUploader {
    height: 100px;
    width: 100px;
    cursor: pointer;
    position: relative;
}

.maskCt {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 100px;
    font-weight: bold;
    color: #fff;
}
.opacity0 {
    opacity: 0;
}
.mask {
    background-color: rgba(0, 0, 0, 0.164);
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
    object-fit: cover;
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