<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import StudPage from '../common/StudPage.vue';
import UploadCsv from '@/components/common/UploadCsv.vue';
import { useDialog, useCourseId, showFailWrap, loadCsv, showSuccessWrap } from '@/utils/helper';
import { checkJoinInApplication, fetchImportMemberTemplate } from '@/utils/services';
import { UPLOAD_CSV_STUDENT_TEMPLATE_URL } from '@/utils/option';

const { isDialogOpen, openDialog, closeDialog } = useDialog();
const courseId = useCourseId();

const refEl = ref();
const getMemberTemplate = () => {
    loadCsv(refEl?.value, '导入学生模板', fetchImportMemberTemplate, {});
};

const focusTab = ref('member');
const refMemberList = ref();
const refVerityList = ref();
const reloadMemberList = () => refMemberList?.value?.reload?.();
const reloadVerityList = () => refVerityList?.value?.reload?.();
const check = (userId: number, isPass: boolean) => {
    checkJoinInApplication({
        courseId,
        stuIds: [userId],
        isPermitted: isPass,
    }).then((res) => {
        if (res.code === 0) {
            showSuccessWrap({ text: '通过学生申请' });
            reloadMemberList();
            reloadVerityList();
        } else {
            showFailWrap({ text: '服务出错，请稍后再试' });
        }
    });
};
const uploadSuccessHandler = () => {
    reloadMemberList()
    closeDialog();
}
</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openDialog">导入学生列表</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="导入学生列表">
            <UploadCsv
                @upload="uploadSuccessHandler"
                :data="{ courseId }"
                :upload-url="UPLOAD_CSV_STUDENT_TEMPLATE_URL"
            />
            <template #footer>
                <span class="dialog-footer">
                    <BtnBlue size="large" @click="getMemberTemplate">下载模板文件</BtnBlue>
                    <el-button @click="closeDialog">取消</el-button>
                    <div ref="refEl"></div>
                </span>
            </template>
        </el-dialog>
        <el-tabs tab-position="top" v-model="focusTab">
            <el-tab-pane label="课程成员列表" name="member">
                <StudPage type="default" ref="refMemberList"></StudPage>
            </el-tab-pane>
            <el-tab-pane label="待审核学生列表" name="verify">
                <StudPage type="verify" ref="refVerityList">
                    <template v-slot:options>
                        <el-table-column label="操作" min-width="140">
                            <template #default="scope">
                                <div class="btnCt">
                                    <el-button
                                        type="success"
                                        size="default"
                                        @click="check(scope?.row?.userId, true)"
                                    >
                                        通过
                                    </el-button>
                                    <el-button
                                        type="danger"
                                        size="default"
                                        @click="check(scope?.row?.userId, false)"
                                    >
                                        拒绝
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                </StudPage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="less" scoped>
.ct {
    margin: 20px;
    margin-top: 0;
}

.btnCt {
    display: flex;
}
</style>