import { useRoute, useRouter } from 'vue-router';
import { ref, onBeforeUnmount, inject } from 'vue';
import { clearTokenAndRole } from '../storage';
import { showSuccessWrap } from './comfirm';
import { userInfoType } from '@/type';
import { stringify } from 'querystring';

export const useCourseId = () => {
    const route = useRoute();
    return parseInt(route?.params?.courseId?.[0]);
}

export const useLabId = () => {
    const route = useRoute();
    return parseInt(route?.params?.labId?.[0]);
}

export const useUser = () => {
    const user: userInfoType = inject('user', {});
    const editUserInfo: (params: {
        realName?: string,
        major?: string,
        organization?: string,
        gender?: number
    }) => void
        = inject('editUserInfo', (params) => { });
    const editAvatar: (url: string) => void
        = inject('editAvatar', (url) => { });
    return {
        user,
        editAvatar,
        editUserInfo
    };
}

export const useDialog = () => {
    const isDialogOpen = ref(false);
    const openDialog = () => { isDialogOpen.value = true }
    const closeDialog = () => { isDialogOpen.value = false }
    return {
        isDialogOpen,
        openDialog,
        closeDialog
    }
}

export const useCountDownSec = (start: number) => {
    const current = ref(start);
    let ins: any = null;
    const isCounting = ref(false);

    const destoryDown = () => {
        if (ins) clearInterval(ins)
        current.value = 0;
        isCounting.value = false;
    }
    const startDown = (num?: number) => {
        destoryDown();
        current.value = num || start;
        ins = setInterval(() => {
            current.value > 0 ? (current.value -= 1) : destoryDown()
        }, 1000);
    }

    // 结束销毁
    onBeforeUnmount(destoryDown);

    return {
        current,
        startDown,
        isCounting
    }
}

export const useDirect = () => {
    const router = useRouter();
    const redirect = (url: string) => {
        router.replace(url);
    };
    const directTo = (url: string) => {
        router.push(url);
    };
    const directToWithParams = (name: string, params: any) => {
        router.push({
            name,
            params
        })
    }
    const routerBack = () => {
        router.back();
    }
    return {
        redirect,
        directTo,
        directToWithParams,
        routerBack,
    }
}

export const useLogout = () => {
    clearTokenAndRole();
    showSuccessWrap({
        text: '已退出登录,跳转登录页...',
        closeCb: () => {
            location.href = `${location.origin}/login`
        }
    })
}