import { ElMessageBox, messageTypes } from 'element-plus'
import { showSuccessWrap, showFailWrap } from './showMessage';
interface comfirmParams {
    type: 'edit' | 'submit',
    refEl: any,
    cilckCancle?: any
    fetchApi?: any,
    params?: any,
    successCb?: any,
    onSuccTipClose?: any,
    onFailTipClose?: any,
    failCb?: any,
    finallyCb?: any
}

export const comfirm = ({
    type,
    refEl,
    cilckCancle,
    failCb,
    successCb,
    finallyCb,
    onSuccTipClose,
    onFailTipClose,
    fetchApi,
    params
}: comfirmParams) => {
    const [message, title] = type === 'edit' ? ['确认修改?', '修改提交确认'] : ['确定提交?', '提交确认'];
    const config = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: messageTypes[0],
        lockScroll: false,
    }
    const responseHandler = (res: { code: number; errorMsg: string }) => {
        if (res.code === 0) {
            showSuccessWrap?.({ text: '操作成功', closeCb: onSuccTipClose });
            successCb?.(res);
        } else {
            showFailWrap({ text: res.errorMsg, closeCb: onFailTipClose });
            failCb?.(res);
        }
        finallyCb?.();
    }
    refEl.value.validate((isPass: boolean, obj: any) => {
        if (isPass) {
            ElMessageBox.confirm(message, title, config)
                .then(() => {
                    fetchApi(params)
                        .then(responseHandler)
                })
                .catch(() => {
                    cilckCancle?.()
                })
        }
    })
}