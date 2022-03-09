<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Plus, Download } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '../common/BtnCt.vue';
import BtnBlue from '../common/BtnBlue.vue';
import { getCourseId, useDialog } from './logic';
import { createAttend, getCourseAttendRecords } from "@/utils/services";

const courseId = getCourseId();

const load = () => { }

const form = reactive({
    secretKey: '',
    courseId,
    duration: 60 * 5,
    name: ''
})

const {
    isDialogOpen,
    openDialog,
    closeDialog
} = useDialog()
const submit = () => {
    createAttend({
        secretKey: form.secretKey,
        courseId,
        duration: form.duration,
        name: form.name,
    })
    // closeDialog()
}
const cancle = () => {
    // reset
    closeDialog();
}

</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openDialog">新建签到</el-button>
                <el-button :icon="Download" @click="load">下载签到表</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="新建签到">
            <el-form :model="form" ref="refEl">
                <el-form-item label="签到名称" label-width="120px">
                    <el-input v-model="form.name" placeholder="请输入签到名称"></el-input>
                </el-form-item>
                <el-form-item label="签到时长(秒)" label-width="120px">
                    <el-input-number v-model="form.duration" :min="30" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="cancle">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :common="{ courseId }" :fetch-data="getCourseAttendRecords">
            <template v-slot:tableColumns>
                <el-table-column prop="name" label="签到名称" min-width="100" />
                <el-table-column prop="createAt" label="创建时间" min-width="180" />
                <el-table-column prop="total" label="应签到人数" min-width="100" />
                <el-table-column prop="actual" label="实际签到人数" min-width="100" />
                <el-table-column label="查看详情" min-width="140">
                    <template #default="scope">
                        <!-- WAITFIX -->
                        <BtnBlue>详情</BtnBlue>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="danger" size="default">删除</el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
.ct {
    margin: 20px;
    margin-top: 0;
}
</style>