<script lang="ts" setup>
import { ref } from 'vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import { getAllIdeContainer, closeIDE } from '@/utils/services';
import { showFailWrap, showSuccessWrap, useReloader } from '@/utils/helper';

const refTableEl = ref();
const isClosing = ref(false);
const closingIdeId = ref(0);
const closeHandler = async (row: { containerId: number; labIsEnd: boolean; }) => {
    isClosing.value = true;
    closingIdeId.value = row.containerId
    closeIDE(row.containerId)
        .then(res => {
            if (res.code === 0) {
                showSuccessWrap({ text: 'IDE已关闭' })
                row.labIsEnd = true;
            } else {
                showFailWrap({ text: '服务出现问题，请稍后再试' })
            }
            isClosing.value = false;
        })
}
const {
    isReloading,
    reloadHandler,
    finishReload,
} = useReloader(refTableEl);
</script>

<template>
    <div class="layout">
        <BtnCt>
            <template v-slot:botton>
                <LoadBtn @reload="reloadHandler" :is-loding="isReloading" />
            </template>
        </BtnCt>
        <TablePage :page-size="6" :fetch-data="getAllIdeContainer" ref="refTableEl" emptyDes="暂无正在运行的实验IDE"
            @reloadend="finishReload" :no-tip="false">
            <template v-slot:tableColumns>
                <el-table-column label="ide编号" prop="containerId" min-width="125" />
                <el-table-column label="状态" min-width="80">
                    <template #default="scope">
                        <span v-if="scope.row.labIsEnd">已结束</span>
                        <span v-else>进行中</span>
                    </template>
                </el-table-column>
                <el-table-column label="实验名称" prop="labName" min-width="100" />
                <el-table-column label="课程名称" prop="courseName" min-width="100" />
                <el-table-column label="学生姓名" prop="studentName" min-width="100" />
                <el-table-column label="内存占用" prop="size" min-width="90" />
                <el-table-column label="教师姓名" min-width="120">
                    <template #default="scope">
                        <span v-if="scope.row.teacherInfo?.teacherName">{{ scope.row.teacherInfo.teacherName }}</span>
                        <span v-else>本ide非教师开启</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" min-width="100" />
                <el-table-column label="操作" min-width="120">
                    <template #default="scope">
                        <el-button :loading="scope.row.containerId === closingIdeId && isClosing" type="danger"
                            size="default" @click="closeHandler(scope.row)" v-if="!scope.row.labIsEnd">
                            关闭IDE
                        </el-button>
                        <el-button disabled type="danger" size="default" @click="closeHandler(scope.row)" v-else>
                            关闭IDE
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
</style>