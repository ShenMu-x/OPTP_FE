import { useRouter } from 'vue-router';
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
    return {
        redirect,
        directTo,
        directToWithParams,
        routerBack,
    }
}