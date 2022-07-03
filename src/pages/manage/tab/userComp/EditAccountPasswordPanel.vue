<script lang="ts" setup>
import { ref, reactive, toRef, watch } from 'vue';
import { comfirm, useDialog } from '@/utils/helper';
import { editAccountPassword } from '@/utils/services';
import { userInfoType } from '@/type';
import { editAccountPasswordRule } from './rules';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const refEl = ref();
const labelWidth = '80px';
const props = defineProps<{ account: userInfoType }>();
const account = toRef(props, 'account');
const rules = reactive(editAccountPasswordRule);
const form = reactive({
    userId: props.account.userId,
    realName: props.account.realName,
    num: props.account.num,
    password: '',
});
const refreshInfo = () => {
    form.userId = account.value.userId;
    form.realName = account.value.realName;
    form.num = account.value.num;
};
watch(account, (newV, oldV) => {
    if (newV.userId !== oldV.userId) refreshInfo();
});
const emits = defineEmits(['submit']);
const submit = () => {
    comfirm({
        type: 'edit',
        refEl,
        successCb: () => {
            emits('submit');
        },
        finallyCb: closeDialog,
        fetchApi: editAccountPassword,
        params: {
            user_id: form.userId,
            password: form.password,
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
    <el-dialog v-model="isDialogOpen" title="修改账户密码">
        <el-form :model="form" ref="refEl" :rules="rules">
            <el-form-item label="姓名" :label-width="labelWidth">
                <el-input v-model="form.realName" placeholder="用户姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="账号" :label-width="labelWidth">
                <el-input v-model="form.num" placeholder="用户账号" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="labelWidth" required>
                <el-input v-model="form.password" placeholder="请输入新的账户密码" clearable></el-input>
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