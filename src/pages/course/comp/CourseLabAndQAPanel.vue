<script lang="ts" setup>
import { ref } from 'vue';
import LabList from '@/components/lab/LabList.vue';
import QACard from '@/components/comment/QACard.vue';
import { useCourseId } from '@/utils/helper';
import { getCourseLabList } from '@/utils/services';

const courseId = useCourseId();
const focusTab = ref('lab');
const refQACardEl = ref();
</script>

<template>
    <div class="course-tab-ct">
        <el-tabs tab-position="top" class="demo-tabs" v-model="focusTab">
            <el-tab-pane label="课程实验" name="lab" lazy>
                <LabList :fetch-lab-list="getCourseLabList" :common="{ courseId }" />
            </el-tab-pane>
            <el-tab-pane label="课程问答" name="qa" lazy>
                <div class="qaCard">
                    <div class="cardTitle">
                        课程问答
                        {{
                            refQACardEl?.getCommentCount?.() > 0
                                ? `(${refQACardEl?.getCommentCount?.()} 条)`
                                : ''
                        }}
                    </div>
                    <QACard type="course" ref="refQACardEl" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="less" scoped>
.course-tab-ct {
    background-color: #fff;
    padding: 10px 20px;
}
.cardTitle {
    font-size: 25px;
    margin-bottom: 10px;
}

.qaCard {
    padding: 10px;
}
</style>