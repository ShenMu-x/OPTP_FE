<script lang="ts" setup>
import { ref } from 'vue';
import { Download } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import ScorePage from '../common/ScorePage.vue';
import BtnBlue from '../common/BtnBlue.vue';
import { exportScoreFile } from '@/utils/services';
import { getCourseId, useDialog } from './logic';

const courseId = getCourseId();

const {
    isDialogOpen,
    openDialog,
    closeDialog
} = useDialog()

const focusTab = ref('score');
const changeTab = () => {
    console.log(focusTab.value);
}

const exportScore = () => {
    exportScoreFile(courseId);
}

const getCoding = (userId: number) => {
    openDialog();
}

</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Download" @click="exportScore">导出成绩列表</el-button>
            </template>
        </BtnCt>
        <el-tabs tab-position="top" v-model="focusTab" @tab-click="changeTab">
            <el-tab-pane label="学生成绩" name="score">
                <ScorePage>
                    <template v-slot:columns>
                        <el-table-column prop="shouldCheckIn" label="应签到数" width="200" />
                        <el-table-column prop="ackCheckIn" label="已签到数" width="200" />
                        <el-table-column prop="avgScore" label="平均成绩" width="200" />
                    </template>
                </ScorePage>
            </el-tab-pane>
            <el-tab-pane label="学生编码活跃度" name="active">
                <ScorePage>
                    <template v-slot:columns>
                        <el-table-column label="操作">
                            <template #default="scope">
                                 <BtnBlue @click="getCoding(scope?.row?.userId)">详情</BtnBlue>
                            </template>
                        </el-table-column>
                    </template>
                </ScorePage>
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