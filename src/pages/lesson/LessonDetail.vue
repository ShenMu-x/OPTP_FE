<template>
    <div class="detailCt">
        <div class="headerTitle">
            <ReturnBtn />
            <div class="divider"></div>
            <div class="title">课程详情</div>
        </div>
        <div class="bodyCt">
            <div class="leftCt">
                <Lesson :lesson="lessonMock" class="lessonCard" />
                <div class="leftInnerCt">
                    <TeacherNotice />
                </div>
                <div class="qaCard">课程回答组件</div>
            </div>
            <div class="rightCt">
                <TeacherNotice />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import ReturnBtn from '@/components/ReturnBtn.vue';
import Lesson from '@/components/lesson/Lesson.vue';
import { lesson } from './mock';
import TeacherNotice from './comp/TeacherNotice.vue';
const route = useRoute();

const courseId = ref(route.params);

// fetch lesson message

const lessonMock = reactive(lesson);
</script>

<style lang="less" scoped>
@import url("@/styles/var.less");
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
    margin: 20px 80px 80px;
    display: flex;
    flex-direction: column;
}

.leftCt {
    width: 100%;
    .lessonCard {
        height: 200px;
        background-color: #fff;
    }

    .qaCard {
        margin-top: 20px;
        height: 600px;
        background-color: #fff;
    }
}

.rightCt {
    display: none;
}

.leftInnerCt {
    display: block;
}

@media screen and (min-width: @min-width) {
    .bodyCt {
        flex-direction: row;
        justify-content: space-between;
    }
    .leftCt {
        width: 70%;
    }
    .rightCt {
        display: block;
        margin-top: 0;
        margin-left: 40px;
        width: 28%;
    }

    .leftInnerCt {
        display: none;
    }
}
</style>