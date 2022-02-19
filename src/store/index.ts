
import { createStore } from 'vuex';
import { userInfoType } from '@/type';

const store = createStore({
    state() {
        return {
            user: {
                userId: 1,
                email: 'xxx@111.com',
                uid: "20182131000",
                userName: "用户名",
                major: "计算机科学与技术",
                organization: "华南师范大学",
                gender: 1,
                avatarUrl: '',
            }
        }
    },
    mutations: {
        setUserInfo(state: { user: userInfoType; }, payload: { user: userInfoType }) {
            state.user.userId = payload.user.userId;
            state.user.avatarUrl = payload.user.avatarUrl;
            state.user.email = payload.user.email;
            state.user.uid = payload.user.uid;
            state.user.userName = payload.user.userName;
            state.user.major = payload.user.major;
            state.user.organization = payload.user.organization;
            state.user.gender = payload.user.gender;
        },
    }
})

export default store;