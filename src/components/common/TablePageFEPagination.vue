<script lang="ts" setup>
import { ref, toRefs, watch, nextTick } from 'vue';
import { ResType } from '@/utils/services';
import { showFailWrap } from '@/utils/helper';
// 前端分页表格，接口未做分页处理
const props = defineProps<{
    fetchData: (common: any) => ResType<any>;
    common?: any;
    pageSize?: number;
    emptyDes?: string;
}>();
const { fetchData, common } = toRefs(props);
let tableData: any[];
let currentPageList = ref<any[]>([]);
const current = ref(1);
const total = ref(0);
const pageSize = ref(props.pageSize ?? 7);

const refreshList = () => {
    total.value = tableData.length;
    currentPageList.value = tableData?.slice?.(
        (current.value - 1) * pageSize.value,
        current.value * pageSize.value,
    );
};
watch(current, refreshList);

const fetchTableData = async () => {
    await nextTick(); // 必须增加，否则是先fetch后渲染，拿不到最新的fetchData
    const res = await fetchData.value(common?.value);
    if (res.code !== 0) showFailWrap({ text: res.errorMsg, duration: 2000 });
    tableData = res?.data ?? [];
    current.value = 1;
    refreshList();
};
const reloadTableData = () => {
    fetchData.value(common?.value);
    current.value = 1;
};

defineExpose({
    fetchTableData,
    reloadTableData,
});
</script>

<template>
    <div v-if="currentPageList.length">
        <el-table :data="currentPageList" stripe highlight-current-row style="width: 100%">
            <slot name="tableColumns"></slot>
        </el-table>
        <el-pagination
            v-model:currentPage="current"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            hide-on-single-page
        ></el-pagination>
    </div>
    <el-empty v-else :description="props.emptyDes ?? '暂无数据'" />
</template>