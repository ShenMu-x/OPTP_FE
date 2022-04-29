<script lang="ts" setup>
import { ref } from 'vue';
import { Download, Pointer } from '@element-plus/icons-vue';
import BtnCt from '@/components/common/BtnCt.vue';
import TablePage from '@/components/common/TablePage.vue';
import { useCourseId, useDirect, loadCsv } from '@/utils/helper';
import { exportScore, getCourseScoreList } from '@/utils/services';

const refEl = ref();
const courseId = useCourseId();
const { routerToCourseCodingList } = useDirect();
const exportScoreHandler = () => loadCsv(refEl?.value, '学生成绩表', exportScore, courseId);
const clickToCodingTable = () => routerToCourseCodingList('direct', { courseId })
</script>

<template>
    <div class="ct" ref="refEl">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Download" @click="exportScoreHandler">导出成绩列表</el-button>
                <el-button :icon="Pointer" @click="clickToCodingTable">查看学生编码活跃度</el-button>
            </template>
        </BtnCt>
        <TablePage :common="{ courseId }" :fetch-data="getCourseScoreList" text="本课程暂无学生">
            <template v-slot:tableColumns>
                <el-table-column prop="num" label="学生学号" min-width="180" />
                <el-table-column prop="realName" label="学生姓名" min-width="140" />
                <el-table-column prop="shouldCheckIn" label="应签到数" min-width="140" />
                <el-table-column prop="ackCheckIn" label="已签到数" min-width="140" />
                <el-table-column prop="avgScore" label="平均成绩" min-width="140" />
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