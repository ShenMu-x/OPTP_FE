<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { useLabId } from '@/utils/helper';
import { getHistoryPlagiarismList } from '@/utils/services';

const pageSize = 6;
const labId = useLabId();
const common = { labId };
const emits = defineEmits(['getHistoryReport']);
const showHistoryReportInfo = (row: { id: number; createdAt: string }) => {
    emits('getHistoryReport', {
        reportId: row.id,
        reportCreatedAt: row.createdAt,
    });
};
</script>
<template>
    <TablePage
        :fetchData="getHistoryPlagiarismList"
        :common="common"
        emptyDes="暂无历史记录"
        :page-size="pageSize"
        style="min-height: 400px"
    >
        <template v-slot:tableColumns>
            <el-table-column prop="createdAt" label="报告创建时间" min-width="240" />
            <el-table-column label="操作" min-width="120">
                <template #default="scope">
                    <BtnBlue @click="showHistoryReportInfo(scope.row)">点击查看</BtnBlue>
                </template>
            </el-table-column>
        </template>
    </TablePage>
</template>