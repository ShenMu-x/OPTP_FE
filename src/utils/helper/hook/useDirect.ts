import { useRouter } from 'vue-router';
import { ROUTE_NAME } from '@/router/routeName';
import { RoleEnum, HomePageMap } from "@/utils/option";
import { isTeacher, isStudent, isManager, ParamsEnum, isRoleDefined } from "@/utils/helper";
import { ParamsType } from './useParam';
import { queryType } from './useQuery';

type directType = 'direct' | 'redirect';
type directMethodType = (routeName: ROUTE_NAME, params?: ParamsType, query?: queryType) => void;
type routerToPageMethodType = (type: directType, routeName: ROUTE_NAME, params?: ParamsType, query?: queryType) => void;
type routerToSpecificPageType = (type: directType, params?: ParamsType, query?: queryType) => void;
type routerWithCourseIdType = (type: directType, params: { courseId: number }) => void;
type routerWithLabIdType = (type: directType, params: { labId: number }) => void;
type routerToIDEType = (type: directType, params: { ideUrl: string, isLabFinish?: string }) => void;

export const useDirect = () => {
    const router = useRouter();
    const routerBack = () => router.back()
    const redirectTo: directMethodType = (routeName, params, query) => router.replace({ name: routeName, params, query })
    const directTo: directMethodType = (routeName, params, query) => router.push({ name: routeName, params, query })
    const routerToPage: routerToPageMethodType = (type, routeName, params, query) => {
        type === 'direct' && (directTo(routeName, params, query));
        type === 'redirect' && (redirectTo(routeName, params, query));
    }
    const redirectNotFound = () => redirectTo(ROUTE_NAME.NOT_FOUND)
    const routerToLogin: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.LOGIN)
    const routerToOnlineOJ: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.ONLINE_OJ)
    const routerToEditInfo: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.EDIT_INFO)
    const routerToStudentAttend: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.STUDENT_ATTEND)
    const routerToHome: routerToSpecificPageType = type => {
        if (!isRoleDefined()) router.push('/')
        else {
            isTeacher() && (routerToPage(type, HomePageMap[RoleEnum.Teacher]))
            isStudent() && (routerToPage(type, HomePageMap[RoleEnum.Student]))
            isManager() && (routerToPage(type, HomePageMap[RoleEnum.Manager]))
        }
    }
    const routerToCourseDetail: routerWithCourseIdType = (type, params) => {
        isTeacher() && (routerToPage(type, ROUTE_NAME.TEACHER_COURSE_DETAIL, {
            [ParamsEnum.CourseId]: params.courseId
        }))
        isStudent() && (routerToPage(type, ROUTE_NAME.STUDENT_COURSE_DETAIL, {
            [ParamsEnum.CourseId]: params.courseId
        }))
    }
    const routerToLabDetail: routerWithLabIdType = (type, params) => {
        routerToPage(type, ROUTE_NAME.TEACHER_LAB_DETAIL, {
            [ParamsEnum.LabId]: params.labId
        })
    }
    const routerToCourseCodingList: routerWithCourseIdType = (type, params) => {
        routerToPage(type, ROUTE_NAME.TEACHER_COURSE_CODE_LIST, {
            [ParamsEnum.CourseId]: params.courseId
        })
    }
    const routerToIDE: (config: { type: directType, params: { labId: number }, query?: { student: number } }) => void = ({ type, params, query }) => {
        routerToPage(type, ROUTE_NAME.IDE, { [ParamsEnum.LabId]: params.labId }, query ? { student: query?.student } : {})
    }
    return {
        routerBack,
        redirectNotFound,
        routerToLogin,
        routerToHome,
        routerToCourseDetail,
        routerToLabDetail,
        routerToCourseCodingList,
        routerToIDE,
        routerToOnlineOJ,
        routerToEditInfo,
        routerToStudentAttend
    }
}