import { provide, reactive } from 'vue';
import { getUserInfoByToken } from '@/utils/services';
import { DEFAULT_AVATAR } from "@/utils/option";
import { ProvideKey, editUserInfoType, editAvatarType, getUserInConfig } from '@/utils/storage';
import { userInfoType, emptyUserInfo } from '@/type';

const initUserInfo: (user: userInfoType, res: { code: number, data?: userInfoType }) => void = (user, res) => {
    if (res.code === 0) {
        user.email = res.data?.email;
        user.userId = res.data?.userId;
        user.num = res.data?.num;
        user.realName = res.data?.realName;
        user.avatarUrl = res.data?.avatarUrl || DEFAULT_AVATAR;
        user.gender = res.data?.gender;
        user.major = res.data?.major;
        user.organization = res.data?.organization;
    }
}

export const provideUser = () => {
    const user = reactive<userInfoType>({ ...emptyUserInfo })
    const editUserInfo: editUserInfoType = (params) => {
        user.realName = params.realName || "";
        user.gender = params.gender || 0;
        user.major = params.major || "";
        user.organization = params.organization || "";
        user.grade = params.grade || 0;
        user.college = params.college || "";
    }
    const editAvatar: editAvatarType = (url) => { user.avatarUrl = url; }

    provide(ProvideKey.USER, user);
    provide(ProvideKey.EDIT_USER_INFO, editUserInfo);
    provide(ProvideKey.EDIT_USER_AVATAR, editAvatar);

    // 从config中获取，兜底从getUserInfoByToken请求
    if (getUserInConfig()) Object.assign(user, getUserInConfig())
    else getUserInfoByToken().then(res => initUserInfo(user, res))
}