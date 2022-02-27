<script lang="ts" setup>
import { getCourseResource } from '@/utils/services'
getCourseResource({
    courseId: 1,
    pageSize: 7,
    pageCurrent: 1
})
</script>

<template>
    <div>课程资源列表</div>
</template>

<style lang="less" scoped>
</style>