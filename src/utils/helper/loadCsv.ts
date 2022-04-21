import { showFailWrap } from './showMessage';
export const loadCsv = async (refEl: any, fileName: string, fetchData: any, common?: any) => {
    const res = await fetchData(common);
    if (res.code === 0) {
        const blob = res.data?.csvData;
        const reader = new FileReader();
        reader.readAsDataURL(blob); // 转换为base64，可直接放入a标签href属性
        reader.onload = e => {
            let a = document.createElement("a");
            a.style.display = "none";
            a.download = `${fileName}.csv`;
            a.href = e.target?.result as string;
            refEl.value?.appendChild?.(a);
            a.click();
            refEl.value?.removeChild(a);
        };
    } else {
        showFailWrap({ text: '服务出现问题，请稍后再试' });
    }
}