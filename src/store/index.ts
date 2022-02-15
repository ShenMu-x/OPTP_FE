
import { createStore } from 'vuex';
import { userInfoType } from '@/type';
import { setToken } from '@/utils/storage';

const store = createStore({
    state() {
        return {
            user: {
                userId: -1,
                email: 'xxx@111.com',
                uid: "20182131000",
                userName: "用户名",
                major: "计算机科学与技术",
                organization: "华南师范大学",
                gender: 1,
                avatarUrl: '',
            } as userInfoType
        }
    },
    mutations: {
        setUserInfo(state: { user: userInfoType; }) {
            // 获取userInfo并修改
        },
    }
})

export default store;