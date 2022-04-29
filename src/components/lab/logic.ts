import { showFailWrap } from '@/utils/helper';
import { getIDEtoCode } from '@/utils/services';

export const getIDEUrl = async (labId: number) => {
    return getIDEtoCode(labId)
        .then(res => {
            if (res.code === 0) {
                return res?.data?.url || "";
            } else {
                showFailWrap({ text: '系统异常，请稍后再试' })
                return "";
            }
        })
}