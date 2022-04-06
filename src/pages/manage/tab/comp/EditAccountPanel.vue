<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import { Plus, Download, Upload } from '@element-plus/icons-vue';
import { useDialog } from '@/utils/helper';
import { editAccountInfo } from '@/utils/services';

const { isDialogOpen, openDialog, closeDialog } = useDialog();

defineExpose({
    openPanel: openDialog
})
</script>

<template>
    <el-dialog v-model="isDialogOpen" title="新建账户">
        <!-- <el-form :model="form" ref="refEl">
            <el-form-item label="签到名称" label-width="120px">
                <el-input v-model="form.name" placeholder="请输入签到名称"></el-input>
            </el-form-item>
            <el-form-item label="签到时长(分钟)" label-width="120px">
                <el-input-number v-model="form.duration" :min="5" style="margin-right: 10px" />
                <span class="note">签到时长至少5分钟</span>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="cancle">取消</el-button>
            </span>
        </template> -->
    </el-dialog>
</template>

<style lang="less" scoped>
</style>