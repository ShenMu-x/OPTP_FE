<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';
import Avatar from '../common/Avatar.vue';
import CommentInput from './CommentInput.vue';
import { commentReplyType } from '@/type';
import { useFolder, useUser } from '@/utils/helper';

const props = defineProps<{
    reply?: commentReplyType;
    isLast?: boolean;
    publishReply?: any;
    deleteReply?: any;
}>();

const { reply, isLast } = toRefs(props);
const { user } = useUser();
const refInputEl = ref();

// 回复面板
const { isFold: isReplyPanelShow, click: handleReplyPanel } = useFolder();
const isSelf = computed(() => user.userId === reply?.value?.userId);

const submitCb = () => {
    refInputEl?.value?.resetInput();
    isReplyPanelShow.value && handleReplyPanel();
};

const submitReply = (params: any) => {
    props.publishReply?.({ replyId: reply?.value?.courseCommentId, cb: submitCb, ...params });
};
const deleteHandler = () => {
    props.deleteReply?.({ commentId: reply?.value?.courseCommentId });
};
</script>

<template>
    <div :class="['replyCt', { noBorder: isLast }]">
        <div class="avatar">
            <Avatar type="small" :src="reply?.userAvatarUrl" />
        </div>
        <div class="rightCt">
            <div class="info">
                <span class="name">{{ reply?.username }}</span>
                <CaretRight class="caretIcon" />
                <span class="name replyname">{{ reply?.replyUsername }}</span>
                <span class="timeStamp">{{ reply?.createdAt }}</span>
            </div>
            <div class="commentText">{{ reply?.commentText }}</div>
            <div class="btn blue" @click="handleReplyPanel">
                <span v-show="isReplyPanelShow">收起</span>
                <span v-show="!isReplyPanelShow">回复</span>
            </div>
            <div class="btn red" v-if="isSelf" @click="deleteHandler">删除</div>
            <div class="replyInputCt" v-show="isReplyPanelShow">
                <CommentInput
                    title="输入你的回复"
                    :placeHolder="`回复 @${reply?.username}: `"
                    :submitComment="submitReply"
                    ref="refInputEl"
                />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');
.replyCt {
    margin: 20px 0;
    min-height: 100px;
    border-bottom: 1px solid #aaa;
    overflow: hidden;
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
    display: flex;

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

    .replyname {
        margin-right: auto;
    }

    .timeStamp {
        text-align: right;
        justify-self: flex-end;
        font-size: 14px;
    }
}

.commentText {
    text-align: left;
}

.btn {
    float: right;
    text-align: right;
    margin: 10px 0 0 10px;

    &:hover {
        cursor: pointer;
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

.replyInputCt {
    margin-top: 40px;
}
</style>