<script lang="ts" setup>
import { ref } from 'vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import Avatar from '@/components/common/Avatar.vue';
import EditCoursePanel from './courseComp/EditCoursePanel.vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import { useReloader } from '@/utils/helper';
import { getAllCourse, manageCourseType } from '@/utils/services';
import { CodeLangs } from '@/utils/option';
import { emptyCourse } from './default';

const refTableEl = ref();
const refEditEl = ref();
const course = ref<manageCourseType>({ ...emptyCourse });
const editInfoHandler = (params: any) => {
    course.value = params;
    refEditEl?.value?.openPanel?.();
};
const submitHandler = () => {
    refTableEl?.value?.reload?.();
};
const { isReloading, reloadHandler, finishReload } = useReloader(refTableEl);
</script>

<template>
    <div class="layout">
        <BtnCt>
            <template v-slot:botton>
                <LoadBtn @reload="reloadHandler" :is-loding="isReloading" />
            </template>
        </BtnCt>
        <EditCoursePanel ref="refEditEl" :course="course" @submit="submitHandler" />
        <TablePage
            :page-size="6"
            :fetch-data="getAllCourse"
            ref="refTableEl"
            emptyDes="系统中暂无课程"
            @reloadend="finishReload"
            :no-tip="false"
        >
            <template v-slot:tableColumns>
                <el-table-column label="头像" min-width="60">
                    <template #default="scope">
                        <Avatar type="small" :src="scope.row.picUrl" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" min-width="100" />
                <el-table-column prop="description" label="描述" min-width="120" />
                <el-table-column label="语言" min-width="80">
                    <template #default="scope">{{ CodeLangs[scope.row.language] }}</template>
                </el-table-column>
                <el-table-column prop="secretKey" label="密码" min-width="90">
                    <template #default="scope">{{ scope.row.secretKey }}</template>
                </el-table-column>
                <el-table-column label="状态" min-width="80">
                    <template #default="scope">
                        {{ scope.row.isClosed ? '已关闭' : '进行中' }}
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" min-width="100" />
                <el-table-column prop="updatedAt" label="更新时间" min-width="100" />
                <el-table-column label="操作" min-width="120">
                    <template #default="scope">
                        <el-button type="danger" size="default" @click="editInfoHandler(scope.row)">
                            修改信息
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
</style>