import { clearTokenAndRole } from '../storage';
import { showSuccessWrap } from './showMessage';
import { ROUTE_NAME } from '../../router/routeName';
import router from '../../router/index';

export const logout = () => {
    const loginURL = location.origin + router.getRoutes().filter(route => route.name === ROUTE_NAME.LOGIN)[0].path;
    clearTokenAndRole();
    showSuccessWrap({
        text: '已退出登录,跳转登录页...',
        closeCb: () => location.href = loginURL
    })
}