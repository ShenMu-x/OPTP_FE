
import { createStore } from 'vuex';
import { userInfoType } from '@/type';

const store = createStore({
    state() {
        return {
            user: {
                userId: -1,
                email: '',
                num: "",
                realName: "",
                major: "",
                organization: "",
                gender: 0,
                avatarUrl: '',
            }
        }
    },
    mutations: {
        setUserInfo(state: { user: userInfoType; }, payload: { user: userInfoType }) {
            state.user.userId = payload.user.userId ?? state.user.userId;
            state.user.avatarUrl = payload.user.avatarUrl ?? state.user.avatarUrl;
            state.user.email = payload.user.email ?? state.user.email;
            state.user.num = payload.user.num ?? state.user.num;
            state.user.realName = payload.user.realName ?? state.user.realName;
            state.user.major = payload.user.major ?? state.user.major;
            state.user.organization = payload.user.organization ?? state.user.organization;
            state.user.gender = payload.user.gender ?? state.user.gender;
        },
    }
})

export default store;