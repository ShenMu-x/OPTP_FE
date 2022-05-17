import { ref, onMounted, onUnmounted } from 'vue';

export const useListenPageWidth = (showPanelMinWidth: number) => {
    let clientWidth = document.body.clientWidth;
    const isShowPanel = ref(clientWidth >= showPanelMinWidth);
    const onResizeHandler = () => {
        clientWidth = document.body.clientWidth;
        isShowPanel.value = clientWidth >= showPanelMinWidth
    }
    onMounted(() => {
        window.addEventListener('resize', onResizeHandler)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', onResizeHandler)
    })
    return { isShowPanel }
}