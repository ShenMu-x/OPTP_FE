import { useRoute } from 'vue-router';
import { ref, onBeforeUnmount } from 'vue';

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
// 秒倒计时，0为结束
// 可拓展： step / end
export const useCountDownSec = (start: number) => {
    const current = ref(start);
    let ins: any = null;
    const destoryDown = () => {
        if (ins) clearInterval(ins)
        current.value = 0;
    }
    const startDown = (num?: number) => {
        console.log('startDown', current.value)
        destoryDown();
        current.value = num || start;
        ins = setInterval(() => {
            console.log('downIt', current.value)
            current.value > 0 ? (current.value -= 1) : destoryDown()
        }, 1000);
    }

    // 结束销毁
    onBeforeUnmount(destoryDown);

    return {
        current,
        startDown
    }
}