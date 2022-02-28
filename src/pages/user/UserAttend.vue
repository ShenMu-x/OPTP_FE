<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHeader from '@/components/common/PageHeader.vue';
import TablePage from '@/components/common/TablePage.vue';
import { getMyAttend } from '@/utils/services';

const check = (id: number) => {

}
</script>

<template>
    <PageHeader content="签到管理" />
    <div class="ct">
        <div class="card">
            <div class="title">当前签到显示</div>
            <TablePage :common="{ courseId: 2 }" text="目前没有签到" :fetch-data="getMyAttend">
                <template v-slot:tableColumns>
                    <el-table-column prop="name" label="签到名称" width="100" />
                    <el-table-column prop="createAt" label="创建时间" width="140" />
                    <el-table-column prop="title" label="应签到人数" width="140" />
                    <el-table-column prop="content" label="实际签到人数" width="140" />
                    <el-table-column prop="isCheckIn" label="操作" width="140">
                        <template #default="scope">
                            <el-button
                                type="success"
                                size="default"
                                @click="check(scope?.row?.checkinRecordId)"
                            >签到</el-button>
                        </template>
                    </el-table-column>
                </template>
            </TablePage>
        </div>
        <div class="card">
            <div class="title">以往签到记录</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ct {
    width: calc(100% - 160px);
    height: 700px;
    margin: 0 80px 60px;
    background-color: #fff;
    overflow: hidden;
}
.title {
    display: flex;
    text-align: left;
    font-size: 22px;
    margin: 20px;
}

.card {
    margin: 20px;
}
</style>