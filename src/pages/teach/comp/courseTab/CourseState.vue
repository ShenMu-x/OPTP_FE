<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Download } from '@element-plus/icons-vue';
import BtnCt from '../common/BtnCt.vue';
import StudPage from '../common/StudPage.vue';
import StudTC from './StudTC.vue';
import TableCommon from '../common/TableCommon.vue';
import { getScoreExport, checkAttend } from '@/utils/services';
const router = useRouter();
const route = useRoute();
const courseId = parseInt(route.params?.courseId?.[0]);

const isDialogOpen = ref(false);
const closeDialog = () => {
    isDialogOpen.value = false;
}
const openDialog = () => {
    isDialogOpen.value = true;
}
const importList = () => {

}

const focusTab = ref('member');
const changeTab = () => {
    console.log(focusTab.value);
}

const pass = (userId: number) => {

}
const reject = (userId: number) => {

}

const exportScore = () => {
    getScoreExport(courseId);
}

checkAttend({
    pageCurrent: 1,
    pageSize: 5,
    courseId
})
</script>

<template>
    <div class="ct">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Download" @click="exportScore">导出成绩列表</el-button>
            </template>
        </BtnCt>
        <el-tabs tab-position="top" v-model="focusTab" @tab-click="changeTab">
            <el-tab-pane label="学生成绩" name="member">
                <!-- <TablePage :common="{ courseId }" :fetch-data="getLabs">
                    <template v-slot:tableColumns>
                        <el-table-column prop="num" label="学生学号" width="180" />
                        <el-table-column prop="realName" label="学生姓名" width="140" />
                        <el-table-column prop="email" label="邮箱" width="200" />
                    </template>
                </TablePage>-->
            </el-tab-pane>
            <el-tab-pane label="学生编码活跃度" name="verify"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="less" scoped>
.ct {
    margin: 20px;
    margin-top: 0;
}
</style>