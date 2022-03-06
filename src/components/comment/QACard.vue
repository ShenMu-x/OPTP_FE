<script lang="ts" setup>
import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import { showFailWrap, showSuccess, showSuccessWrap, useCourseId } from '@/utils/helper';
import { publishCourseComment } from '@/utils/services';

const props = defineProps<{
    type: 'lab' | 'course'
}>();

const courseId = useCourseId();

const submitComment = ({ commentText, replyId = 0 }: {
    commentText: string,
    replyId?: number,
}) => {
    console.log('提交', commentText);
    // 提交成功 / 失败
    publishCourseComment({
        courseId,
        commentText,
        replyId,
    })
        .then(res => {
            if (res.code === 0) showSuccess()
            else showFailWrap({ text: res.errorMsg });
        })
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