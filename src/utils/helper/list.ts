import { ref, reactive, watch, onMounted, toRef } from 'vue';
import { showSuccessWrap, showFailWrap, useLoader } from '@/utils/helper';

interface params {
    size: number,
    fetchData: any,
    failText?: string,
    refEl?: any,
    emitReload?: any,
    common?: any,
}
export const usePageList = ({
    size,
    fetchData,
    failText,
    refEl,
    emitReload,
    common
}: params) => {
    const current = ref(1);
    const total = ref(size);
    const data = reactive<{
        list: Array<any>
    }>({
        list: []
    })
    const list = toRef(data, 'list');
    const isReload = ref(false);
    let commonIn: any = common;

    const {
        isLoading,
        showLoading,
        closeLoading
    } = useLoader(refEl);

    const setCommon = (data: any) => {
        commonIn = data;
    }

    const fetch = (nowPage: number) => {
        console.log('fetch')
        isLoading.value = true;
        showLoading();
        fetchData?.({
            pageSize: size,
            pageCurrent: nowPage,
            ...commonIn
        })
            .then((res: any) => {
                if (res.code === 0) {
                    data.list = res.data.records;
                    total.value = res.data.pageInfo.total;
                } else {
                    console.log(fetchData, res);
                    showFailWrap({ text: failText })
                }
                if (isReload.value) {
                    emitReload?.();
                    res.code === 0 && showSuccessWrap({ text: '已刷新' })
                    isReload.value = false
                }
                closeLoading()
            })
    }

    // 监听页面变化
    watch(current, (newVal, _) => {
        !isReload.value && fetch(newVal);
    })

    const reload = () => {
        console.log('reload');
        isReload.value = true;
        current.value = 1;
        fetch(1); // 首页触发不到watch,需主动触发
    }

    return {
        current,
        isLoading,
        isReload,
        total,
        list,
        reload,
        fetch,
        setCommon
    }
}