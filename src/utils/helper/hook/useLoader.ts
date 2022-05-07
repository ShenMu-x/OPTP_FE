import { ref, watch } from 'vue';
import { ElLoading } from 'element-plus';

export const useLoader = (refEl: any, fullscreen?: boolean, defaultStatus?: boolean) => {
    const isLoading = ref(defaultStatus || false);
    const ins = ref();
    const showLoading = () => {
        isLoading.value = true;
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