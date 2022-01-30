<template>
    <div class="editCt">
        <el-button class="returnBtn" :icon="DArrowLeft" type="text" @click="router.push('/usercenter')">返回</el-button>
        <p class="formTitle">修改信息</p>
        <el-form label-position="top" class="editInfoForm" :model="editModel" :rules="rules">
            <el-form-item label="头像" prop="avatar">
                <el-upload
                    class="avatarUploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <div v-else class="noImg">+</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="真实姓名" prop="userName">
                <el-input v-model="editModel.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="num">
                <el-input v-model="editModel.uid" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-input v-model="editModel.major" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="organization">
                <el-input v-model="editModel.organization" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" class="flex justify-start">
                <el-radio-group v-model="editModel.sex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button type="primary" class="editBtn" @click="editHandler">点击修改</el-button>
        </el-form>
    </div>
</template>

<style lang="less" scoped>
.editCt {
    display: flex;
    flex-direction: column;
    margin: 35px 60px;
    padding: 0 30px;
    background-color: #fff;
    min-height: calc(100vh - 60px - 70px - 30px);
}

.avatarUploader {
    cursor: pointer;
}
.noImg {
    font-size: 50px;
    line-height: 100px;
    font-weight: 100;
    background-color: #fefefe;
    border-radius: 5px;
    border: 1px dashed #aaa;
    width: 100px;
    height: 100px;
    text-align: center;

    &:hover,
    &:active,
    &.el-upload:focus {
        color: #aaa;
    }
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.returnBtn {
    margin-top: 20px;
    font-size: 20px;
    justify-self: flex-start;
    width: fit-content;
    font-size: 14px;
    color: #3f9eff;
    &:hover {
        cursor: pointer;
        color: #1f88f1;
    }
}

.formTitle {
    font-size: 32px;
    margin-bottom: 20px;
}

.title {
    margin-left: 20px;
    align-self: flex-start;
    font-weight: bold;
    font-size: 16px;
}

.editInfoForm {
    padding: 10px 30px;
}

.editBtn {
    width: 100%;
    margin-top: 40px;
    height: 50px;
    border: 0;
}
</style>


<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { DArrowLeft } from '@element-plus/icons-vue';
import type {
    UploadFile,
    ElUploadProgressEvent,
    ElFile,
} from 'element-plus/es/components/upload/src/upload.type'
import { validateName, validateMajor } from '../../utils/helper/validate';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();

const imageUrl = ref('')
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

const editHandler = () => {
    //
}

const editModel = reactive({
    avatar: '',
    userName: '',
    uid: '',
    major: '',
    organization: '',
    sex: 0,
});

const rules = reactive({
    userName: [
        { validator: validateName, trigger: 'blur' }
    ],
    major: [
        { validator: validateMajor, trigger: 'blur' }
    ],
    uid: [
        {
            required: true,
            message: '请输入学号',
            trigger: 'blur',
        },
    ],
});
</script>