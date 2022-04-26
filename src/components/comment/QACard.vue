<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus'
import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import { showFailWrap, showSuccessWrap, useCourseId } from '@/utils/helper';
import { publishCourseComment, deleteCourseComment } from '@/utils/services';
import { getCommentCount } from './useCommon';

// 可拓展实验评论能力
const props = defineProps<{
    type: 'lab' | 'course'
}>();

const courseId = useCourseId();
const refInputEl = ref();
const refListEl = ref();

const submitComment = ({ commentText, replyId = 0, cb }: {
    commentText: string,
    replyId?: number,
    cb?: any
}) => {
    publishCourseComment({ courseId, commentText, replyId })
        .then(res => {
            if (res.code === 0) {
                showSuccessWrap({ text: '评论已发布' })
                if (replyId === 0) refInputEl?.value?.resetInput?.();
                cb?.()
                refListEl?.value?.reloadComment?.();
            }
            else {
                showFailWrap({ text: res.errorMsg });
            }
        })
}

const deleteComment = (common: { commentId: number }) => {
    ElMessageBox.confirm(
        '确认删除？',
        '评论删除确认',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success',
            lockScroll: false,
        }
    )
        .then(() => {
            deleteCourseComment({ commentId: common.commentId }).then((res: any) => {
                if (res.code === 0) {
                    showSuccessWrap?.({ text: '评论已删除' });
                    refListEl?.value?.reloadComment?.();
                } else {
                    showFailWrap({ text: '服务出现问题，请稍后重试' });
                }
            })
        })
        .catch(() => { })
}
defineExpose({
    getCommentCount
})
</script>

<template>
    <div class="qaCard">
        <CommentInput title="提出我的问题" :submitComment="submitComment" class="inputQue" ref="refInputEl" />
        <CommentList ref="refListEl" :courseId="courseId" :submitReply="submitComment" :deleteReply="deleteComment" />
    </div>
</template>

<style lang="less" scoped>
.qaCard {
    margin-top: 20px;
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