<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import { useLabId } from '@/utils/helper';
import { getLabPlagiarism } from '@/utils/services';
import BtnBlue from '@/components/common/BtnBlue.vue';
import Tag from '@/components/common/Tag.vue';

const labId = useLabId();
const common = { labId }
const changeScore = (row: any) => {
    console.log('修改成绩');
}
</script>

<template>
    <TablePage :fetchData="getLabPlagiarism" :common="common" emptyDes="本课程还没有学生">
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
                    <el-button size="default" @click="changeScore(scope.row)">修改评分</el-button>
                    <BtnBlue>查看代码</BtnBlue>
                </template>
            </el-table-column>
        </template>
    </TablePage>
</template>

<style lang="less" scoped>
.tag {
    padding-left: 0;
}
</style>