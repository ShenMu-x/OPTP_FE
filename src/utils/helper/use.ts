import { useRoute } from 'vue-router';
import { ref } from 'vue';

export const useCourseId = () => {
    const route = useRoute();
    return parseInt(route?.params?.courseId?.[0]);
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