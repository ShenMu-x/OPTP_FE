
import { createStore } from 'vuex';
import { userInfoType } from '@/type';

const store = createStore({
    state() {
        return {
            user: {
                email: 'xxx@111.com',
                userName: '用户名',
                uid: '123456789'
            } as userInfoType
        }
    },
    mutations: {
        setUserInfo(state: { user: userInfoType; }) {
            // 获取userInfo并修改
        }
    }
})

export default store;