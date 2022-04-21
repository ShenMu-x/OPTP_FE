import { useRouter } from 'vue-router';
import { ROUTE_NAME } from '@/router/routeName';
import { RoleEnum, HomePageMap } from "@/utils/option";
import { isTeacher, isStudent, isManager } from "@/utils/helper";
import { ParamsType } from './useParam';
export const useDirect = () => {
    const router = useRouter();
    const redirect = (url: string) => {
        router.replace(url);
    };
    const directTo = (url: string) => {
        router.push(url);
    };
    const directToWithParams = (name: string, params: ParamsType) => {
        router.push({
            name,
            params
        })
    }
    const routerBack = () => {
        router.back();
    }
    const redirectToHome = () => {
        isTeacher() && (router.push({ name: HomePageMap[RoleEnum.Teacher] }))
        isStudent() && (router.push({ name: HomePageMap[RoleEnum.Student] }))
        isManager() && (router.push({ name: HomePageMap[RoleEnum.Manager] }))
    }
    return {
        redirect,
        directTo,
        directToWithParams,
        routerBack,
        redirectToHome
    }
}