<script lang="ts" setup>
import { ref, onMounted } from 'vue-demi';
import Lab from './Lab.vue';
import { usePageList } from '@/utils/helper';
import { getMyLabs } from '@/utils/services';

const pageSize = 6;
const refEl = ref();
const emits = defineEmits(['reloadend']);
const emitReload = () => { emits('reloadend') }

const {
    current,
    isLoading,
    isReload,
    total,
    list,
    reload,
    fetch,
} = usePageList({
    size: pageSize,
    fetchData: getMyLabs,
    failText: '获取实验列表失败,请稍后再试',
    refEl,
    emitReload
});

defineExpose({
    reload
})

onMounted(() => {
    fetch(1);
});

</script>

<template>
    <div class="ct" ref="refEl">
        <template v-if="list?.length">
            <Lab v-for="lab in list" :key="lab.labId" :info="lab" class="labCt"></Lab>
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