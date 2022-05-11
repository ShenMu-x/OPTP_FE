<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CodingTableItem from './comp/common/CodingTableItem.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { usePageList, useCourseId } from '@/utils/helper';
import { getCourseCodingTime } from '@/utils/services'

const courseId = useCourseId();
const pageSize = 4;
const refEl = ref();
const emits = defineEmits(['reloadend']);
const emitReload = () => { emits('reloadend') }

const {
    current,
    isLoading,
    total,
    list,
    reload,
    fetch,
} = usePageList({
    size: pageSize,
    fetchData: getCourseCodingTime,
    failText: '获取学生编码活跃度失败,请稍后再试',
    refEl,
    emitReload,
    common: { courseId }
});

onMounted(() => {
    courseId && fetch(1);
})

defineExpose({
    reload
})
</script>

<template>
    <PageHeader content="学生编码活跃度" />
    <div class="listCt" ref="refEl">
        <template v-if="list?.length > 0">
            <CodingTableItem v-for="item in list" :key="item.userId" :info="item" />
        </template>
        <el-empty v-else v-show="!isLoading" description="该课程暂无学生编码记录" style="flex: 1" />
    </div>
    <el-pagination
        class="pagination"
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
    ></el-pagination>
</template>

<style lang="less" scoped>
.listCt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
}

.pagination {
    margin-bottom: 40px;
}
</style>