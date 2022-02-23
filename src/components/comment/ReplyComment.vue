<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';
import Avatar from '../common/Avatar.vue';
import CommentInput from './CommentInput.vue';
import { commentReplyType } from '@/type';
import { useFolder } from '@/utils/helper';

const props = defineProps<{
    reply?: commentReplyType,
    isLast?: boolean
}>();

const { reply, isLast } = toRefs(props);

// 回复面板
const {
    isFold: isReplyPanelShow,
    click: handleReplyPanel
} = useFolder();

const isSelf = ref(true);

const submitReply = (params: any) => {
    // 提交回复, posi api
    console.log('submit', params);
}

</script>

<template>
    <div :class="['ct', { 'noBorder': isLast }]">
        <div class="avatar">
            <Avatar type="small" />
        </div>
        <div class="rightCt">
            <div class="info">
                <span class="name">{{ reply?.username }}</span>
                <CaretRight class="caretIcon" />
                <span class="name">{{ reply?.replyUsername }}</span>
                <span class="timeStamp">{{ reply?.createdAt }}</span>
            </div>
            <div class="commentText">{{ reply?.commentText }}</div>
            <div class="btn blue" @click="handleReplyPanel">
                <span v-show="isReplyPanelShow">收起</span>
                <span v-show="!isReplyPanelShow">回复</span>
            </div>
            <div class="btn red" v-if="isSelf">删除</div>
            <div class="replyInputCt" v-show="isReplyPanelShow">
                <CommentInput
                    title="输入你的回复"
                    :placeHolder="`回复 @${reply?.username}: `"
                    :submitComment="submitReply"
                    :params="{
                        userName: reply?.username
                    }"
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

.noBorder {
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

.btn {
    float: right;
    margin: 10px;
    margin-bottom: 0;

    &:hover {
        cursor: pointer;
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

.replyInputCt {
    margin-top: 40px;
}
</style>