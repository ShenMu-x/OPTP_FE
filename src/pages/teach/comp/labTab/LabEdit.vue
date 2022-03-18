<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UploadFile from '@/components/common/UploadFile.vue';
import { labRules } from '../form/rule';
import { showFailWrap, showSuccessWrap, useLabId, useDirect } from '@/utils/helper';
import { editLab, getLabById, deleteLab } from '@/utils/services';

const refFormEl = ref();
const formLabelWidth = '80px';
const labId = useLabId();
const { redirect, routerBack } = useDirect();

const form = reactive({
    title: '',
    content: '',
    attachmentUrl: '',
    deadLine: '',
})

getLabById(labId).then(res => {
    if (res.code === 0) {
        form.title = res.data?.title || "";
        form.content = res.data?.content || "";
        form.attachmentUrl = res.data?.attachmentUrl || "";
        form.deadLine = res.data?.deadLine || "";
    } else if (res.code === -19999) {
        redirect('/404');
    }
})

const formRules = reactive(labRules);
const updateFile = (url: string) => {
    form.attachmentUrl = url;
}

const submitHandler = () => {
    refFormEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            ElMessageBox.confirm(
                '确定提交？',
                '实验信息提交确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                    lockScroll: false,
                }
            )
                .then(() => {
                    editLab({
                        labId: labId,
                        title: form.title,
                        content: form.content,
                        attachmentUrl: form.attachmentUrl,
                        deadLine: form.deadLine,
                    }).then((value: any) => {
                        if (value.code === 0) {
                            ElMessage({
                                type: 'success',
                                message: '修改成功',
                            })
                        }
                    })

                })
                .catch(() => {
                    // 取消提交
                })
        }
    });
}

const deleteHandler = () => {
    ElMessageBox.confirm(
        '确定删除？',
        '实验删除确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            lockScroll: false,
        }
    )
        .then(() => {
            deleteLab(labId)
                .then((value: any) => {
                    if (value.code === 0) {
                        showSuccessWrap({
                            text: '实验已删除',
                            closeCb: () => { routerBack() }
                        })
                    } else {
                        showFailWrap({
                            text: '删除失败，请稍后再试',
                        })
                    }
                })

        })
        .catch(() => {
            // 取消删除
        })
}

</script>

<template>
    <el-form :model="form" :rules="formRules" ref="refFormEl">
        <el-form-item label="实验编号" :label-width="formLabelWidth" prop="title">
            <el-input disabled v-model="labId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验名称" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off" placeholder="请输入实验名称"></el-input>
        </el-form-item>
        <el-form-item label="实验描述" :label-width="formLabelWidth" prop="content">
            <el-input
                v-model="form.content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="请输入实验描述"
                maxlength="100"
                show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth" prop="deadLine">
            <el-date-picker v-model="form.deadLine" type="datetime" placeholder="请选择截止时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="实验附件" :label-width="formLabelWidth">
            <el-link v-if="form.attachmentUrl" :href="form.attachmentUrl" type="primary">点击下载已有附件</el-link>
            <div v-else>暂无附件</div>
        </el-form-item>
        <el-form-item label="更新附件" :label-width="formLabelWidth">
            <UploadFile type="attachment" @update="updateFile" />
        </el-form-item>
    </el-form>
    <div class="btnCt">
        <el-button color="#002D54" type="primary" @click="submitHandler">确认修改</el-button>
        <el-button type="danger" @click="deleteHandler">删除实验</el-button>
    </div>
</template>

<style lang="less" scoped>
.btnCt {
    margin-top: -10px;
    margin-bottom: 40px;
}
</style>