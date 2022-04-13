<script setup lang="ts">
import { watch, toRef } from "vue";
import { usePageList } from "@/utils/helper";

const props = defineProps<{
    pageSize?: number,
    fetchData?: any,
    common?: any,
    emptyDes?: string,
    noTip?: boolean
}>()

const pageSize = props.pageSize || 7;
const common = toRef(props, 'common');
const emits = defineEmits(['reloadend']);
const emitReload = () => { emits('reloadend') }

const {
    current,
    total,
    list,
    fetch,
    setCommon,
    reload,
} = usePageList({
    size: pageSize,
    fetchData: props.fetchData,
    failText: '获取列表失败,请稍后再试',
    common: props.common ?? {},
    noTip: props.noTip ?? true,
    emitReload
});

watch(common, (newV, _) => {
    setCommon(newV);
    fetch(1);
})

if (props.common !== {}) {
    fetch(1);
}

defineExpose({
    reload
})
</script>

<template>
    <div v-if="list.length">
        <el-table :data="list" stripe highlight-current-row style="width: 100%">
            <slot name="tableColumns"></slot>
        </el-table>
        <el-pagination v-model:currentPage="current" layout="prev, pager, next" :total="total" :page-size="pageSize"
            hide-on-single-page></el-pagination>
    </div>
    <el-empty v-else :description="props.emptyDes || '本课程暂无实验'" />
</template>
