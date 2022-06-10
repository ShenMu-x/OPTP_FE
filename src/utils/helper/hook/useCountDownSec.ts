import { ref, onBeforeUnmount } from 'vue';
export const useCountDownSec = (start: number) => {
    const current = ref(start);
    let ins: any = null;
    const isCounting = ref(false);

    const destoryDown = () => {
        if (ins) clearInterval(ins)
        current.value = 0;
        isCounting.value = false;
    }
    const startDown = (num?: number) => {
        destoryDown();
        current.value = num || start;
        isCounting.value = true;
        ins = setInterval(() => {
            current.value -= 1;
            current.value <= 0 && destoryDown();
        }, 1000);
    }

    // 结束销毁
    onBeforeUnmount(destoryDown);

    return {
        current,
        startDown,
        isCounting
    }
}