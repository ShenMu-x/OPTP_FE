<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CommentItem from './CommentItem.vue';
import { commentsType, replyCommentsType } from '@/type';
import { usePageList } from '@/utils/helper';

const props = defineProps<{
    fetchReplys?: any,
}>();

const pageSize = 6;
const refEl = ref();

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
    fetchData: props.fetchReplys,
    failText: '获取回复列表失败,请稍后再试',
    refEl
});

// onMounted(() => {
//     fetch(1);
// });
</script>

<template>
    <template v-if="list.length">
        <CommentItem v-for="reply in list" :key="reply.replyId" :replyItem="reply" />
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