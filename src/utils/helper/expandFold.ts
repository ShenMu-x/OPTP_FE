import { ref } from 'vue';

export const useFolder = (status = true) => {
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