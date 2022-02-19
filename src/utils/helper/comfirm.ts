import { ElMessage, ElMessageBox } from 'element-plus'
import { vLoading } from 'element-plus/es/components/loading/src/directive'

export const showSuccess = () => {
    ElMessage({
        type: 'success',
        message: '操作成功',
        duration: 2000,
    })
}

export const showFail = () => {
    ElMessage({
        type: 'error',
        message: '操作失败, 请重试',
        duration: 2000,
    })
}

export const showSuccessWrap = ({ text, closeCb }: {
    text?: string,
    closeCb?: any
}) => {
    ElMessage({
        type: 'success',
        message: text ?? '操作成功',
        duration: 2000,
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
        duration: 2000,
        onClose: closeCb
    })
}


interface comfirmParams {
    type: 'edit' | 'submit',
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
    cilckCancle,
    failCb,
    successCb,
    onSuccTipClose,
    onFailTipClose,
    fetchApi,
    params
}: comfirmParams) => {
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
            fetchApi(params).then((value: any) => {
                if (value.code === 0) {
                    showSuccessWrap?.({
                        closeCb: onSuccTipClose
                    });
                    successCb?.(value);
                } else {
                    showFailWrap({
                        text: value.message,
                        closeCb: onFailTipClose
                    });
                    failCb?.(value);
                }

            })
        })
        .catch(() => {
            cilckCancle?.()
        })
}