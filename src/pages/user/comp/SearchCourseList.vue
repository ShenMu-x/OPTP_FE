<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import CourseItem from '@/components/course/CourseItem.vue';
import { usePageList } from '@/utils/helper';
import { searchCourseByName } from '@/utils/services';

const props = defineProps<{
    keyword?: string;
}>();

const pageSize = 6;
const refEl = ref();
const emits = defineEmits(['reloadend']);
const emitReload = () => {
    emits('reloadend');
};

const { current, isLoading, isReload, total, list, reload, fetch, setCommon } = usePageList({
    size: pageSize,
    fetchData: searchCourseByName,
    failText: '搜索课程失败,请稍后再试',
    refEl,
    emitReload,
    noTip: true,
    common: { courseName: props.keyword },
});

defineExpose({
    reload,
});

watch(props, (newV) => {
    if (newV.keyword !== '') {
        setCommon({ courseName: newV.keyword });
        fetch(1);
    }
});

onMounted(() => {
    props.keyword && fetch(1);
});
</script>

<template>
    <div class="coursesCt" ref="refEl">
        <template v-if="list?.length > 0">
            <CourseItem v-for="item in list" :key="item.courseId" :course="item" class="courseCt" />
        </template>
        <el-empty v-else v-show="!isLoading" description="暂无课程" style="flex: 1" />
    </div>
    <el-pagination
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
    ></el-pagination>
</template>

<style lang="less" scoped>
.coursesCt {
    display: flex;
    flex-wrap: wrap;
    min-height: 480px;
    padding-top: 20px;
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