<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue';
import Avatar from '../common/Avatar.vue';
import CommentInput from './CommentInput.vue';
import ReplyComment from './ReplyComment.vue';
import { commentItemType } from '@/type';
import { useFolder } from '@/utils/helper';
import { getUserId } from './logic';

const props = defineProps<{
    commentItem?: commentItemType,
    isLast?: boolean,
    publishReply?: any
}>();
const { commentItem, isLast } = toRefs(props);

// 回复面板
const { isFold: isReplyPanelShow, click: handleReplyPanel } = useFolder();
// 评论列表面板
const { isFold: isListShow, click: handleListPanel } = useFolder();

const isSelf = computed(() => getUserId() === commentItem?.value?.comment.userId);
const hasReplys = computed(() => (commentItem?.value?.replyComments?.length || 0) > 0)
console.log('hasReply', hasReplys.value)

const replyWrap = (params: any) => {
    props.publishReply({ ...params, replyId: commentItem?.value?.comment.userId })
}

console.log('replys', commentItem?.value?.replyComments)
</script>

<template>
    <div :class="['ct', { 'noBorder': isLast }]">
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
                    <span
                        v-if="!isListShow"
                        @click="handleListPanel"
                    >展开{{ commentItem?.replyComments?.length }}条回复</span>
                    <span v-if="isListShow" @click="handleListPanel">收起列表</span>
                </div>
                <div class="btn red" v-if="isSelf">删除</div>
            </div>
            <div class="replyInputCt" v-if="isReplyPanelShow">
                <CommentInput title="输入你的回复" :submitComment="replyWrap" />
            </div>
            <div v-if="commentItem?.replyComments?.length && isListShow" class="replyListCt">
                <ReplyComment
                    v-for="(reply, index) in commentItem?.replyComments"
                    :key="reply.courseCommentId"
                    :reply="reply"
                    :isLast="index === commentItem?.replyComments.length - 1"
                    :publishReply="replyWrap"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
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
    color: #e42b50;
    &:hover {
        color: #af1e3b;
    }
}

.blue {
    color: #3f9eff;
    &:hover {
        color: #1f88f1;
    }
}
</style>