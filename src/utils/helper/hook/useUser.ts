
import { inject } from 'vue';
import { editUserInfoType, editAvatarType, emptyEditInfoMethod, emptyEditAvatarMethod, ProvideKey } from '../../storage';
import { userInfoType, emptyUserInfo } from '@/type';

export const useUser = () => {
    const user: userInfoType = inject(ProvideKey.USER, { ...emptyUserInfo });
    const editUserInfo: editUserInfoType = inject(ProvideKey.EDIT_USER_INFO, emptyEditInfoMethod);
    const editAvatar: editAvatarType = inject(ProvideKey.EDIT_USER_AVATAR, emptyEditAvatarMethod);
    return {
        user,
        editAvatar,
        editUserInfo
    };
}