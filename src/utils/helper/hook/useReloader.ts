import { ref } from 'vue';
export const useReloader = (refEl: any) => {
    const isReloading = ref(false);
    const reloadHandler = () => {
        isReloading.value = true;
        if(refEl?.value?.reload) refEl.value.reload?.();
        else isReloading.value = false;
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