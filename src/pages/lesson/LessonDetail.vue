<template>
    <div class="detailCt">
        <div class="headerTitle">
            <ReturnBtn />
            <div class="divider"></div>
            <div class="title">课程详情</div>
        </div>
        <div class="bodyCt">
            <div class="lessonCard">课程详情卡片</div>
            <div class="teacherCard">教师信息卡片</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue-demi';
import { useRouter, useRoute } from 'vue-router';
import ReturnBtn from '@/components/ReturnBtn.vue';
import Lesson from '@/components/lesson/Lesson.vue';
const route = useRoute();
// {{courseId}}
const courseId = ref(route.params);
</script>

<style lang="less" scoped>
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

.bodyCt {
    margin-top: 20px;
    margin: 20px 80px;
    display: flex;
    justify-content: space-between;

    .lessonCard {
        height: 300px;
        width: 65%;
        background-color: #fff;
    }

    .teacherCard {
        margin-left: 40px;
        width: 33%;
        background-color: #fff;
    }
}
</style>