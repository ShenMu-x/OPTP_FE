<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import StudPage from '../common/StudPage.vue';
import { useCourseId, useDialog } from '@/utils/helper';
import StudTC from './StudTC.vue';
import TableCommon from '../common/TableCommon.vue';
import { getStudents, getVerifyStuds } from '@/utils/services';
const router = useRouter();
const route = useRoute();

const courseId = useCourseId();
const { isDialogOpen, openDialog, closeDialog } = useDialog()

const importList = () => {

}

const focusTab = ref('member');
const changeTab = () => {
    console.log(focusTab.value);
}

const pass = (userId: number) => {

}
const reject = (userId: number) => {

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
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="text">详情</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </StudPage>
            </el-tab-pane>
            <el-tab-pane label="待审核学生列表" name="verify">
                <StudPage type="verify">
                    <template v-slot:options>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button
                                    type="success"
                                    size="default"
                                    @click="pass(scope?.row?.userId)"
                                >通过</el-button>
                                <el-button
                                    type="danger"
                                    size="default"
                                    @click="reject(scope?.row?.userId)"
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