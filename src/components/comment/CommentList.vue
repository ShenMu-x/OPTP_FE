<script lang="ts" setup>
import CommentItem from './CommentItem.vue';
import { commentsType } from '@/type';
import { usePageList } from '@/utils/helper';
import { fetchCourseComment } from '@/utils/services';
import { ref, onMounted, watch, toRefs } from 'vue';

const props = defineProps<{
    courseId?: number,
}>();

const pageSize = 20;

const {
    current,
    total,
    list,
    fetch,
    setCommon
} = usePageList({
    size: pageSize,
    fetchData: fetchCourseComment,
    failText: '获取评论列表失败,请稍后再试',
    common: {
        courseId: props.courseId
    }
});

watch(props, (newV, _) => {
    if(props.courseId) {
        setCommon({courseId: props.courseId});
        fetch(1);
    }
})

</script>

<template>
    <template v-if="list.length">
        <CommentItem
            v-for="(commentItem, index) in list"
            :key="commentItem.comment.courseCommentId"
            :commentItem="commentItem"
            :isLast="index + 1 === list?.length"
        />
    </template>
    <el-empty v-else description="本课程暂无评论" style="flex: 1" />
    <el-pagination
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
    ></el-pagination>
</template>