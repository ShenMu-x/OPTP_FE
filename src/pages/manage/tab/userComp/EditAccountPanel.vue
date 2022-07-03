<script lang="ts" setup>
import { ref, reactive, toRef, watch } from 'vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { comfirm, useDialog } from '@/utils/helper';
import { editAccountInfo } from '@/utils/services';
import { defaultUserEmailSuffix } from '@/utils/option';
import { emptyUserInfo, userInfoType } from '@/type';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const refEl = ref();
const labelWidth = '80px';
const props = defineProps<{ account: userInfoType }>();
const account = toRef(props, 'account');
const form = reactive({ ...emptyUserInfo });
const refreshInfo = () => {
    form.userId = account.value.userId;
    form.email = account.value.email;
    form.realName = account.value.realName;
    form.num = account.value.num;
    form.avatarUrl = account.value?.avatarUrl;
    form.major = account.value?.major;
    form.organization = account.value?.organization;
    form.gender = account.value?.gender;
    form.college = account.value?.college;
    form.grade = account.value?.grade;
};
watch(account, (newV, oldV) => {
    if (newV.userId !== oldV.userId) refreshInfo();
});
const emits = defineEmits(['submit']);
const getUrl = (url: string) => {
    form.avatarUrl = url;
};
const submit = () => {
    comfirm({
        type: 'edit',
        refEl,
        successCb: () => {
            emits('submit');
        },
        finallyCb: closeDialog,
        fetchApi: editAccountInfo,
        params: {
            user_id: form.userId,
            email: `${form.num}${defaultUserEmailSuffix}`,
            number: form.num,
            name: form.realName,
            major: form.major,
            organization: form.organization,
            avatar: form.avatarUrl,
            gender: form.gender,
            college: form.college,
            grade: form.grade,
        },
    });
};
const cancle = () => {
    refEl?.value?.resetFields?.();
    closeDialog();
};
defineExpose({
    openPanel: openDialog,
});
</script>

<template>
    <el-dialog v-model="isDialogOpen" title="修改账户信息">
        <el-form :model="form" ref="refEl">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" :label-width="labelWidth" required>
                        <el-input v-model="form.realName" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号" :label-width="labelWidth" required>
                        <el-input v-model="form.num" placeholder="请输入用户账号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="专业" prop="major" :label-width="labelWidth">
                        <el-input v-model="form.major"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位" prop="organization" :label-width="labelWidth">
                        <el-input v-model="form.organization" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="学院" prop="college" :label-width="labelWidth">
                        <el-input v-model.trim="form.college" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年级" prop="grade" :label-width="labelWidth">
                        <el-input
                            v-model.number="form.grade"
                            type="number"
                            min="0"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="邮箱信息" :label-width="labelWidth" prop="number">
                <el-input v-model="form.num" placeholder="账户邮箱为M邮箱" disabled>
                    <template #append>{{ defaultUserEmailSuffix }}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="labelWidth">
                <el-radio-group v-model="form.gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="头像" :label-width="labelWidth">
                <UploadAvatar :after-upload="getUrl" :avatarUrl="form.avatarUrl" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="cancle">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>