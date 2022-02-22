<script lang="ts" setup>
import Avatar from '../common/Avatar.vue';
import { CaretRight } from '@element-plus/icons-vue';
import { reactive, ref, toRefs } from 'vue-demi';
import CommentInput from './CommentInput.vue';
import { commentItemType, commentReplyType } from '@/type';
import CommentList from './CommentList.vue';

const props = defineProps<{
    commentItem?: commentItemType,
    replyItem?: commentReplyType,
    isLast?: boolean,
}>();

const isReply = ref(Boolean(props.replyItem));
const hasReplys = ref(Boolean(props.commentItem?.replyComments));
const commentItemRef = reactive(props.commentItem ?? {} as commentItemType);
const replyItemRef = reactive(props.replyItem ?? {} as commentReplyType);

const isReplying = ref(false);
const isReplysShow = ref(false);
const isSelf = ref(true);


const replyPanelClickHandler = () => {
    isReplying.value = !isReplying.value;
}

const showReplys = () => {
    isReplysShow.value = !isReplysShow.value;
}

const sumbitReplyComment = (params: any) => {
    // 提交回复, posi api
    console.log('submit', params);
}

</script>

<template>
    <div :class="['commentCt', props.isLast ? 'borderBottomNone' : '', isReply ? 'replysCt' : '']">
        <div class="avatar">
            <Avatar type="small" />
        </div>
        <div class="rightCt">
            <div class="commentInfo">
                <div
                    class="userName"
                >{{ isReply ? replyItemRef?.username : commentItemRef?.comment.userName }}</div>
                <template v-if="isReply">
                    <CaretRight class="caretIcon" />
                    <span class="userName">{{ replyItemRef.replyUsername }}</span>
                </template>
                <span
                    class="timeStamp"
                >{{ isReply ? replyItemRef?.createdAt : commentItemRef?.comment.createdAt }}</span>
            </div>
            <div
                class="commentText"
            >{{ isReply ? replyItemRef?.commentText : commentItemRef?.comment.commentText }}</div>
            <div class="btn replyBtn" @click="replyPanelClickHandler">
                <span v-show="isReplying">收起</span>
                <span v-show="!isReplying">回复</span>
            </div>
            <div class="btn replyBtn" v-if="!isReply && hasReplys" @click="showReplys">
                <span v-show="isReplysShow">收起回复列表</span>
                <span v-show="!isReplysShow">展开回复列表</span>
            </div>
            <div class="btn deleteBtn" v-if="isSelf">删除</div>
            <div class="replyInputCt" v-show="isReplying">
                <CommentInput
                    title="输入你的回复"
                    :submitComment="sumbitReplyComment"
                    :params="{
                        userName: isReply ? replyItemRef?.username : commentItemRef?.comment.userName
                    }"
                />
            </div>
            <div v-show="hasReplys && isReplysShow" class="replysCt">
                <CommentList :replys="commentItemRef?.replyComments" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.commentCt {
    min-height: 100px;
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaa;
    overflow: hidden;
}

.replysCt {
    margin-top: 40px;
    width: 100%;
    margin: 10px 0;
    border: 0;
}

.borderBottomNone {
    border-bottom: none;
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
.commentInfo {
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

    .userName {
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

.btn {
    float: right;
    margin: 10px;
    margin-bottom: 0;

    &:hover {
        cursor: pointer;
    }
}

.deleteBtn {
    color: #e42b50;
    &:hover {
        color: #af1e3b;
    }
}

.replyBtn {
    color: #3f9eff;
    &:hover {
        color: #1f88f1;
    }
}

.replyInputCt {
    margin-top: 40px;
}
</style>