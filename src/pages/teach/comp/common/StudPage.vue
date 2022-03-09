<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import TablePage from '@/components/common/TablePage.vue';
import { getStudents, getVerifyStuds } from '@/utils/services';

const props = defineProps<{
    type: 'default' | 'verify'
}>();
const fetch = props.type === 'verify' ? getVerifyStuds : getStudents;
const des = props.type === 'verify' ? '本课程暂无待审核成员' : '本课程暂无成员';
const route = useRoute();
const courseId = parseInt(route.params?.courseId?.[0]);

</script>

<template>
    <TablePage :common="{ courseId }" :fetch-data="fetch" :empty-des="des">
        <template v-slot:tableColumns>
            <el-table-column prop="num" label="学生学号" min-width="140" />
            <el-table-column prop="realName" label="学生姓名" min-width="140" />
            <el-table-column prop="major" label="学生专业" min-width="180" />
            <el-table-column prop="organization" label="所属组织" min-width="180" />
            <el-table-column prop="email" label="邮箱" min-width="180" />
            <slot name="options"></slot>
        </template>
    </TablePage>
</template>

<style lang="less" scoped>
</style>