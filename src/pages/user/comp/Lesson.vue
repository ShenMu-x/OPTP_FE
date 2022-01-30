<template>
    <div class="lessonCt" @click="toLesson">
        <div class="lessonMain">
            <div class="cover">cover</div>
            <div class="lessonInfo">
                <div
                    class="lessonTitle"
                    :title="props.lesson.courseName"
                >{{ props.lesson.courseName }}</div>
                <div class="lessonStart">{{ props.lesson.createdAt }}</div>
                <div :class="{ 'endTag': true, 'isClose': isClose }">
                    <span v-if="props.lesson.isClose === 1">已结束</span>
                    <span v-else>进行中</span>
                </div>
            </div>
        </div>
        <div class="lessonDes" :title="props.lesson?.description !== '' ? props.lesson?.description : ''">课程描述: {{ props.lesson?.description !== '' ? props.lesson?.description : '暂无描述'}}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LessonType } from '@/type';

const props = defineProps<{ lesson: LessonType }>();

const isClose = ref(props.lesson.isClose === 1);

const toLesson = () => {

}
</script>

<style lang="less" scoped>
.lessonCt {
    height: 200px;
    flex-basis: 30%;
    width: 30%;
    background-image: linear-gradient( 135deg, #72eef21e 10%, #5151e51e 100%);
    border: 1px solid #c8cace;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
}

.lessonMain {
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

    .lessonInfo {
        width: calc(100% - 80px - 20px);
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;

        .lessonTitle,
        .lessonStart {
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

        .lessonStart {
            color: #aaa;
            font-size: 14px;
        }
    }
}

.lessonDes {
    margin-top: 20px;
    height: 60px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
}

.endTag {
    display: inline-block;
    height: 26px;
    padding: 0 10px;
    line-height: 26px;
    font-size: 12px;
    border-width: 1px solid #e1f3d8;
    border-radius: 4px;
    background-color: #f0f9eb;
    color: #67c23a;
}

.isClose {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
}

// 适配
@media screen and (max-width: 1350px) {
    .lessonCt {
        height: 200px;
        flex-basis: 48%;
        width: 48%;
    }
}

@media screen and (max-width: 920px) {
    .lessonCt {
        height: 200px;
        flex-basis: 100%;
        width: 100%;
    }
}
</style>