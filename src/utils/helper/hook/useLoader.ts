import { ref } from 'vue';
import { ElLoading } from 'element-plus';

export const useLoader = (refEl: any, fullscreen?: boolean) => {
    const isLoading = ref(false);
    const ins = ref();
    const showLoading = () => {
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
        ins.value?.close?.();
    }

    return {
        isLoading,
        showLoading,
        closeLoading
    }
}