<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import PageHeader from '@/components/common/PageHeader.vue';
import CourseItem from '@/components/course/CourseItem.vue';
import CourseCommonInfoPanel from './comp/CourseCommonInfoPanel.vue';
import UnEnrollCourseDetail from './comp/UnEnrollCourseDetail.vue';
import CourseLabAndQAPanel from './comp/CourseLabAndQAPanel.vue';
import {
    scrollToPos,
    useCourseId,
    showFailWrap,
    useDirect,
    useListenPageWidth,
} from '@/utils/helper';
import { getCourseById } from '@/utils/services';
import { CourseType, emptyCourseInfo, emptyUserInfo, userInfoType } from '@/type';

const courseId = useCourseId();
const data = reactive<{ course: CourseType; info: userInfoType }>({
    course: { ...emptyCourseInfo },
    info: { ...emptyUserInfo },
});
const { course, info } = toRefs(data);

// @min-width: 920px 页面因布局存在两个CourseCommonInfoPanel，根据组件是否显示去请求数据
const { isShowPanel } = useListenPageWidth(920);
const { redirectNotFound } = useDirect();

scrollToPos(0);
getCourseById({ courseId }).then((res) => {
    if (res.code === 0 && res.data) {
        Object.assign(data.course, res.data);
        info.value.avatarUrl = res.data.teacherAvatar;
        info.value.realName = res.data.teacherName;
        info.value.email = res.data.teacherEmail;
    } else {
        showFailWrap({
            text: res.errorMsg,
            closeCb: redirectNotFound,
        });
    }
});
</script>

<template>
    <PageHeader content="课程详情" />
    <div class="ct">
        <div class="enrollCt" v-if="course.isEnroll">
            <div class="leftCt">
                <CourseItem :course="course" class="courseCard" :heightAuto="true" />
                <div class="leftInnerCt">
                    <CourseCommonInfoPanel :teacherInfo="info" :isShow="!isShowPanel" />
                </div>
                <CourseLabAndQAPanel class="labAndQaPanel" />
            </div>
            <div class="rightCt">
                <el-affix :offset="0">
                    <CourseCommonInfoPanel :teacherInfo="info" :isShow="isShowPanel" />
                </el-affix>
            </div>
        </div>
        <UnEnrollCourseDetail :course="course" :info="info" v-else />
    </div>
</template>

<style lang="less" scoped>
@import url('@/styles/var.less');

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
    .labAndQaPanel {
        margin-top: 20px;
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