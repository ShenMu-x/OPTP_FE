<script lang="ts" setup>
import { ref } from 'vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import Tag from '@/components/common/Tag.vue';
import { useLabId, useDialog, showFailWrap, showSuccessWrap, useDirect } from '@/utils/helper';
import { getHomeworkStatus, setLabScore } from '@/utils/services';

const labId = useLabId();
const common = { labId };
const refTableEl = ref();

const {
    isDialogOpen: isScoreDialogOpen,
    openDialog: openScoreDialog,
    closeDialog: closeScoreDialog,
} = useDialog();

const currentRowItem = ref();
const scoreInput = ref(0);
const openScorePanel = (row: any) => {
    currentRowItem.value = row;
    scoreInput.value = row.score;
    openScoreDialog();
};
const onScorePanelClose = () => {
    currentRowItem.value = {};
    scoreInput.value = 0;
};
const changeScore = () => {
    if (scoreInput.value < 0 || scoreInput.value > 100) {
        showFailWrap({ text: '请输入合法成绩(0-100)' });
    } else {
        setLabScore({
            userId: currentRowItem.value?.userId,
            score: scoreInput.value,
            labId,
        }).then((res) => {
            if (res.code === 0) {
                showSuccessWrap({ text: '成绩已修改' });
                currentRowItem.value.score = scoreInput.value; // 利用对象特性，无需再次拉取数据更新表格数据
                closeScoreDialog();
            } else {
                showFailWrap({ text: '成绩修改失败，请稍后再试' });
            }
        });
    }
};

const { routerToIDE } = useDirect();
const checkCode = (row: { labId: number; userId: number }) =>
    routerToIDE({
        type: 'direct',
        params: { labId: row.labId },
        query: { student: row.userId },
    });
</script>

<template>
    <TablePage
        :fetchData="getHomeworkStatus"
        :common="common"
        emptyDes="本课程还没有学生"
        ref="refTableEl"
    >
        <template v-slot:tableColumns>
            <el-table-column prop="number" label="学生学号" min-width="120" />
            <el-table-column prop="name" label="学生姓名" min-width="100" />
            <el-table-column label="状态" min-width="100">
                <template #default="scope">
                    <Tag
                        class="tag"
                        type="green"
                        :isText="true"
                        greenText="点击下载"
                        v-if="scope.row.isFinish"
                    />
                    <Tag class="tag" type="red" :isText="true" redText="尚未提交" v-else />
                </template>
            </el-table-column>
            <el-table-column prop="codingTime" label="编码时长(分钟)" min-width="140" />
            <el-table-column prop="score" label="评分" min-width="60" />
            <el-table-column label="实验报告" min-width="100">
                <template #default="scope">
                    <a :href="scope.row.reportUrl" v-if="scope.row.reportUrl">点击下载</a>
                    <span v-else>尚未提交</span>
                </template>
            </el-table-column>
            <el-table-column label="实验评语" min-width="100">
                <template #default="scope">
                    <span v-if="!scope.row.comment">暂无评语</span>
                    <BtnBlue v-else>查看评语</BtnBlue>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="240">
                <template #default="scope">
                    <el-button size="default" @click="openScorePanel(scope.row)">
                        修改成绩
                    </el-button>
                    <BtnBlue @click="checkCode(scope.row)">查看代码</BtnBlue>
                </template>
            </el-table-column>
        </template>
    </TablePage>
    <el-dialog v-model="isScoreDialogOpen" title="修改学生成绩" @closed="onScorePanelClose">
        <div class="scoreDialogCt">
            <el-row>
                <el-col :span="12">
                    <div class="dialogFieldCt">
                        <div class="dialogFieldLabel">姓名:</div>
                        {{ currentRowItem?.name }}
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="dialogFieldCt">
                        <div class="dialogFieldLabel">学号:</div>
                        {{ currentRowItem?.number }}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="dialogFieldCt">
                        <div class="dialogFieldLabel">成绩:</div>
                        <el-input
                            type="number"
                            :min="0"
                            :max="100"
                            size="default"
                            v-model.number="scoreInput"
                        ></el-input>
                    </div>
                </el-col>
            </el-row>
        </div>
        <BtnBlue class="changeScoreBtn" @click="changeScore">修改成绩</BtnBlue>
    </el-dialog>
</template>

<style lang="less" scoped>
.tag {
    padding-left: 0;
}

.scoreDialogCt {
    margin: 20px 30px;
}

.dialogFieldCt {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.dialogFieldLabel {
    width: 40px;
    flex: 0 0 40px;
    font-weight: bold;
}

.changeScoreBtn {
    width: 100px;
}
</style>