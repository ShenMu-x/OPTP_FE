<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, Upload } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import Avatar from '@/components/common/Avatar.vue';
import CreateAccountPanel from './comp/CreateAccountPanel.vue';
import UploadStudentPanel from './comp/UploadStudentPanel.vue';
import EditAccountPanel from './comp/EditAccountPanel.vue';
import { getGender } from '@/utils/helper';
import { getAllAccoutInfo } from '@/utils/services';

const refCreateAccountEl = ref();
const openAccountPanel = () => {
    refCreateAccountEl?.value?.openPanel?.();
}
const refUploadStudentEl = ref();
const openUploadPanel = () => {
    refUploadStudentEl?.value?.openPanel?.();
}
const refEditInfoEl = ref();
const info = ref<any>({});
const editInfoHandler = (params: any) => {
    info.value = params;
    refEditInfoEl?.value?.openPanel?.();
}
</script>

<template>
    <div class="layout">
        <BtnCt>
            <template v-slot:botton>
                <el-button :icon="Plus" @click="openAccountPanel">新增系统用户</el-button>
                <el-button :icon="Upload" @click="openUploadPanel">导入学生信息</el-button>
            </template>
        </BtnCt>
        <CreateAccountPanel ref="refCreateAccountEl" />
        <UploadStudentPanel ref="refUploadStudentEl" />
        <EditAccountPanel ref="refEditInfoEl" />
        <TablePage
            :page-size="6"
            :fetch-data="getAllAccoutInfo"
            ref="refTableEl"
            emptyDes="系统中暂无账户"
        >
            <template v-slot:tableColumns>
                <el-table-column label="头像" min-width="40">
                    <template #default="scope">
                        <Avatar type="small" :src="scope.row.avatarUrl" />
                    </template>
                </el-table-column>
                <el-table-column prop="realName" label="姓名" min-width="100" />
                <el-table-column prop="num" label="学号" min-width="100" />
                <el-table-column prop="email" label="邮箱" min-width="140" />
                <el-table-column prop="gender" label="性别" min-width="40">
                    <template #default="scope">{{ getGender(scope.row.gender) }}</template>
                </el-table-column>
                <el-table-column prop="major" label="专业" min-width="100" />
                <el-table-column prop="organization" label="单位" min-width="100" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            type="danger"
                            size="default"
                            @click="editInfoHandler(scope.row)"
                        >修改信息</el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
</style>