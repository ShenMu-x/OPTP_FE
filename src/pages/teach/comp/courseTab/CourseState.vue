<script lang="ts" setup>
import { Download, Pointer } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import TablePage from '@/components/common/TablePage.vue';
import { exportScoreFile, getCourseScoreList } from '@/utils/services';
import { useCourseId, useDirect } from '@/utils/helper';

const courseId = useCourseId();
const common = { courseId }
const { directTo } = useDirect();
const exportScore = () => {
    exportScoreFile(courseId);
}
</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Download" @click="exportScore">导出成绩列表</el-button>
                <el-button :icon="Pointer" @click="directTo(`/teach/course_coding/${courseId}`)">查看学生编码活跃度</el-button>
            </template>
        </BtnCt>
        <TablePage :common="common" :fetch-data="getCourseScoreList" text="本课程暂无学生">
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