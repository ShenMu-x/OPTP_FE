<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import StudPage from '../common/StudPage.vue';
import { useDialog, useCourseId, showFailWrap } from '@/utils/helper';
import { checkJoinInApplication } from '@/utils/services';

const { isDialogOpen, openDialog, closeDialog } = useDialog()
const courseId = useCourseId();

const importList = () => {

}
const refMemberList = ref()
const refVerityList = ref()

const focusTab = ref('member');
const check = (userId: number, isPass: boolean) => {
    checkJoinInApplication({
        courseId,
        stuIds: [userId],
        isPermitted: isPass,
    }).then(res => {
        if (res.code === 0) {
            refMemberList?.value?.reload?.();
            refVerityList?.value?.reload?.();
        } else {
            showFailWrap({text: '服务出错，请稍后再试'})
        }
    })
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
            upload组件
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取消</el-button>
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
                                    >通过</el-button>
                                    <el-button
                                        type="danger"
                                        size="default"
                                        @click="check(scope?.row?.userId, false)"
                                    >拒绝</el-button>
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