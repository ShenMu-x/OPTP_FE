<script lang="ts" setup>
import { computed, ref, toRefs, inject } from 'vue';
import Avatar from '../common/Avatar.vue';
import CommentInput from './CommentInput.vue';
import ReplyComment from './ReplyComment.vue';
import { commentItemType } from '@/type';
import { useFolder, useUser } from '@/utils/helper';

const props = defineProps<{
    commentItem?: commentItemType;
    isLast?: boolean;
    publishReply?: any;
    deleteReply?: any;
}>();
const { commentItem, isLast } = toRefs(props);
const { user } = useUser();
const refInputEl = ref();

const { isFold: isReplyPanelShow, click: handleReplyPanel } = useFolder(); // 回复面板
const { isFold: isListShow, click: handleListPanel } = useFolder(); // 评论列表面板

const isSelf = computed(() => user.userId === commentItem?.value?.comment.userId);
const hasReplys = computed(() => (commentItem?.value?.replyComments?.length || 0) > 0);

const submitCb = () => {
    refInputEl?.value?.resetInput();
    isReplyPanelShow.value && handleReplyPanel();
    !isListShow.value && handleListPanel();
};

// 两个params，用于replyItem传递参数
const replyWrap = (params: any) => {
    props.publishReply?.({
        replyId: commentItem?.value?.comment.courseCommentId,
        cb: submitCb,
        ...params,
    });
};
const deleteHandler = (params: any) => {
    props.deleteReply?.({ commentId: commentItem?.value?.comment.courseCommentId, ...params });
};

// 回复输入框重置
const reset = () => {
    refInputEl?.value?.resetInput?.();
};

defineExpose({
    reset,
});
</script>

<template>
    <div :class="['ct', { noBorder: isLast }]">
        <div class="avatar">
            <Avatar type="small" :src="commentItem?.comment.userAvatarUrl" />
        </div>
        <div class="rightCt">
            <div class="info">
                <span class="name">{{ commentItem?.comment.username }}</span>
            </div>
            <div class="commentText">{{ commentItem?.comment.commentText }}</div>
            <div class="btnCt">
                <div class="btn blue" @click="handleReplyPanel">
                    <span v-show="isReplyPanelShow">收起</span>
                    <span v-show="!isReplyPanelShow">回复</span>
                </div>
                <div class="btn blue" v-if="hasReplys">
                    <span v-if="!isListShow" @click="handleListPanel">
                        展开{{ commentItem?.replyComments?.length }}条回复
                    </span>
                    <span v-if="isListShow" @click="handleListPanel">收起列表</span>
                </div>
                <div class="btn red" v-if="isSelf" @click="deleteHandler">删除</div>
            </div>
            <div class="replyInputCt" v-if="isReplyPanelShow">
                <CommentInput title="输入你的回复" :submitComment="replyWrap" ref="refInputEl" />
            </div>
            <div v-if="commentItem?.replyComments?.length && isListShow" class="replyListCt">
                <ReplyComment
                    v-for="(reply, index) in commentItem?.replyComments"
                    :key="reply.courseCommentId"
                    :reply="reply"
                    :isLast="index === commentItem?.replyComments.length - 1"
                    :publishReply="replyWrap"
                    :deleteReply="deleteHandler"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');
.ct {
    min-height: 100px;
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaa;
    overflow: hidden;
}

.replyListCt {
    margin-top: 40px;
    width: 100%;
    margin: 10px 0;
    border: 0;
}

.noBorder {
    border-bottom: none;
    margin-bottom: 0;
}

.avatar {
    float: left;
}

.rightCt {
    float: left;
    margin-left: 20px;
    width: calc(100% - 40px - 20px);
    overflow: hidden;
}
.info {
    height: 30px;
    line-height: 30px;
    color: #2c3e50;
    text-align: left;
    width: 100%;

    .caretIcon {
        height: 15px;
        width: 15px;
        margin: 6px 5px;
    }

    .name {
        display: inline-block;
        font-weight: 600;
        font-size: 20px;
        max-width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .timeStamp {
        width: 80px;
        text-align: right;
        float: right;
        font-size: 14px;
    }
}

.commentText {
    text-align: left;
}

.btnCt {
    display: flex;
    justify-content: flex-end;
    text-align: right;
    .btn {
        margin: 10px 0 0 10px;

        &:hover {
            cursor: pointer;
        }
    }
}

.red {
    color: @text-button-warining-color;
    &:hover {
        color: @text-button-warining-hover-color;
    }
}

.blue {
    color: @text-button-primary-color;
    &:hover {
        color: @text-button-primary-hover-color;
    }
}
</style>