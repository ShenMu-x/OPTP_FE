<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import BtnBlue from '../common/BtnBlue.vue';
import StudPage from '../common/StudPage.vue';
import { useDialog, useCourseId } from '@/utils/helper';
import { checkJoinInApplication } from '@/utils/services';

const { isDialogOpen, openDialog, closeDialog } = useDialog()
const courseId = useCourseId();

const importList = () => {

}

const focusTab = ref('member');
const changeTab = () => {
    console.log(focusTab.value);
}

const check = (userId: number, isPass: boolean) => {
    console.log('check', userId, isPass);
    // checkJoinInApplication({
    //     courseId,
    //     stuIds: [userId],
    //     isPermitted: isPass,
    // })
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
        <el-tabs tab-position="top" v-model="focusTab" @tab-click="changeTab">
            <el-tab-pane label="课程成员列表" name="member">
                <StudPage type="default">
                    <template v-slot:options>
                        <el-table-column label="操作" min-width="140">
                            <template #default="scope">
                                <BtnBlue>详情</BtnBlue>
                            </template>
                        </el-table-column>
                    </template>
                </StudPage>
            </el-tab-pane>
            <el-tab-pane label="待审核学生列表" name="verify">
                <StudPage type="verify">
                    <template v-slot:options>
                        <el-table-column label="操作" min-width="140">
                            <template #default="scope">
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
</style>