<script lang="ts" setup>
import { ref } from 'vue';
import UploadCsv from '@/components/common/UploadCsv.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { useDialog, loadCsv } from '@/utils/helper';
import { getStudentCsvTemplate } from '@/utils/services';
import { MANAGE_UPLOAD_CSV_STUDENT_TEMPLATE_URL } from '@/utils/option';

const { isDialogOpen, openDialog, closeDialog } = useDialog();

const refEl = ref();
const loadTemplate = () => {
    loadCsv(refEl, '导入学生信息模板', getStudentCsvTemplate);
}
defineExpose({
    openPanel: openDialog
})
</script>

<template>
    <el-dialog v-model="isDialogOpen" title="导入学生信息">
        <UploadCsv :uploadUrl="MANAGE_UPLOAD_CSV_STUDENT_TEMPLATE_URL" @upload="closeDialog"/>
        <template #footer>
            <span class="dialog-footer">
                <div ref="refEl"></div>
                <BtnBlue @click="loadTemplate" size="large">下载导入模板</BtnBlue>
                <el-button @click="closeDialog">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang="less" scoped>
</style>