<script setup lang="ts">
import { computed, ref } from "vue-demi";

const props = defineProps<{
    data?: Array<any>
    pageSize?: number
}>()

const current = ref(1);
const pageSize = props.pageSize ?? 7;
const dataSize = props.data?.length ?? 0;

const showData = computed(() => props.data?.slice((current.value - 1) * pageSize, current.value * pageSize))

</script>

<template>
    <div v-if="props.data && props.data.length > 0">
        <el-table :data="showData" stripe highlight-current-row style="width: 100%">
            <slot name="tableColumns"></slot>
        </el-table>
        <el-pagination
            v-model:currentPage="current"
            layout="prev, pager, next"
            :total="dataSize"
            :page-size="pageSize"
            hide-on-single-page
        ></el-pagination>
    </div>

    <el-empty v-else description="本课程暂无实验" />
</template>
