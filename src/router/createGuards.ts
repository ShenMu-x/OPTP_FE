import { getUserInfoByToken } from '@/utils/services';
import { ROUTE_NAME } from '@/router/routeName';
import { Router } from 'vue-router';
import { getAccessToken } from "@/utils/storage";
import { RoleEnum, HomePageMap } from "@/utils/option";
import { isTeacher, isStudent, isManager, isAllowedRole, isRoleDefined } from "@/utils/helper";

const pathsAllowNoLogin: ROUTE_NAME[] = [ROUTE_NAME.LOGIN];
export const createRouterGuards = (router: Router) => {
    router.beforeEach(async (to, from, next) => {
        const isToPathInPathArray = (paths: any[]) => paths.filter(routeName => routeName == to.name).length > 0;
        // 登录校验
        let token = getAccessToken();
        if (!token) {
            if (!isToPathInPathArray(pathsAllowNoLogin)) next({ name: ROUTE_NAME.LOGIN });
            else next();
            return;
        }
        // 职能请求
        if (!isRoleDefined()) {
            await getUserInfoByToken();
        }
        // 主页引导
        if (to.path === '/') {
            isTeacher() && (next({ name: HomePageMap[RoleEnum.Teacher] }))
            isStudent() && (next({ name: HomePageMap[RoleEnum.Student] }))
            isManager() && (next({ name: HomePageMap[RoleEnum.Manager] }))
            return
        }
        // 职能检查
        if (isRoleDefined() && to.meta?.accessRole && !isAllowedRole(to.meta.accessRole)) {
            next({ name: ROUTE_NAME.NOT_FOUND });
            return;
        }
        next()
    })
}