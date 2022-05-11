<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CourseItem from './CourseItem.vue';
import { usePageList } from '@/utils/helper';

const props = defineProps<{
    fetchData?: any,
}>();

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
    fetchData: props.fetchData,
    failText: '获取课程列表失败,请稍后再试',
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
    <div class="coursesCt" ref="refEl">
        <template v-if="list?.length > 0">
            <CourseItem v-for="item in list" :key="item.courseId" :course="item" class="courseCt" />
        </template>
        <el-empty v-else v-show="!isLoading" description="暂无课程" style="flex: 1" />
        <el-pagination v-model:currentPage="current" layout="prev, pager, next" :total="total" :page-size="pageSize"
            hide-on-single-page></el-pagination>
    </div>
</template>

<style lang="less" scoped>
.coursesCt {
    display: flex;
    flex-wrap: wrap;
    min-height: 480px;
    padding-top: 20px;
    justify-content: center;
}

.courseCt {
    flex-basis: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #5151e51e;
    }
}
</style>