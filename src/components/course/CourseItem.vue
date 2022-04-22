<script lang="ts" setup>
import { toRef } from 'vue';
import Avatar from '../common/Avatar.vue';
import Tag from '../common/Tag.vue';
import { useDirect } from '@/utils/helper';
import { CourseType } from '@/type';

const props = defineProps<{
    course: CourseType,
    heightAuto?: boolean
}>();
const course = toRef(props, 'course');

const { routerToCourseDetail } = useDirect();
const toCourseDetail = () => routerToCourseDetail('direct', { courseId: course.value.courseId ?? 0 })
</script>

<template>
    <div :class="['courseCt', props.heightAuto ? '' : 'fixCt']" @click="toCourseDetail">
        <div class="courseMain">
            <Avatar type="large" class="cover" :src="course.picUrl" />
            <div class="courseInfo">
                <div class="courseTitle" :title="course.courseName">{{ course.courseName }}</div>
                <div class="courseStart">{{ course.createdAt }}</div>
                <Tag :type="course.isClose ? 'red' : 'green'" />
            </div>
        </div>
        <div :class="['courseDes', props.heightAuto ? '' : 'fixDes']" class="courseDes"
            :title="course?.courseDes || ''">课程描述: {{ course?.courseDes || '暂无描述' }}</div>
    </div>
</template>

<style lang="less" scoped>
.courseCt {
    min-height: 200px;
    flex-basis: 100%;
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

.fixCt {
    height: 200px;
}

.courseMain {
    width: 100%;

    .cover {
        float: left;
        flex-basis: 80px;
        flex-shrink: 0;
        height: 80px;
        width: 80px;
        border: 1px solid #aaa;
        margin-right: 20px;
    }

    .courseInfo {
        width: calc(100% - 80px - 20px);
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        .courseTitle,
        .courseStart {
            width: 100%;
            line-height: 26px;
            height: 26px;
            font-weight: bold;
            font-size: 18px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .courseStart {
            color: #aaa;
            font-size: 14px;
        }
    }
}

.courseDes {
    margin-top: 20px;
    min-height: 60px;
}

.fixDes {
    height: 60px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
}
</style>