<script lang="ts" setup>
import CommentItem from './CommentItem.vue';
import { commentsType, replyCommentsType } from '@/type';

const props = defineProps<{
    comments?: commentsType,
    replys?: replyCommentsType,
}>();

</script>

<template>
    <CommentItem
        v-for="(comment,index) in props.comments"
        :key="comment.comment.courseCommentId"
        :commentItem="comment"
        :isLast="index + 1 === props.comments?.length"
    />
</template>