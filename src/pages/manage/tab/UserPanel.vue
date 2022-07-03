<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, Upload } from '@element-plus/icons-vue';
import TablePage from '@/components/common/TablePage.vue';
import BtnCt from '@/components/common/BtnCt.vue';
import Avatar from '@/components/common/Avatar.vue';
import LoadBtn from '@/components/common/LoadBtn.vue';
import CreateAccountPanel from './userComp/CreateAccountPanel.vue';
import UploadStudentPanel from './userComp/UploadStudentPanel.vue';
import EditAccountPanel from './userComp/EditAccountPanel.vue';
import EditAccountPasswordPanel from './userComp/EditAccountPasswordPanel.vue';
import { getGender, useReloader } from '@/utils/helper';
import { getAllAccoutInfo, accountType } from '@/utils/services';
import { emptyAccount } from './default';

const refTableEl = ref();
const refCreateAccountEl = ref();
const openAccountPanel = () => {
    refCreateAccountEl?.value?.openPanel?.();
};
const refUploadStudentEl = ref();
const openUploadPanel = () => {
    refUploadStudentEl?.value?.openPanel?.();
};
const refEditInfoEl = ref();
const account = ref<accountType>({...emptyAccount});
const editInfoHandler = (params: any) => {
    account.value = params;
    refEditInfoEl?.value?.openPanel?.();
};
const refEditPasswordEl = ref();
const editPasswordHandler = (params: any) => {
    account.value = params;
    refEditPasswordEl?.value?.openPanel?.();
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
                <el-button :icon="Plus" @click="openAccountPanel">新增系统用户</el-button>
                <el-button :icon="Upload" @click="openUploadPanel" style="margin-right: 12px">
                    导入学生信息
                </el-button>
                <LoadBtn @reload="reloadHandler" :is-loding="isReloading" />
            </template>
        </BtnCt>
        <CreateAccountPanel ref="refCreateAccountEl" />
        <UploadStudentPanel ref="refUploadStudentEl" />
        <EditAccountPanel ref="refEditInfoEl" :account="account" @submit="submitHandler" />
        <EditAccountPasswordPanel ref="refEditPasswordEl" :account="account" @submit="submitHandler" />
        <TablePage
            :page-size="6"
            :fetch-data="getAllAccoutInfo"
            ref="refTableEl"
            emptyDes="系统中暂无账户"
            @reloadend="finishReload"
            :no-tip="false"
        >
            <template v-slot:tableColumns>
                <el-table-column label="头像" min-width="60">
                    <template #default="scope">
                        <Avatar type="small" :src="scope.row.avatarUrl" />
                    </template>
                </el-table-column>
                <el-table-column prop="realName" label="姓名" min-width="100" />
                <el-table-column prop="num" label="学号" min-width="100" />
                <el-table-column prop="email" label="邮箱" min-width="140" />
                <el-table-column prop="gender" label="性别" min-width="60">
                    <template #default="scope">{{ getGender(scope.row.gender) }}</template>
                </el-table-column>
                <el-table-column prop="major" label="专业" min-width="100" />
                <el-table-column prop="organization" label="单位" min-width="100" />
                <el-table-column prop="college" label="学院" min-width="100" />
                <el-table-column prop="grade" label="年级" min-width="100" />
                <el-table-column label="操作" min-width="220">
                    <template #default="scope">
                        <el-button size="default" @click="editInfoHandler(scope.row)">
                            修改信息
                        </el-button>
                        <el-button type="danger" size="default" @click="editPasswordHandler(scope.row)">
                            修改密码
                        </el-button>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
    </div>
</template>

<style lang="less" scoped>
</style>