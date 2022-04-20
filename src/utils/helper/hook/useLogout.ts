import { clearTokenAndRole } from '../../storage';
import { showSuccessWrap } from '../comfirm';
export const useLogout = () => {
    clearTokenAndRole();
    showSuccessWrap({
        text: '已退出登录,跳转登录页...',
        closeCb: () => {
            location.href = `${location.origin}/login`
        }
    })
}