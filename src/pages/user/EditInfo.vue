<script lang="ts" setup>
import { reactive } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { DArrowLeft } from '@element-plus/icons-vue';
import { validateName, validateMajor } from '../../utils/helper/validate';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const editHandler = () => {
    ElMessageBox.confirm(
        '确定提交？',
        '修改提交确认',
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
        })
        .catch(() => {
            //
        })
}


const editModel = reactive(store.state.user);

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

<template>
    <div class="editCt">
        <el-button
            class="returnBtn"
            :icon="DArrowLeft"
            type="text"
            @click="router.push('/usercenter')"
        >返回</el-button>
        <p class="formTitle">修改信息</p>
        <el-form label-position="top" class="editInfoForm" :model="editModel" :rules="rules">
            <el-form-item label="头像" prop="avatar">
                <UploadAvatar />
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