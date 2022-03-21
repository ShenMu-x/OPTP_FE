import { showFailWrap, showSuccessWrap, useCountDownSec } from '@/utils/helper';
import { getCode } from '@/utils/services';

export const useCountDownWrap = () => {
    const { current, startDown, isCounting } = useCountDownSec(60);

    const fetchCode = (email: string) => {
        getCode({ email: email }).then(res => {
            if (res.code === 0) {
                isCounting.value = true;
                showSuccessWrap({ text: '验证码已发送' })
                startDown();
            }
            else showFailWrap({ text: res.errorMsg })
        })
    }
    return {
        current,
        isCounting,
        fetchCode,
    }
}