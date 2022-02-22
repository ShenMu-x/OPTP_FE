<script lang="ts" setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { ElLoading } from 'element-plus';
import CourseItem from './CourseItem.vue';
import { CourseListType } from '@/type';
import { courses } from './mock';
import { showSuccessWrap, showFailWrap } from '@/utils/helper';

const props = defineProps<{
    fetchData?: any,
    common?: {
        emptyDes?: string
    }
}>();
const data = reactive<{ courses: CourseListType }>({ courses: [] });

const pageSize = 6;
const current = ref(1)
const total = ref(courses.length);

const refEl = ref();
const isLoading = ref(false);
const ins = ref();

const isReload = ref(false);
const emits = defineEmits(['reloadend']);

const currentIdx = computed(() => (current.value - 1) * pageSize)
const content = computed(() => data.courses?.slice(currentIdx.value, currentIdx.value + pageSize));

// 监听页面变化
watch(current, (newVal, _) => {
    fetch(newVal);
})

const fetch = (current: number) => {
    console.log('fetch');
    isLoading.value = true;
    if (refEl.value) {
        ins.value = ElLoading.service({
            target: refEl.value,
            fullscreen: false,
            background: 'transparent'
        })
    }

    props.fetchData?.({
        pageSize: pageSize,
        pageCurrent: current
    })
        .then((res: any) => {
            if (res.code === 0) {
                data.courses = res.data.records;
                total.value = res.data.pageInfo.total;
            } else {
                showFailWrap({ text: '获取课程列表失败,请稍后再试' })
            }
            if (isReload.value) {
                emits('reloadend');
                res.code === 0 && showSuccessWrap({ text: '已刷新' })
                isReload.value = false
            }
            isLoading.value = false;
            ins.value.close?.();
        })
}

const reload = () => {
    console.log('reload');
    current.value = 1;
    fetch(1);
    isReload.value = true;
}

onMounted(() => {
    fetch(1);
});

defineExpose({
    reload
})

</script>

<template>
    <div class="coursesCt" ref="refEl">
        <template v-if="content?.length > 0 && !isLoading">
            <CourseItem
                v-for="item in content"
                :key="item.courseId"
                :course="item"
                class="courseCt"
            />
        </template>
        <el-empty
            v-if="!content?.length && !isLoading"
            :description="props.common?.emptyDes ?? '暂无数据'"
            style="flex: 1"
        />
    </div>
    <el-pagination
        v-model:currentPage="current"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
    ></el-pagination>
</template>

<style lang="less" scoped>
@import url("@/styles/var.less");
.coursesCt {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 480px;
    padding-top: 20px;
}

.courseCt {
    flex-basis: 100%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px #5151e51e;
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