import { ref } from 'vue';
import { ElLoading } from 'element-plus';

export const useLoader = (refEl?: any, fullscreen?: boolean, defaultStatus?: boolean) => {
    const isLoading = ref(defaultStatus || false);
    const ins = ref();
    const showLoading = () => {
        setIsLoading(true)
        if (refEl?.value) {
            ins.value = ElLoading.service({
                target: refEl.value,
                fullscreen: fullscreen ?? false,
                background: 'transparent'
            })
        }
    }
    const closeLoading = () => {
        isLoading.value = false;
        ins?.value?.close?.();
    }
    const setIsLoading = (value: boolean) => {
        isLoading.value = value;
    }

    return {
        isLoading,
        showLoading,
        closeLoading,
        setIsLoading
    }
}