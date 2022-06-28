<script lang="ts" setup>
import { ref, reactive } from 'vue';
import FormTip from '@/components/common/FormTip.vue';
import { comfirm, useDialog } from '@/utils/helper';
import { addAccount } from '@/utils/services';
import { defaultUserEmailSuffix, initialAccountPassword } from '@/utils/option';
import { createAccountRule } from './rules';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const refEl = ref();
const labelWidth = '80px';
const form = reactive({
    number: '',
    role: 0,
    name: '',
});
const rules = reactive(createAccountRule);
const submit = () => {
    comfirm({
        type: 'submit',
        refEl,
        finallyCb: closeDialog,
        fetchApi: addAccount,
        params: {
            email: `${form.number}${defaultUserEmailSuffix}`,
            name: form.name,
            number: form.number,
            role: form.role,
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
    <el-dialog v-model="isDialogOpen" title="新建账户" class="dialog">
        <FormTip>
            <template #tipinfo>
                账户初始密码为
                <strong>{{ initialAccountPassword }}</strong>
            </template>
        </FormTip>
        <el-form :model="form" ref="refEl" :rules="rules">
            <el-form-item label="账户身份" :label-width="labelWidth" required>
                <el-radio-group v-model="form.role" size="large">
                    <el-radio :label="0" border>我是学生</el-radio>
                    <el-radio :label="1" border>我是老师</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="姓名" :label-width="labelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item :label="'账号'" :label-width="labelWidth" prop="number">
                <el-input v-model="form.number" placeholder="请输入用户账号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱信息" :label-width="labelWidth" prop="number">
                <el-input v-model="form.number" placeholder="账户邮箱为M邮箱" disabled>
                    <template #append>{{ defaultUserEmailSuffix }}</template>
                </el-input>
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