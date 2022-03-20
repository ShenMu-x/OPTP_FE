<script lang="ts" setup>
import { ref } from 'vue';
import SearchCourseButton from './SearchCourseButton.vue';
import SearchCourseList from './SearchCourseList.vue';
import CourseList from '@/components/course/CourseList.vue';
import { getAllCourseList } from '@/utils/services';

const isInSearchType = ref(false);
const keyword = ref("");

const searchCourse = (word: string) => {
    isInSearchType.value = true;
    keyword.value = word;
}
const cancel = () => {
    isInSearchType.value = false;
}
</script>

<template>
    <div>
        <div class="btnCt">
            <SearchCourseButton @search="searchCourse" @cancel="cancel" />
        </div>
        <SearchCourseList :keyword="keyword" v-if="isInSearchType" />
        <CourseList :fetchData="getAllCourseList" v-else />
    </div>
</template>

<style lang="less" scoped>
.btnCt {
    display: flex;
    width: 400px;
}
</style>