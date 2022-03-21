<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useLabId } from '@/utils/helper';
import { getLabPlagiarism } from '@/utils/services';
import BtnBlue from '@/components/common/BtnBlue.vue';

const labId = useLabId();
let data: any[] = [];
const current = ref(1);
const total = ref(0);
const pageSize = ref(7);
let list = ref<any[]>([]);
const setList = () => {
    list.value = data?.slice?.((current.value - 1) * pageSize.value, current.value * pageSize.value)
}

getLabPlagiarism(labId)
    .then(res => {
        if (res.code === 0) {
            data = res.data ?? [];
            total.value = data.length;
            setList()
        }
    })
watch(current, setList)

const direct = (url: string) => {
    location.assign(url)
}
</script>

<template>
    <div v-if="list.length">
        <el-table :data="list" stripe highlight-current-row style="width: 100%">
            <el-table-column prop="num1" label="学生一学号" min-width="120" />
            <el-table-column prop="num2" label="学生二学号" min-width="120" />
            <el-table-column prop="realName1" label="学生一姓名" min-width="120" />
            <el-table-column prop="realName2" label="学生二姓名" min-width="120" />
            <el-table-column prop="similarity" label="相似度" min-width="120" />
            <el-table-column label="实验报告" min-width="100">
                <template #default="scope">
                    <BtnBlue @click="direct(scope.row.url)">查看</BtnBlue>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:currentPage="current"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            hide-on-single-page
        ></el-pagination>
    </div>
    <el-empty v-else description="暂无查重记录" />
</template>