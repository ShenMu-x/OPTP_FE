<template>
    <div class="block">
        <div class="lessonsCt">
            <template v-if="content?.length && content.length > 0">
                <template v-for="item in content" :key="item.id">
                    <Lesson :lesson="item" />
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
</style>