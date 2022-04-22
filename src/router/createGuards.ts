import { ROUTE_NAME } from '@/router/routeName';
import { Router } from 'vue-router';
import { getLocalStorage, LocalVal } from "../utils/storage";
import { RoleEnum, HomePageMap } from "@/utils/option";
import { isTeacher, isStudent, isManager, isAllowedRole } from "@/utils/helper";

export const createRouterGuards = (router: Router) => {
    router.beforeEach((to, from, next) => {
        // 登录校验
        let token = getLocalStorage(LocalVal.AccessToken);
        const pathsAllowNoLogin: ROUTE_NAME[] = [ROUTE_NAME.LOGIN, ROUTE_NAME.FORGET_PASSWORD, ROUTE_NAME.REGISTER];
        if (!token) {
            if (!pathsAllowNoLogin.filter(routeName => routeName == to.name).length) next({ name: ROUTE_NAME.LOGIN });
            else next();
            return;
        }
        // 主页引导
        if (to.path === '/') {
            isTeacher() && (next({ name: HomePageMap[RoleEnum.Teacher] }))
            isStudent() && (next({ name: HomePageMap[RoleEnum.Student] }))
            isManager() && (next({ name: HomePageMap[RoleEnum.Manager] }))
            return
        }
        // 职能检查
        if (to.meta?.accessRole && !isAllowedRole(to.meta.accessRole)) {
            next({ name: ROUTE_NAME.NOT_FOUND });
            return;
        }
        next()
    })
}