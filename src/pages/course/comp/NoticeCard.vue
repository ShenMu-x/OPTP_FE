<script lang="ts" setup>
import NoticeItem from './NoticeItem.vue';
import { useCourseId, usePageList } from '@/utils/helper';
import { getCourseNotice } from '@/utils/services';

const courseId = useCourseId();
const pageSize = 7;
const { current, total, list, fetch, setCommon, reload } = usePageList({
    size: pageSize,
    fetchData: getCourseNotice,
    failText: '获取公告列表失败,请稍后再试',
    noTip: true,
    common: { courseId },
});

courseId && fetch(1);
</script>

<template>
    <div class="noticeCard">
        <div class="title">公告卡片</div>
        <template v-if="total > 0">
            <NoticeItem v-for="item in list" :info="item" :key="item.resourceId" />
            <el-pagination
                v-model:currentPage="current"
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                hide-on-single-page
            ></el-pagination>
        </template>
        <div class="empty" v-else>该课程下暂无公告</div>
    </div>
</template>

<style lang="less" scoped>
.noticeCard {
    min-height: 100px;
    padding-bottom: 20px;
    background-color: #fff;
    overflow: hidden;
}
.title {
    font-size: 25px;
    margin: 10px;
}
.empty {
    display: flex;
    justify-content: center;
}
</style>