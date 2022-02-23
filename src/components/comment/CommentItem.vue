<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';
import Avatar from '../common/Avatar.vue';
import CommentInput from './CommentInput.vue';
import { commentItemType, commentReplyType } from '@/type';
// import ReplyList from './ReplyList.vue';
import { useFolder } from '@/utils/helper';

const props = defineProps<{
    commentItem?: commentItemType,
    isLast?: boolean
}>();

const { commentItem, isLast } = toRefs(props);

// 回复面板
const {
    isFold: isReplyPanelShow,
    click: handleReplyPanel
} = useFolder();
// 评论列表面板
const {
    isFold: isListShow,
    click: handleListPanel
} = useFolder();

const isSelf = ref(true);
const hasReplys = computed(() => (commentItem?.value?.replyComments?.length ?? 0) > 0)

const submitReply = (params: any) => {
    // 提交回复, posi api
    console.log('submit', params);
}

// const isReply = ref(Boolean(props.replyItem));
// const hasReplys = ref(Boolean(props.commentItem?.replyComments));
// const commentItemRef = reactive(props.commentItem ?? {} as commentItemType);
// const replyItemRef = reactive(props.replyItem ?? {} as commentReplyType);

// const isReplying = ref(false);
// const isReplysShow = ref(false);
// const isSelf = ref(true);


// const replyPanelClickHandler = () => {
//     isReplying.value = !isReplying.value;
// }

// const showReplys = () => {
//     isReplysShow.value = !isReplysShow.value;
// }

// const submitReply = (params: any) => {
//     // 提交回复, posi api
//     console.log('submit', params);
// }

</script>

<template>
    <div :class="['ct', { 'noBorder': isLast }]">
        <div class="avatar">
            <Avatar type="small" />
        </div>
        <div class="rightCt">
            <div class="info">
                <span class="name">{{ commentItem?.comment.userName }}</span>
            </div>
            <div class="commentText">{{ commentItem?.comment.commentText }}</div>
            <div class="btnCt">
                <div class="btn blue" @click="handleReplyPanel">
                    <span v-show="isReplyPanelShow">收起</span>
                    <span v-show="!isReplyPanelShow">回复</span>
                </div>
                <div
                    class="btn blue"
                    v-if="hasReplys"
                    @click="handleListPanel"
                >
                    <span v-show="isListShow">收起回复列表</span>
                    <span v-show="!isListShow">展开回复列表</span>
                </div>
                <div class="btn red" v-if="isSelf">删除</div>
            </div>
            <div class="replyInputCt" v-show="isReplyPanelShow">
                <CommentInput
                    title="输入你的回复"
                    :submitComment="submitReply"
                    :params="{
                        userName: commentItem?.comment.userName
                    }"
                />
            </div>
            <div v-show="hasReplys" class="replyListCt">
                <ReplyList />
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
    & > div {
        float: right;
        margin: 10px;
        margin-bottom: 0;

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

.replyInputCt {
    margin-top: 40px;
}
</style>