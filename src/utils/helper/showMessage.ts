import { ElMessage } from 'element-plus'

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

export const showFailWrap = ({ text, closeCb, duration }: {
    text?: string,
    closeCb?: any,
    duration?: number
}) => {
    ElMessage({
        type: 'error',
        message: text ?? '操作失败, 请重试',
        duration: duration ?? 1000,
        onClose: closeCb
    })
}
