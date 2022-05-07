<script lang="ts" setup>
import CommentItem from './CommentItem.vue';
import { usePageList } from '@/utils/helper';
import { fetchCourseComment } from '@/utils/services';
import { onMounted, watch } from 'vue';
import { setCommentCount } from './useCommon';

const props = defineProps<{
    courseId?: number,
    submitReply?: any,
    deleteReply?: any,
}>();

const pageSize = 10;
const {
    current,
    total,
    list,
    fetch,
    setCommon,
    reload,
} = usePageList({
    size: pageSize,
    fetchData: fetchCourseComment,
    failText: '获取评论列表失败,请稍后再试',
    noTip: true,
    common: {
        courseId: props.courseId
    }
});
watch(props, (newV, _) => {
    if (props.courseId) {
        setCommon({ courseId: props.courseId });
        fetch(1);
    }
})
onMounted(() => {
    props.courseId && fetch(1);
})

setCommentCount(total.value)
watch(total, (newV, _) => {
    setCommentCount(newV)
})

const publishReplyWrap = (common: any) => { props.submitReply?.({ ...common }) }
const deleteWrap = (common: any) => { props.deleteReply?.({ ...common }) }

defineExpose({
    reloadComment: reload,
})
</script>

<template>
    <template v-if="list.length">
        <CommentItem v-for="(commentItem, index) in list" :key="commentItem.comment.courseCommentId"
            :commentItem="commentItem" :isLast="index + 1 === list?.length" :publish-reply="publishReplyWrap"
            :delete-reply="deleteWrap" />
    </template>
    <el-empty v-else description="本课程暂无评论" style="flex: 1" />
    <el-pagination v-model:currentPage="current" layout="prev, pager, next" :total="total" :page-size="pageSize"
        hide-on-single-page></el-pagination>
</template>