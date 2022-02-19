<template>
    <div class="block">
        <div class="coursesCt">
            <template v-if="content?.length && content.length > 0">
                <template v-for="item in content" :key="item.id">
                    <CourseItem :course="item" class="courseCt" />
                </template>
            </template>
            <div class="noData" v-else>暂无数据</div>
        </div>
        <el-pagination
            v-if="props?.courses?.length ?? 0 > 0"
            v-model:currentPage="current"
            layout="prev, pager, next"
            :total="props?.courses?.length"
            :page-size="pageSize"
            hide-on-single-page
        ></el-pagination>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import CourseItem from './CourseItem.vue';
import { CourseListType } from '@/type';
const props = defineProps<{ courses?: CourseListType }>();
const current = ref(1)
const pageSize = ref(6);

const currentIdx = computed(() => (current.value - 1) * pageSize.value)
const content = computed(() => props?.courses?.slice(currentIdx.value, currentIdx.value + pageSize.value));

</script>

<style lang="less" scoped>
@import url('@/styles/var.less');
.coursesCt {
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

.courseCt {
    flex-basis: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #c8cace;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #5151e51e;
        background-color: rgb(252, 252, 252);
    }
}

@media screen and (min-width: @min-width) {
    .courseCt {
        flex-basis: 48%;
        width: 48%;
    }
}

// 适配
@media screen and (min-width: @middle-width) {
    .courseCt {
        flex-basis: 30%;
        width: 30%;
    }
}
</style>