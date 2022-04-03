import { provide, reactive } from 'vue';
import { getUserInfoByTk } from '@/utils/services';
import { DEFAULT_AVATAR } from "@/utils/option";
import { userInfoType } from '@/type';

export const provideUser = () => {
    const user = reactive<userInfoType>({
        email: '',
        userId: 0,
        num: '',
        realName: '',
        avatarUrl: '',
        gender: 0,
        major: '',
        organization: ''
    })
    const editUserInfo = (params: {
        realName?: string,
        major?: string,
        organization?: string,
        gender?: number
    }) => {
        user.realName = params.realName || "";
        user.gender = params.gender || 0;
        user.major = params.major || "";
        user.organization = params.organization || "";
    }
    const editAvatar = (url: string) => {
        user.avatarUrl = url;
    }

    provide('user', user);
    provide('editUserInfo', editUserInfo);
    provide('editAvatar', editAvatar);

    getUserInfoByTk()
        .then(res => {
            if (res.code === 0) {
                user.email = res.data?.email;
                user.userId = res.data?.userId;
                user.num = res.data?.num;
                user.realName = res.data?.realName;
                user.avatarUrl = res.data?.avatarUrl || DEFAULT_AVATAR;
                user.gender = res.data?.gender;
                user.major = res.data?.major;
                user.organization = res.data?.organization;
                console.log(res);
            }
        })
}