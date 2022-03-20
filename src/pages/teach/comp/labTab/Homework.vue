<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import { stuLab } from './mock';

const showReview = (row: any) => {

}

</script>

<template>
    <TablePage :data="stuLab" emptyDes="本课程还没有学生" >
        <template v-slot:tableColumns>
            <el-table-column prop="uid" label="学生编号" width="140" />
            <el-table-column prop="name" label="学生姓名" width="140" />
            <el-table-column prop="isFinish" label="完成情况" width="140" />
            <el-table-column prop="codeTime" label="编码时长(分钟)" width="140" />
            <el-table-column label="查看代码">
                <template #default="scope">
                    <span class="textBtn">查看</span>
                </template>
            </el-table-column>
            <el-table-column label="实验报告">
                <template #default="scope">
                    <span class="textBtn">查看</span>
                </template>
            </el-table-column>
            <el-table-column label="实验评语">
                <template #default="scope">
                    <span class="textBtn">评语</span>
                </template>
            </el-table-column>
            <el-table-column label="实验评分">
                <template #default="scope">
                    <div v-if="scope.row.score >= 0">
                        <span>{{ scope.row.score }}</span>
                        <span class="textBtn">修改</span>
                    </div>
                    <div v-else>
                        <span class="textBtn">添加成绩</span>
                    </div>
                </template>
            </el-table-column>
        </template>
    </TablePage>
</template>

<style lang="less" scoped>
.textBtn {
    color: #409eff;
    &:hover {
        cursor: pointer;
    }
}
</style>