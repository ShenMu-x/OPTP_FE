<script lang="ts" setup>
import Avatar from '@/components/user/Avatar.vue';
import { CaretRight } from '@element-plus/icons-vue';
import { ref } from 'vue-demi';
import CommentInput from './CommentInput.vue';

const isReplying = ref(false);
const replyInputEl = ref<any>(null);

const replyPanelClickHandler = () => {
    isReplying.value = !isReplying.value;
    // if(!isReplying.value) replyInputEl?.value?.resetInput();
}

const blurHandler = () => {
    console.log('blur');
    isReplying.value && (isReplying.value = false);
}

const sumbitReply = (comment: string) => {
    // 提交回复
    console.log('submit', comment);
}

defineExpose({
    blurHandler,
})

</script>

<template>
    <div class="commentCt">
        <div class="avatar">
            <Avatar type="small" />
        </div>
        <div class="rightCt">
            <div class="commentInfo">
                <div class="userName">userNameuserName</div>
                <CaretRight class="caretIcon" />
                <span class="userName">reply_name</span>
                <span class="timeStamp">2022.01.08</span>
            </div>
            <div class="commentText">
                《大学生心理健康》课程是华南师范大学心理咨询研究中心面向在校大学生开设的一门非正式课程，目标在于增强学生心理健康意识，掌握心理调适特别是情绪管理的方法，培养良好心理素质，促进人格和谐发展。
                课程内容活动包括两大模块：线上心理健康理论知识与线下心理健康实践教学。线上理论教学合计44课时11小时，线上实践教学合计40课时5小时（非正式课程1小时相当于正式课程的理论教学4学时或实践教学8学时）
                心理健康理论知识由学校心理咨询研究中心通过录制在线课程供学生线上学习的形式来完成。
                心理健康教育实践活动主要通过各类心理健康教育活动组织完成，如心理情景剧、心理电影赏板、心理测评、角色扮演、团体培训、沙盘游戏、绘画、舞动、瑜伽等方式进行实践体验，从而能够加深对心理健康的理解，并能直观感受和了解自己的心理状态，进一步提升心理素质。
                请选了课但还未进课程群的同学加入qq群：619150561，获取最新课程通知，祝大家学习愉快！
            </div>
            <div class="btn replyBtn" @click.stop="replyPanelClickHandler">回复</div>
            <div class="btn deleteBtn" v-if="false">删除</div>
            <div class="replyInputCt" v-show="isReplying">
                <CommentInput title="输入你的回复" :submitComment="sumbitReply" ref="replyInputEl" :blurHandler="blurHandler" />
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
    color: #3F9EFF;
    &:hover {
        color: #1f88f1;
    }
}

.replyInputCt {
    margin-top: 40px;
}
</style>