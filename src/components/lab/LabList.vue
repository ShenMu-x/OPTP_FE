<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Lab from './Lab.vue';
import LabDetail from './LabDetail.vue';
import { usePageList, useDrawer } from '@/utils/helper';
import { labType, emptyLab } from '@/type';

const props = defineProps<{
    fetchLabList: any;
    common?: any;
    pageSize?: number;
}>();

const pageSize = props.pageSize ?? 6;
const refEl = ref();

const emits = defineEmits(['reloadend']);
const emitReload = () => emits('reloadend');

const { current, isLoading, isReload, total, list, reload, fetch } = usePageList({
    size: pageSize,
    fetchData: props.fetchLabList,
    failText: '获取实验列表失败,请稍后再试',
    refEl,
    emitReload,
    common: props.common,
});

onMounted(() => {
    fetch(1);
});

defineExpose({
    reload
});

const {
    isDrawerOpen,
    drawerDetailValue: labInfo,
    openDrawer,
} = useDrawer<labType>({ drawerDetailValue: { ...emptyLab } });
</script>

<template>
    <div class="ct" ref="refEl">
        <template v-if="list?.length">
            <Lab
                class="labCt"
                v-for="labItem in list"
                :key="labItem.labId"
                :info="labItem"
                @open-drawer="openDrawer"
            ></Lab>
        </template>
        <el-empty v-else v-show="!isLoading" description="暂无实验" style="flex: 1" />
    </div>
    <el-pagination
        v-show="!isLoading"
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
    ></el-pagination>
    <el-drawer v-model="isDrawerOpen" :title="labInfo?.title" size="40%">
        <LabDetail :info="labInfo" :lab-id="labInfo.labId ?? 0" style="cursor: default" />
    </el-drawer>
</template>

<style lang="less" scoped>
.ct {
    display: flex;
    flex-wrap: wrap;
    min-height: 480px;
    padding-top: 20px;
}
.labCt {
    flex-basis: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    &:hover {
        box-shadow: 0 0 5px #5151e51e;
    }
}
</style>