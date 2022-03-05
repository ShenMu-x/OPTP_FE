import { ElMessage, ElMessageBox } from 'element-plus'

export const showSuccess = () => {
    ElMessage({
        type: 'success',
        message: '操作成功',
        duration: 1000,
    })
}

export const showFail = () => {
    ElMessage({
        type: 'error',
        message: '操作失败, 请重试',
        duration: 1000,
    })
}

export const showSuccessWrap = ({ text, closeCb, duration }: {
    text?: string,
    closeCb?: any,
    duration?: number
}) => {
    ElMessage({
        type: 'success',
        message: text ?? '操作成功',
        duration: duration || 1000,
        onClose: closeCb
    })
}

export const showFailWrap = ({ text, closeCb }: {
    text?: string,
    closeCb?: any
}) => {
    ElMessage({
        type: 'error',
        message: text ?? '操作失败, 请重试',
        duration: 1000,
        onClose: closeCb
    })
}


interface comfirmParams {
    type: 'edit' | 'submit',
    refEl: any,
    cilckCancle?: any
    fetchApi?: any,
    params?: any,
    successCb?: any,
    onSuccTipClose?: any,
    onFailTipClose?: any,
    failCb?: any
}

export const comfirm = ({
    type,
    refEl,
    cilckCancle,
    failCb,
    successCb,
    onSuccTipClose,
    onFailTipClose,
    fetchApi,
    params
}: comfirmParams) => {
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            ElMessageBox.confirm(
                type === 'edit' ? '确认修改?' : '确定提交?',
                type === 'edit' ? '修改提交确认' : '提交确认',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success',
                    lockScroll: false,
                }
            )
                .then(() => {
                    fetchApi(params).then((res: any) => {
                        if (res.code === 0) {
                            showSuccessWrap?.({
                                text: '操作成功',
                                closeCb: onSuccTipClose
                            });
                            successCb?.(res);
                        } else {
                            showFailWrap({
                                text: res.errorMsg,
                                closeCb: onFailTipClose
                            });
                            failCb?.(res);
                        }
                    })
                })
                .catch(() => {
                    cilckCancle?.()
                })
        }
    })
}