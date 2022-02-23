<script lang="ts" setup>
import { reactive, toRefs } from 'vue-demi';
import { useRoute, useRouter } from 'vue-router';
import ReturnBtn from '@/components/common/ReturnBtn.vue';
import CourseItem from '@/components/course/CourseItem.vue';
import ChooseCourse from './comp/ChooseCourse.vue';
import TeacherNotice from './comp/TeacherNotice.vue';
import CommentInput from '@/components/comment/CommentInput.vue';
import CommentList from '@/components/comment/CommentList.vue';
import { scrollToPos } from '@/utils/helper/scrollToPos';
import { getCourseById, getUserInfoById } from '@/utils/services';
import { CourseType, userInfoType } from '@/type';

scrollToPos(0);

const route = useRoute();
const router = useRouter();

const data = reactive<{
    course: CourseType,
    info: userInfoType
}>({
    course: {},
    info: {}
})

const courseId = parseInt(route.params?.courseId?.[0]);
const { course, info } = toRefs(data);

if (isNaN(courseId)) {
    router.replace('/404');
} else {
    getCourseById({ courseId })
        .then(res => {
            if (res.code === 0 && res.data) {
                Object.assign(data.course, res.data.course);
                getUserInfoById({ userId: data.course.teacherId ?? -1 })
                    .then(infoRes => {
                        if (infoRes.code === 0) {
                            Object.assign(data.info, infoRes.data);
                        }
                    })

            } else {
                router.replace('/404');
            }
        })
}


// fetch teacher message
// fetch comments

const submitComment = (comment: string) => {
    console.log('提交', comment);
    // 提交成功 / 失败
}

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
                <CourseItem :course="course" class="courseCard" />
                <ChooseCourse :courseId="course.courseId ?? -1" :secret="course.secretKey ?? ''" />
                <div class="leftInnerCt">
                    <TeacherNotice :info="info" />
                </div>
                <div class="qaCard">
                    <div class="cardTitle">课程问答(条)</div>
                    <CommentInput title="提出我的问题" :submitComment="submitComment" class="inputQue" />
                    <CommentList :courseId="course.courseId" />
                </div>
            </div>
            <div class="rightCt">
                <el-affix :offset="0">
                    <TeacherNotice :info="info" />
                </el-affix>
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
    .courseCard {
        height: 200px;
        background-color: #fff;
    }

    .cardTitle {
        font-size: 25px;
        margin-bottom: 10px;
    }

    .qaCard {
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;

        .inputQue {
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