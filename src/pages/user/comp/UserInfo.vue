<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import BtnBlue from '@/components/common/BtnBlue.vue';
import { editUserAvatar } from '@/utils/services';
import { logout, useDirect, useUser } from '@/utils/helper';

const props = defineProps<{
    role?: 0 | 1;
}>();
const { routerToEditInfo } = useDirect();
const directToEditInfo = () => routerToEditInfo('direct');
const { user, editAvatar } = useUser();
const updateUserInject = (url: string) => editAvatar(url);
</script>
 
<template>
    <div class="userInfoCt">
        <UploadAvatar
            :avatarUrl="user.avatarUrl"
            :submit-api="editUserAvatar"
            :afterSubmit="updateUserInject"
        />
        <div class="info">
            <div class="name">
                {{ user.realName }}
                <el-button type="text" :icon="Edit" class="editBtn" @click="directToEditInfo">
                    编辑个人信息
                </el-button>
            </div>
            <div>账号: {{ user.num }}</div>
        </div>
        <BtnBlue size="large" @click="logout">退出登录</BtnBlue>
    </div>
</template>

<style lang="less" scoped>
.userInfoCt {
    display: flex;
    align-items: center;
}

.name {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
}

.info {
    height: 80px;
    margin-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>