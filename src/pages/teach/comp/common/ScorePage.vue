<script lang="ts" setup>
import TablePage from '@/components/common/TablePage.vue';
import { getCourseScoreList } from '@/utils/services';
import { useCourseId } from '@/utils/helper';
const courseId = useCourseId();
</script>

<template>
    <TablePage :common="{ courseId }" :fetch-data="getCourseScoreList" text="本课程暂无学生">
        <template v-slot:tableColumns>
            <el-table-column prop="num" label="学生学号" min-width="180" />
            <el-table-column prop="realName" label="学生姓名" min-width="140" />
            <slot name="columns"></slot>
        </template>
    </TablePage>
</template>