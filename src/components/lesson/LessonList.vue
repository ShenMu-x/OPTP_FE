<template>
    <div class="block">
        <div class="lessonsCt">
            <template v-if="content?.length && content.length > 0">
                <template v-for="item in content" :key="item.id">
                    <Lesson :lesson="item" class="lessonCt" />
                </template>
            </template>
            <div class="noData" v-else>暂无数据</div>
        </div>
        <el-pagination
            v-if="props?.lessons?.length ?? 0 > 0"
            v-model:currentPage="current"
            layout="prev, pager, next"
            :total="props?.lessons?.length"
            :page-size="pageSize"
            hide-on-single-page
        ></el-pagination>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue';
import Lesson from './Lesson.vue';
import { LessonListType } from '@/type';
const props = defineProps<{ lessons?: LessonListType }>();
const current = ref(1)
const pageSize = ref(6);

const currentIdx = computed(() => (current.value - 1) * pageSize.value)
const content = computed(() => props?.lessons?.slice(currentIdx.value, currentIdx.value + pageSize.value));

</script>

<style lang="less" scoped>
@import url('@/styles/var.less');
.lessonsCt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 480px;
    padding-top: 20px;
}

.noData {
    flex: 1;
    text-align: center;
}

.lessonCt {
    flex-basis: 100%;
    width: 100%;

    background-image: linear-gradient( 135deg, #72eef21e 10%, #5151e51e 100%);
    border: 1px solid #c8cace;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 20px #5151e51e;
    }
}

@media screen and (min-width: @min-width) {
    .lessonCt {
        flex-basis: 48%;
        width: 48%;
    }
}

// 适配
@media screen and (min-width: @middle-width) {
    .lessonCt {
        flex-basis: 30%;
        width: 30%;
    }
}
</style>