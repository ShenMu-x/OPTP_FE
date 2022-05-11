<script lang="ts" setup>
import { ref } from 'vue';
import TablePage from '@/components/common/TablePage.vue';
import { useCourseId } from '@/utils/helper';
import { getCourseStudents, getAskForAdmissionStudents } from '@/utils/services';

const props = defineProps<{
    type: 'default' | 'verify';
}>();
const fetch = props.type === 'verify' ? getAskForAdmissionStudents : getCourseStudents;
const des = props.type === 'verify' ? '本课程暂无待审核成员' : '本课程暂无成员';
const courseId = useCourseId();
const common = { courseId };
const refTableEl = ref();
defineExpose({
    reload: () => refTableEl?.value?.reload?.(),
});
</script>

<template>
    <TablePage :common="common" :fetch-data="fetch" :empty-des="des" ref="refTableEl">
        <template v-slot:tableColumns>
            <el-table-column prop="num" label="学生学号" min-width="120" />
            <el-table-column prop="realName" label="学生姓名" min-width="140" />
            <el-table-column prop="major" label="学生专业" min-width="180" />
            <el-table-column prop="organization" label="所属组织" min-width="180" />
            <el-table-column prop="email" label="邮箱" min-width="180" />
            <slot name="options">
                <!-- 占位，使width对齐 -->
                <el-table-column label="" min-width="140"></el-table-column>
            </slot>
        </template>
    </TablePage>
</template>

<style lang="less" scoped>
</style>