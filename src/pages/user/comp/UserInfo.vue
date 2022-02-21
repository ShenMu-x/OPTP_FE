<script lang="ts" setup>
import { reactive } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Edit } from '@element-plus/icons-vue';
import UploadAvatar from '@/components/common/UploadAvatar.vue';
import { editUserAvatar } from '@/utils/services';
import { rmToken, rmRole } from '@/utils/storage';
import { showSuccessWrap, DEFAULT_AVATAR } from '@/utils/helper';
import { userInfoType } from '@/type';
const props = defineProps<{
    role?: 0 | 1;
}>();

const router = useRouter();
const store = useStore();

// 从用户存储中取出
const userInfo: userInfoType = reactive(store.state.user);

const handlerEditInfo = () => {
    // 跳转修改用户信息页
    router.push('/editinfo');
}

const refreshAvatar = (url: string) => {
    store.commit('setUserInfo', { avatar_url: url })
}

const handlerLogOut = () => {
    rmToken();
    rmRole();

    showSuccessWrap({
        text: '已退出登录,跳转登录页...',
        closeCb: () => {
            router.push('/login')
        }
    })
};

</script>

<template>
    <div class="userInfoCt">
        <UploadAvatar
            :avatarUrl="userInfo.avatarUrl === '' ? DEFAULT_AVATAR : userInfo.avatarUrl"
            :submit-api="editUserAvatar"
            :afterUpload="refreshAvatar"
        />
        <div class="info">
            <div class="name">
                {{ userInfo.realName }}
                <el-button type="text" :icon="Edit" class="editBtn" @click="handlerEditInfo">编辑个人信息</el-button>
            </div>
            <div>{{ props.role === 1 ? '职工号' : '学号' }}: {{ userInfo.num }}</div>
        </div>
        <el-button type="primary" @click="handlerLogOut">退出登录</el-button>
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