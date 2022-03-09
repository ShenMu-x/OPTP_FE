<script lang="ts" setup>
import { reactive, toRefs } from 'vue-demi';
import { useRoute, useRouter } from 'vue-router';
import ReturnBtn from '@/components/common/ReturnBtn.vue';
import CourseItem from '@/components/course/CourseItem.vue';
import ChooseCourse from './comp/ChooseCourse.vue';
import QuitCourse from './comp/QuitCourse.vue'
import TeacherInfo from './comp/TeacherInfo.vue';
import NoticeCard from './comp/NoticeCard.vue';
import QACard from '@/components/comment/QACard.vue';
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
            router.replace('/404');
        }
    })
</script>

<template>
    <div class="detailCt">
        <div class="headerTitle">
            <ReturnBtn />
            <div class="divider"></div>
            <div class="title">课程详情</div>
        </div>
        <div class="enrollCt" v-if="course.isEnroll">
            <div class="leftCt">
                <CourseItem :course="course" class="courseCard" :heightAuto="true"/>
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
        <div class="unEnroll" v-else>
            <div class="unEnrollCt">
                <CourseItem :course="course" class="courseCard" :heightAuto="true"/>
                <TeacherInfo :info="info" class="teachInfo"/>
            </div>

            <ChooseCourse :courseId="course.courseId ?? 0" :secret="course.secretKey ?? ''" />
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

.enrollCt,
.unEnroll {
    margin: 20px 80px 80px;
    display: flex;
    flex-direction: column;

    .unEnrollCt {
        display: flex;
        .teachInfo {
            margin-left: 20px;
        }
    }
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