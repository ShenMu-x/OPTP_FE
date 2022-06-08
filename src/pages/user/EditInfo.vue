<script lang="ts" setup>
import { reactive, ref } from 'vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import TextReturnBtn from '@/components/common/TextReturnBtn.vue';
import { comfirm, useUser, useDirect } from '@/utils/helper';
import { editUserInfo as editUserApi } from '@/utils/services';
import { userInfoType } from '@/type';
import { editRules } from './rules';

const refEl = ref();
const { routerBack } = useDirect();
const { user, editUserInfo: updateUserInject } = useUser();
const editModel = reactive<userInfoType>({ ...user });
const rules = reactive(editRules);

const getModel = () => ({
    realName: editModel.realName,
    major: editModel.major,
    organization: editModel.organization,
    gender: editModel.gender,
    college: editModel.college,
    grade: editModel.grade,
});

const editHandler = () => {
    comfirm({
        type: 'edit',
        refEl: refEl,
        onSuccTipClose: () => {
            updateUserInject(getModel());
            routerBack();
        },
        fetchApi: editUserApi,
        params: getModel(),
    });
};
</script>

<template>
    <div class="editCt">
        <TextReturnBtn />
        <p class="formTitle">修改信息</p>
        <el-form
            label-position="top"
            class="editInfoForm"
            ref="refEl"
            :model="editModel"
            :rules="rules"
        >
            <el-form-item label="真实姓名" prop="realName">
                <el-input v-model.trim="editModel.realName" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-input v-model.trim="editModel.major" clearable></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="organization">
                <el-input v-model.trim="editModel.organization" clearable></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model.trim="editModel.college" clearable></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
                <el-input v-model.number="editModel.grade" type="number" min="0" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" class="flex justify-start">
                <el-radio-group v-model="editModel.gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <BtnBlue size="large" class="editBtn" @click="editHandler">点击修改</BtnBlue>
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