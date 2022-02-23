import { ref } from 'vue';
import { ElLoading } from 'element-plus';

export const useLoader = (refEl: any) => {
    const isLoading = ref(false);
    const ins = ref();
    const showLoading = () => {
        if (refEl.value) {
            ins.value = ElLoading.service({
                target: refEl.value,
                fullscreen: false,
                background: 'transparent'
            })
        }
    }
    const closeLoading = () => {
        isLoading.value = false;
        ins.value?.close?.();
    }

    return {
        isLoading,
        showLoading,
        closeLoading
    }
}

export const useReloader = (refEl: any) => {
    const isReloading = ref(false);
    const reloadHandler = () => {
        isReloading.value = true;
        refEl?.value?.reload?.();
    }
    const finishReload = () => {
        isReloading.value = false;
    }

    return {
        isReloading,
        reloadHandler,
        finishReload,
    }
}