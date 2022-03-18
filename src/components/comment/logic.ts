import { useStore } from 'vuex';

export const getUserId = () => {
    const store = useStore();
    return store.state?.user?.userId;
}