import { useRouter } from 'vue-router';
import { ROUTE_NAME } from '@/router/routeName';
import { RoleEnum, HomePageMap } from "@/utils/option";
import { isTeacher, isStudent, isManager, ParamsEnum } from "@/utils/helper";
import { ParamsType } from './useParam';

type directType = 'direct' | 'redirect';
type directMethodType = (routeName: ROUTE_NAME, params?: ParamsType) => void;
type routerToPageMethodType = (type: directType, routeName: ROUTE_NAME, params?: ParamsType) => void;
type routerToSpecificPageType = (type: directType, params?: ParamsType) => void;
type routerWithCourseIdType = (type: directType, params: { courseId: number }) => void;
type routerWithLabIdType = (type: directType, params: { labId: number }) => void;
type routerToIDEType = (type: directType, params: { ideUrl: string, isLabFinish?: string }) => void;

export const useDirect = () => {
    const router = useRouter();
    const routerBack = () => router.back()
    const redirectTo: directMethodType = (routeName, params) => router.replace({ name: routeName, params })
    const directTo: directMethodType = (routeName, params) => router.push({ name: routeName, params })
    const routerToPage: routerToPageMethodType = (type, routeName, params) => {
        type === 'direct' && (directTo(routeName, params));
        type === 'redirect' && (redirectTo(routeName, params));
    }
    const redirectNotFound = () => redirectTo(ROUTE_NAME.NOT_FOUND)
    const routerToLogin: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.LOGIN)
    const routerToRegister: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.REGISTER)
    const routerToForgetPassword: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.FORGET_PASSWORD)
    const routerToOnlineOJ: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.ONLINE_OJ)
    const routerToEditInfo: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.EDIT_INFO)
    const routerToStudentAttend: routerToSpecificPageType = type => routerToPage(type, ROUTE_NAME.STUDENT_ATTEND)
    const routerToHome: routerToSpecificPageType = type => {
        isTeacher() && (routerToPage(type, HomePageMap[RoleEnum.Teacher]))
        isStudent() && (routerToPage(type, HomePageMap[RoleEnum.Student]))
        isManager() && (routerToPage(type, HomePageMap[RoleEnum.Manager]))
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
    const routerToIDE: routerToIDEType = (type, params) => {
        routerToPage(type, ROUTE_NAME.IDE, {
            [ParamsEnum.IdeUrl]: params.ideUrl,
            [ParamsEnum.isLabFinish]: params.isLabFinish ?? ''
        })
    }
    return {
        routerBack,
        redirectNotFound,
        routerToLogin,
        routerToRegister,
        routerToForgetPassword,
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