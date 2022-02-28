<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import { getScore } from '@/utils/services';
import { getCourseId } from './logic';
const courseId = getCourseId();
</script>

<template>
    <TablePage :common="{ courseId }" :fetch-data="getScore" text="本课程暂无学生">
        <template v-slot:tableColumns>
            <el-table-column prop="num" label="学生学号" width="180" />
            <el-table-column prop="realName" label="学生姓名" width="140" />
            <slot name="columns"></slot>
        </template>
    </TablePage>
</template>