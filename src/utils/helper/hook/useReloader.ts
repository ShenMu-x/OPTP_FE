import { ref } from 'vue';
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