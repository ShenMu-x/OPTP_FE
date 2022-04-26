<script lang="ts" setup>
import { ref } from 'vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import Tag from '@/components/common/Tag.vue';
import { useLabId, useDialog, showFailWrap, showSuccessWrap, useDirect, ParamsEnum } from '@/utils/helper';
import { getHomeworkStatus, setLabScore, getIDEtoCheckCode } from '@/utils/services';

const labId = useLabId();
const { isDialogOpen: isScoreDialogOpen, openDialog: openScoreDialog } = useDialog();
const common = { labId }
const score = ref();
const scoreInp = ref(0);
const openScorePanel = (row: any) => {
    score.value = row;
    scoreInp.value = row.score;
    openScoreDialog();
}
const onScorePanelClose = () => {
    score.value = {};
    scoreInp.value = 0;
}
const changeScore = () => {
    if (scoreInp.value < 0 || scoreInp.value > 100) {
        showFailWrap({ text: '请输入合法成绩(0-100)' })
    } else {
        setLabScore({
            userId: score.value?.userId,
            score: scoreInp.value,
            labId
        }).then(res => {
            if (res.code === 0) showSuccessWrap({ text: '成绩已修改' })
            else showFailWrap({ text: '成绩修改失败，请稍后再试' })
        })
    }
}

const { routerToIDE } = useDirect();
const checkCode = (row: { labId: number; userId: number; }) => {
    getIDEtoCheckCode({
        labId: row.labId,
        studentId: row.userId
    }).then(res => {
        if (res.code === 0 && res.data?.url) {
            routerToIDE('direct', {
                ideUrl: res.data.url
            })
        }
    })
}
</script>

<template>
    <TablePage :fetchData="getHomeworkStatus" :common="common" emptyDes="本课程还没有学生">
        <template v-slot:tableColumns>
            <el-table-column prop="number" label="学生学号" min-width="120" />
            <el-table-column prop="name" label="学生姓名" min-width="100" />
            <el-table-column label="状态" min-width="100">
                <template #default="scope">
                    <Tag class="tag" type="green" :isText="true" greenText="点击下载" v-if="scope.row.isFinish" />
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
                    <el-button size="default" @click="openScorePanel(scope.row)">修改评分</el-button>
                    <BtnBlue @click="checkCode(scope.row)">查看代码</BtnBlue>
                </template>
            </el-table-column>
        </template>
    </TablePage>
    <el-dialog v-model="isScoreDialogOpen" title="修改学生成绩" @closed="onScorePanelClose">
        <div class="scoreDialogCt">
            <div class="titleCt">
                <span class="title">姓名:</span>
                {{ score?.name }}
            </div>
            <div class="titleCt">
                <span class="title">学号:</span>
                {{ score?.number }}
            </div>
            <div class="titleCt">
                <span class="title">成绩:</span>
                <el-input type="number" :min="0" :max="100" size="default" v-model.number="scoreInp"></el-input>
            </div>
        </div>
        <BtnBlue class="btn" @click="changeScore">修改成绩</BtnBlue>
    </el-dialog>
</template>

<style lang="less" scoped>
.tag {
    padding-left: 0;
}

.scoreDialogCt {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
}

.titleCt {
    text-align: left;
    display: flex;
    align-items: center;
    min-width: 130px;
    flex: 1 0 130px;
    margin-bottom: 10px;
}

.title {
    width: 40px;
    flex: 0 0 40px;
    line-height: 20px;
}

.btn {
    width: 100px;
}
</style>