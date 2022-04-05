<script lang="ts" setup>
import { ref } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import TablePage from '@/components/common/TablePage.vue';
import Tag from '@/components/common/Tag.vue';
import { getMyAttendRecords, getMyAttendRecordsInProgress, AttendType, checkAttend } from '@/utils/services';
import { showSuccessWrap, showFailWrap } from '@/utils/helper';

const refEl = ref();
const data = ref<Array<AttendType>>([])
const refreshAttend = () => {
    getMyAttendRecordsInProgress()
    .then(res => {
        if (res.code === 0) data.value = res.data || [];
        else data.value = []
    })
}

const checkAttendHandler = (courseId: number) => {
    checkAttend(courseId)
        .then(res => {
            if (res.code === 0) {
                showSuccessWrap({text: '已签到'});
                refreshAttend();
                refEl?.value?.reload?.();
            } else {
                showFailWrap({text: '签到失败，请稍后再试'})
            }
        })
}
refreshAttend();
</script>

<template>
    <PageHeader content="签到管理" />
    <div class="ct">
        <div class="card">
            <div class="title">当前签到显示</div>
            <el-table
                :data="data"
                stripe
                highlight-current-row
                style="width: 100%"
                empty-text="当前暂无正在进行的签到"
            >
                <el-table-column prop="name" label="签到名称" min-width="100" />
                <el-table-column prop="courseName" label="所属课程" min-width="200" />
                <el-table-column prop="createAt" label="创建时间" min-width="180" />
                <el-table-column prop="deadLine" label="结束时间" min-width="180" />
                <el-table-column prop="isCheckIn" label="操作" min-width="140">
                    <template #default="scope">
                        <el-button
                            type="success"
                            size="default"
                            @click="checkAttendHandler(scope?.row?.courseId)"
                        >签到</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="card">
            <div class="title">以往签到记录</div>
            <TablePage text="目前没有签到记录" :fetch-data="getMyAttendRecords" ref="refEl">
                <template v-slot:tableColumns>
                    <el-table-column prop="name" label="签到名称" min-width="100" />
                    <el-table-column prop="courseName" label="所属课程" min-width="200" />
                    <el-table-column prop="createAt" label="创建时间" min-width="180" />
                    <el-table-column prop="deadLine" label="结束时间" min-width="180" />
                    <el-table-column prop="isFinish" label="签到状态" min-width="140">
                        <template #default="scope">
                            <Tag
                                v-if="scope?.row?.isFinish"
                                :is-text="true"
                                :border="true"
                                type="green"
                                green-text="已签到"
                            />
                            <Tag v-else :is-text="true" :border="true" type="red" red-text="未签到" />
                        </template>
                    </el-table-column>
                </template>
            </TablePage>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ct {
    width: calc(100% - 160px);
    margin: 0 80px 60px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
}
.title {
    display: flex;
    text-align: left;
    font-size: 22px;
}

.card {
    margin: 20px 40px;
}
</style>