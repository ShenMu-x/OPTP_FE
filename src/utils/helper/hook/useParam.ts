import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';

type getParamMethod<T> = (route: RouteLocationNormalizedLoaded, key: ParamsEnum) => T;
export enum ParamsEnum {
    CourseId = 'courseid',
    LabId = 'labid',
    IdeUrl = 'ideurl',
    isLabFinish = 'islabfinish'
}
export type ParamsType = {
    [ParamsEnum.CourseId]?: number,
    [ParamsEnum.LabId]?: number,
    [ParamsEnum.IdeUrl]?: string,
    [ParamsEnum.isLabFinish]?: string,
}
const getParam: getParamMethod<string> = (route, key) => {
    let value = route?.params?.[key] || '';
    value = value instanceof Array ? value[0] : value;
    return value;
}
export const useParams = (key: ParamsEnum) => {
    const route = useRoute();
    return getParam(route, key);
}