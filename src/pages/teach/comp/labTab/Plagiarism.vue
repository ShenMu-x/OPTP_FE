<script lang="ts" setup>
import { Ref, ref } from 'vue';
import BtnCt from '@/components/common/BtnCt.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import TablePageFEPagination from '@/components/common/TablePageFEPagination.vue';
import LabPlagiarismDialog from './LabPlagiarismDialog.vue';
import HistoryPlagiarismPanel from './HistoryPlagiarismPanel.vue';
import { useLabId, useDialog, getCurrentTime } from '@/utils/helper';
import { getCurrentLabPlagiarism, getHistoryLabPlagiarism, ResType } from '@/utils/services';

const refTableEl = ref();
const reportCreatedTime = ref(getCurrentTime());
let fetchPlaiarismData: Ref<(common: any) => ResType<any>> = ref(getCurrentLabPlagiarism);

const labId = useLabId();
const common = ref();
const getCurrentLabPlagiarismWrap = () => {
    fetchPlaiarismData.value = getCurrentLabPlagiarism;
    common.value = { labId };
    refTableEl?.value?.fetchTableData?.();
    reportCreatedTime.value = getCurrentTime();
};

const {
    isDialogOpen: isHistoryPanelOpen,
    openDialog: openHistoryPanel,
    closeDialog: closeHistoryPanel,
} = useDialog();
const getHistoryLabPlagiarismWrap = (row: { reportId: number; reportCreatedAt: string }) => {
    fetchPlaiarismData.value = getHistoryLabPlagiarism;
    common.value = { reportId: row.reportId };
    refTableEl?.value?.fetchTableData?.();
    reportCreatedTime.value = row.reportCreatedAt;
    closeHistoryPanel();
};

const { isDialogOpen: isDetailPanelOpen, openDialog: openDetailPanel } = useDialog();
const dialogUrl = ref('');
const clickToOpenDetailPanel = (url: string) => {
    dialogUrl.value = url;
    openDetailPanel();
};
</script>

<template>
    <div>
        <BtnCt style="margin-top: 0">
            <template v-slot:botton>
                <BtnBlue @click="getCurrentLabPlagiarismWrap" size="large">
                    生成代码查重信息
                </BtnBlue>
                <BtnBlue @click="openHistoryPanel" size="large">查看历史查重记录</BtnBlue>
            </template>
        </BtnCt>
        <el-dialog v-model="isHistoryPanelOpen" title="历史查重记录" width="80%">
            <HistoryPlagiarismPanel @get-history-report="getHistoryLabPlagiarismWrap" />
        </el-dialog>
        <el-dialog v-model="isDetailPanelOpen" title="实验代码查重记录" width="80%">
            <LabPlagiarismDialog :url="dialogUrl" />
        </el-dialog>
        <TablePageFEPagination
            :fetch-data="fetchPlaiarismData"
            empty-des="暂无查重信息"
            :common="common"
            ref="refTableEl"
        >
            <template v-slot:tableColumns>
                <el-table-column label="报告时间" min-width="170">
                    <template #default>
                        {{ reportCreatedTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="num1" label="学生一学号" min-width="120" />
                <el-table-column prop="num2" label="学生二学号" min-width="120" />
                <el-table-column prop="realName1" label="学生一姓名" min-width="120" />
                <el-table-column prop="realName2" label="学生二姓名" min-width="120" />
                <el-table-column prop="similarity" label="相似度" min-width="120" />
                <el-table-column label="实验报告" min-width="100">
                    <template #default="scope">
                        <BtnBlue @click="clickToOpenDetailPanel(scope.row.url)">查看</BtnBlue>
                    </template>
                </el-table-column>
            </template>
        </TablePageFEPagination>
    </div>
</template>