<script lang="ts" setup>
import { ref } from 'vue';
import CommentItem from './CommentItem.vue';
import { commentsType, replyCommentsType } from '@/type';

const props = defineProps<{
    fetchComment?: any,
    comments?: commentsType,
    replys?: replyCommentsType,
}>();

const current = ref(1);

</script>

<template>
    <template v-if="props.comments">
        <CommentItem
            v-for="(comment, index) in props.comments"
            :key="comment.comment.courseCommentId"
            :commentItem="comment"
            :isLast="index + 1 === props.comments?.length"
        />
    </template>
    <template v-if="props.replys">
        <CommentItem v-for="reply in props.replys" :key="reply.replyId" :replyItem="reply" />
    </template>
    <el-pagination
        v-if="true"
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="20"
        :page-size="5"
        hide-on-single-page
    ></el-pagination>
</template>