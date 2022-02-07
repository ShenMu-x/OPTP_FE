<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import ReturnBtn from '@/components/common/ReturnBtn.vue';
import Lesson from '@/components/lesson/Lesson.vue';
import { lesson, teacher, commentsMock } from './mock';
import TeacherNotice from './comp/TeacherNotice.vue';
import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import SumbitBtn from '@/components/common/SumbitBtn.vue';
import { scrollToPos } from '@/utils/helper/scrollToPos';
import { fetchComment } from '@/utils/services';
import { commentsType } from '@/type';

scrollToPos(0);
fetchComment();
const route = useRoute();

const courseId = ref(route.params);

// fetch lesson message
// fetch teacher message
// fetch comments
const lessonMock = reactive(lesson);
const teacherInfo = reactive(teacher);
const comments = reactive<commentsType>(commentsMock);

const inpQuestion = ref('');
const submitComment = (comment: string) => {
    console.log('提交', comment);
    // 提交成功 / 失败
}

const coursePswInput = ref('');

</script>

<template>
    <div class="detailCt">
        <div class="headerTitle">
            <ReturnBtn />
            <div class="divider"></div>
            <div class="title">课程详情</div>
        </div>
        <div class="bodyCt">
            <div class="leftCt">
                <Lesson :lesson="lessonMock" class="lessonCard" />
                <div class="courseChooseCard">
                    <div class="cardTitle">自主选课</div>
                    <div class="coursePsw">
                        请输入6位选课密码:
                        <input type="text" maxlength="6" minlength="6" class="pswInput" v-model="coursePswInput" />
                    </div>
                    <SumbitBtn class="submitChooseCourse" title="选课"/>
                </div>
                <div class="leftInnerCt">
                    <TeacherNotice :teacherInfo="teacherInfo" />
                </div>
                <div class="qaCard">
                    <div class="cardTitle">课程问答(条)</div>
                    <CommentInput
                        title="提出我的问题"
                        :submitComment="submitComment"
                        class="questionInp"
                    />
                    <CommentList :comments="comments" />
                </div>
            </div>
            <div class="rightCt">
                <TeacherNotice :teacherInfo="teacherInfo" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import url("@/styles/var.less");
.detailCt {
    margin: 20px;
}
.headerTitle {
    display: flex;
    align-items: center;

    .divider {
        margin-left: 20px;
        height: 20px;
        width: 1px;
        border-left: 1px solid #aaa;
    }

    .title {
        margin-left: 20px;
        text-align: left;
        line-height: 40px;
        font-size: 20px;
    }
}

.bodyCt {
    margin: 20px 80px 80px;
    display: flex;
    flex-direction: column;
}

.leftCt {
    width: 100%;
    .lessonCard {
        height: 200px;
        background-color: #fff;
    }

    .courseChooseCard {
        margin: 20px 0;
        padding: 20px;
        height: 140px;
        background-color: #fff;
        text-align: left;

        .pswInput {
            margin-left: 10px;
            line-height: 1em;
            padding: 0 5px;
        }

        .submitChooseCourse {
            float: right;
            margin-right: 20px;
        }
    }

    .cardTitle {
        font-size: 25px;
        margin-bottom: 10px;
    }

    .qaCard {
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;

        .questionInp {
            margin: 20px;
        }
    }
}

.rightCt {
    display: none;
}

.leftInnerCt {
    display: block;
}

@media screen and (min-width: @min-width) {
    .bodyCt {
        flex-direction: row;
        justify-content: space-between;
    }
    .leftCt {
        width: 70%;
    }
    .rightCt {
        display: block;
        margin-top: 0;
        margin-left: 40px;
        width: 28%;
    }

    .leftInnerCt {
        display: none;
    }
}
</style>