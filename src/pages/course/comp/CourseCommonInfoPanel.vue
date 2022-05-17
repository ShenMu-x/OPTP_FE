<script lang="ts" setup>
import { toRef } from 'vue';
import QuitCourse from './QuitCourse.vue';
import TeacherInfo from './TeacherInfo.vue';
import NoticeCard from './NoticeCard.vue';
import { useCourseId,  } from '@/utils/helper';
import { userInfoType } from '@/type';

const courseId = useCourseId();
const props = defineProps<{
    teacherInfo: userInfoType;
    isShow: boolean
}>();
const teacherInfo = toRef(props, 'teacherInfo');

</script>

<template>
    <div v-if="isShow">
        <QuitCourse :courseId="courseId" />
        <TeacherInfo :info="teacherInfo" />
        <NoticeCard />
    </div>
</template>