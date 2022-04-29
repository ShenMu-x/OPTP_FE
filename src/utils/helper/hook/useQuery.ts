import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
export enum queryEnum {
    student = 'student',
}
export type queryType = {
    [queryEnum.student]?: number,
}
export const useQueryStudent = () => {
    const route = useRoute();
    const student = route.query.student instanceof Array ? route.query.student[0] : route.query.student;
    if (student) {
        const tmp = parseInt(student || '');
        if (!isNaN(tmp)) return tmp;
    }
    return null;
}