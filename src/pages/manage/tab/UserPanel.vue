<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import { Plus, Download } from '@element-plus/icons-vue';
</script>

<template>
    <div class="layout">
        <!-- <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openDialog">新建签到</el-button>
                <el-button :icon="Download" @click="loadRecordsFile">下载学生签到记录</el-button>
            </template>
        </BtnCt>
        <el-dialog v-model="isDialogOpen" title="新建签到">
            <el-form :model="form" ref="refEl">
                <el-form-item label="签到名称" label-width="120px">
                    <el-input v-model="form.name" placeholder="请输入签到名称"></el-input>
                </el-form-item>
                <el-form-item label="签到时长(分钟)" label-width="120px">
                    <el-input-number v-model="form.duration" :min="5" style="margin-right: 10px"/>
                    <span class="note">签到时长至少5分钟</span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="cancle">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <TablePage :common="common" :fetch-data="getCourseAttendRecords" ref="refTableEl">
            <template v-slot:tableColumns>
                <el-table-column prop="name" label="签到名称" min-width="100" />
                <el-table-column prop="createAt" label="创建时间" min-width="180" />
                <el-table-column prop="total" label="应签到人数" min-width="100" />
                <el-table-column prop="actual" label="实际签到人数" min-width="100" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            type="danger"
                            size="default"
                            @click="deleteHandler(scope.row.checkinRecordId)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage> -->
    </div>
</template>

<style lang="less" scoped>

</style>