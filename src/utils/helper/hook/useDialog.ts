import { ref } from 'vue';
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