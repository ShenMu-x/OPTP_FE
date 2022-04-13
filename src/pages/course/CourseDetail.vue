<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import CourseItem from '@/components/course/CourseItem.vue';
import QACard from '@/components/comment/QACard.vue';
import QuitCourse from './comp/QuitCourse.vue';
import TeacherInfo from './comp/TeacherInfo.vue';
import NoticeCard from './comp/NoticeCard.vue';
import UnEnrollCourseDetail from './comp/UnEnrollCourseDetail.vue';
import { scrollToPos, useCourseId, showFailWrap, useDirect } from '@/utils/helper';
import { getCourseById, getUserInfoById } from '@/utils/services';
import { CourseType, userInfoType } from '@/type';

const courseId = useCourseId();
const data = reactive<{ course: CourseType, info: userInfoType }>({ course: {}, info: {} });
const { course, info } = toRefs(data);
const { routerBack } = useDirect();

scrollToPos(0);
getCourseById({ courseId })
    .then(res => {
        if (res.code === 0 && res.data) {
            Object.assign(data.course, res.data);
            getUserInfoById({ userId: res.data.teacherId ?? -1 })
                .then(infoRes => {
                    if (infoRes.code === 0) {
                        Object.assign(data.info, infoRes.data);
                    }
                })
        } else {
            showFailWrap({ text: res.errorMsg, closeCb: routerBack })
        }
    })
</script>

<template>
    <PageHeader content="课程详情" />
    <div class="ct">
        <div class="enrollCt" v-if="course.isEnroll">
            <div class="leftCt">
                <CourseItem :course="course" class="courseCard" :heightAuto="true" />
                <div class="leftInnerCt">
                    <QuitCourse :courseId="course.courseId ?? 0" />
                    <TeacherInfo :info="info" />
                    <NoticeCard />
                </div>
                <div class="qaCard">
                    <div class="cardTitle">课程问答(条)</div>
                    <QACard type="course" />
                </div>
            </div>
            <div class="rightCt">
                <el-affix :offset="0">
                    <QuitCourse :courseId="course.courseId ?? 0" />
                    <TeacherInfo :info="info" />
                    <NoticeCard />
                </el-affix>
            </div>
        </div>
        <UnEnrollCourseDetail :course="course" :info="info" v-else />
    </div>
</template>

<style lang="less" scoped>
@import url("@/styles/var.less");

.ct {
    margin: 40px 90px 100px;
    display: flex;
    flex-direction: column;
}

.enrollCt {
    display: flex;
    flex-direction: column;
}

.courseCard {
    min-height: 200px;
    background-color: #fff;
}

.leftCt {
    width: 100%;

    .cardTitle {
        font-size: 25px;
        margin-bottom: 10px;
    }

    .qaCard {
        margin-top: 20px;
        padding: 20px;
        background-color: #fff;
    }
}

.rightCt {
    display: none;
}

.leftInnerCt {
    display: block;
}

@media screen and (min-width: @min-width) {
    .enrollCt {
        flex-direction: row;
        justify-content: space-between;
    }

    .leftCt {
        width: 65%;
    }

    .rightCt {
        display: block;
        margin-top: 0;
        margin-left: 40px;
        width: 33%;
    }

    .leftInnerCt {
        display: none;
    }
}
</style>