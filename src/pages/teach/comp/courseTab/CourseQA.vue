<script lang="ts" setup>
import CommentList from '@/components/comment/CommentList.vue';
</script>

<template>
    <div class="ct">
        <CommentList :courseId="2" />
    </div>
</template>

<style lang="less" scoped>
.ct {
    margin: 20px;
    margin-top: 0;
}
</style>