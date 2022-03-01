<script lang="ts" setup>
import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import { useCourseId } from '@/utils/helper';

const courseId = useCourseId();

const submitComment = (comment: string) => {
    console.log('提交', comment);
    // 提交成功 / 失败
}

</script>

<template>
    <div class="qaCard">
        <div class="cardTitle">课程问答(条)</div>
        <CommentInput title="提出我的问题" :submitComment="submitComment" class="inputQue" />
        <CommentList :courseId="courseId" />
    </div>
</template>

<style lang="less" scoped>
.qaCard {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;

    .inputQue {
        margin: 20px;
    }
}

.cardTitle {
    font-size: 25px;
    margin-bottom: 10px;
}
</style>