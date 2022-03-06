import { useStore } from 'vuex';

export const getUserId = (userId?: number) => {
    const store = useStore();
    return store.state?.user?.userId;
}