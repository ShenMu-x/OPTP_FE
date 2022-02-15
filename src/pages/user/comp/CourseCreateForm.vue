<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'
import { validateCourseName } from '@/utils/helper/validate';
import { getToken } from '@/utils/storage';

const refFormEl = ref();
const props = defineProps<{
    closeDialog: () => void
}>();

// config
const uploadUrl = ref('');
const uploadReqHeader = {
    'ContentType': 'multipart/form-data',
    'Authorization': `Bearer ${getToken()}`
};
const formLabelWidth = '80px';

// model
const form = reactive({
    courseName: '',
    description: '',
    password: '',
    language: 1
})

const formRules = reactive({
    courseName: [
        {
            required: true,
            message: '请输入课程名称',
            trigger: 'blur',
        },
        {
            validator: validateCourseName,
            trigger: 'blur'
        }
    ],
    description: [
        {
            required: true,
            message: '请输入课程介绍',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入选课密码',
            trigger: 'blur',
        },
    ]
});

const imageUrl = ref('')
const handleAvatarSuccess = (res: ElUploadProgressEvent, file: UploadFile) => {
    imageUrl.value = URL.createObjectURL(file.raw);
}
const beforeAvatarUpload = (file: ElFile) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
        ElMessage.error('请上传JPEG/JPG格式图片')
    }
    if (!isLt2M) {
        ElMessage.error('图像大小不能超过 2MB!')
    }
    return isJPG && isLt2M
}

const commitForm = () => {
    refFormEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            // todo
            ElMessageBox.confirm(
                '确定提交？',
                '课程信息提交确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                    lockScroll: false,
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '修改成功',
                    })

                    props.closeDialog();
                })
                .catch(() => {
                    // 取消提交
                })
        }
    });
}

const resetForm = () => {
    refFormEl.value.resetFields();
}

defineExpose({
    commitForm,
    resetForm
})


</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refFormEl">
        <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
            <el-input v-model="form.courseName" autocomplete="off" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth" prop="description">
            <el-input
                v-model="form.description"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入课程描述"
                maxlength="200"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="加入密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="form.password" autocomplete="off" placeholder="请输入课程加入密码（6位）"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader el-upload"
                :action="uploadUrl"
                name="pic"
                :headers="uploadReqHeader"
                :data="{ width: '256' }"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="课程语言" :label-width="formLabelWidth">
            <el-radio-group v-model="form.language">
                <el-radio :label="1">cpp</el-radio>
                <el-radio :label="2">java</el-radio>
                <el-radio :label="3">python</el-radio>
                <el-radio :label="4">js/ts</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
</template>

<style lang="less" scoped>
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 158px;
    height: 158px;
    text-align: center;
    border: 1px #aaa dashed;
}
</style>