<template>
    <div class="lessonCt" @click="toLesson">
        这是一个课程组件, {{props.lesson.id}}
    </div>
</template>

<script lang="ts" setup>
import { toRefs } from "vue-demi";
import { LessonType } from '../type';

const props = defineProps<{lesson: LessonType}>();

const toLesson = () => {

}
</script>

<style>
.lessonCt {
    height: 200px;
    flex-basis: 30%;
    width: 30%;
    border: 1px solid #aaa;
    margin-bottom: 20px;
}
</style>