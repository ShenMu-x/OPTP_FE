<script lang="ts" setup>
import { toRefs } from 'vue';
import CourseItem from '@/components/course/CourseItem.vue';
import ChooseCourse from './ChooseCourse.vue';
import TeacherInfo from './TeacherInfo.vue';
import { CourseType, userInfoType } from '@/type';

const props = defineProps<{ course: CourseType, info: userInfoType }>();
const { course, info } = toRefs(props);
</script>

<template>
    <div class="unEnrollCt">
        <CourseItem :course="course" class="courseCard" :heightAuto="true" />
        <TeacherInfo :info="info" class="teachInfo" />
    </div>
    <ChooseCourse :courseId="course.courseId ?? 0" :isClose="course.isClose ?? false" :needAudit="course.needAudit ?? true" />
</template>

<style lang="less" scoped>
.unEnrollCt {
    display: flex;
    .teachInfo {
        margin-left: 20px;
    }
}
.courseCard {
    min-height: 200px;
    background-color: #fff;
}
</style>