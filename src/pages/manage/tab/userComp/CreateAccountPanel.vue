<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { comfirm, useDialog } from '@/utils/helper';
import { addAccount } from '@/utils/services';
import { createAccountRule } from './rules';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const refEl = ref();
const labelWidth = '80px';
const form = reactive({
    email: '',
    number: '',
    role: 0,
    name: ''
})
const rules = reactive(createAccountRule);
const submit = () => {
    comfirm({
        type: 'submit',
        refEl,
        finallyCb: closeDialog,
        fetchApi: addAccount,
        params: {
            email: form.email,
            name: form.name,
            number: form.number,
            role: form.role,
        }
    })
}
const cancle = () => {
    refEl?.value?.resetFields?.();
    closeDialog()
}

defineExpose({
    openPanel: openDialog
})
</script>

<template>
    <el-dialog v-model="isDialogOpen" title="新建账户">
        <el-form :model="form" ref="refEl" :rules="rules">
            <el-form-item label="账户身份" :label-width="labelWidth" required>
                <el-radio-group v-model="form.role" size="large">
                    <el-radio :label="0" border>我是学生</el-radio>
                    <el-radio :label="1" border>我是老师</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="邮箱信息" :label-width="labelWidth" prop="email">
                <el-input v-model="form.email" placeholder="请输入账户邮箱"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="labelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item :label="form.role === 0 ? '学号' : '职工号'" :label-width="labelWidth" prop="number">
                <el-input v-model="form.number" placeholder="请输入签到名称"></el-input>
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