export const loadAttachment = async (refEl: any, url: string, fileNameWithType?: string) => {
    let a = document.createElement("a");
    a.style.display = "none";
    fileNameWithType && (a.download = `${fileNameWithType}`);
    a.href = url;
    refEl.value?.appendChild?.(a);
    a.click();
    refEl.value?.removeChild(a);
}