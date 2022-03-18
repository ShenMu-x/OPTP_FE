
import { createStore } from 'vuex';
import { userInfoType } from '@/type';
import { DEFAULT_AVATAR } from "@/utils/option";

const store = createStore({
    state() {
        return {
            user: {
                userId: 0,
                email: '',
                num: "",
                realName: "",
                major: "",
                organization: "",
                gender: 0,
                avatarUrl: DEFAULT_AVATAR
            }
        }
    },
    mutations: {
        setUserInfo(state: { user: userInfoType; }, payload: { user: userInfoType }) {
            state.user.userId = payload.user.userId;
            state.user.avatarUrl = payload.user.avatarUrl === '' ? DEFAULT_AVATAR : payload.user.avatarUrl;
            state.user.email = payload.user.email;
            state.user.num = payload.user.num;
            state.user.realName = payload.user.realName;
            state.user.major = payload.user.major;
            state.user.organization = payload.user.organization;
            state.user.gender = payload.user.gender;
        },

        setUserAvatar(state: { user: userInfoType; }, payload: { url: string }) {
            if (payload.url) {
                state.user.avatarUrl = payload.url
            }
        },

        editUserInfo(state: { user: userInfoType; }, payload: {
            realName: string,
            major: string,
            organization: string,
            gender: number
        }) {
            state.user.realName = payload.realName;
            state.user.major = payload.major;
            state.user.organization = payload.organization;
            state.user.gender = payload.gender;
        }
    }
})

export default store;