import { ref } from 'vue';

export const useFolder = (status = false) => {
    const isFold = ref(status);
    const expand = () => isFold.value = true;
    const fold = () => isFold.value = false;
    const click = () => isFold.value = !isFold.value;
    return {
        isFold,
        expand,
        fold,
        click
    }
}