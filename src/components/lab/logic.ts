import { showFailWrap } from '@/utils/helper';
import { fetchIdeUrl } from '@/utils/services';

export const getIDEUrl = async (labId: number) => {
    return fetchIdeUrl(labId)
        .then(res => {
            if (res.code === 0) {
                return res?.data?.url || "";
            } else {
                showFailWrap({ text: '系统异常，请稍后再试' })
                return "";
            }
        })
}