import { showFailWrap, showSuccessWrap, useCountDownSec, useLoader } from '@/utils/helper';
import { fetchVerificationCode } from '@/utils/services';

export const useCountDownWrap = () => {
    const { current, startDown, isCounting } = useCountDownSec(60);
    const { isLoading, setIsLoading } = useLoader();

    const fetchCode = (number: string) => {
        setIsLoading(true);
        fetchVerificationCode({ number }).then(res => {
            setIsLoading(false);
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
        isLoading
    }
}