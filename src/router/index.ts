import { createRouter, createWebHistory } from "vue-router";
import { ParamsEnum } from "@/utils/helper";
import { RoleEnum, RoleList } from "@/utils/option";
import { ROUTE_NAME } from './routeName';
import { createRouterGuards } from './createGuards';

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        accessRole: RoleEnum[]
    }
}
// 存在目录修改，不完全是约定式路由，以配置为准
const routes = [
    {
        path: '/login',
        name: ROUTE_NAME.LOGIN,
        meta: {
            title: '登录页',
            accessRole: RoleList
        },
        component: () => import('../pages/login/Login.vue')
    },
    {
        path: `/ide/:${ParamsEnum.LabId}`,
        name: ROUTE_NAME.IDE,
        meta: {
            title: '在线编程环境',
            accessRole: [RoleEnum.Student, RoleEnum.Teacher]
        },
        component: () => import('../pages/ide/Ide.vue'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/user/user-center',
                name: ROUTE_NAME.STUDENT_CENTER,
                meta: {
                    title: '学生主页',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/user/StudentCenter.vue')
            },
            {
                path: '/user/edit-info',
                name: ROUTE_NAME.EDIT_INFO,
                meta: {
                    title: '个人信息修改',
                    accessRole: [RoleEnum.Student, RoleEnum.Teacher]
                },
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: `/course/course-detail/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.STUDENT_COURSE_DETAIL,
                meta: {
                    title: '课程详情',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/course/CourseDetail.vue')
            },
            {
                path: '/user/user-attend',
                name: ROUTE_NAME.STUDENT_ATTEND,
                meta: {
                    title: '个人签到',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/user/UserAttend.vue')
            },
            {
                path: '/online-oj',
                name: ROUTE_NAME.ONLINE_OJ,
                meta: {
                    title: '语法练习',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/oj/OnlineOJ.vue'),
            },
            {
                path: '/user/teacher-center',
                name: ROUTE_NAME.TEACHER_CENTER,
                meta: {
                    title: '教师主页',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/user/TeacherCenter.vue')
            },
            {
                path: `/teach/course-detail/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.TEACHER_COURSE_DETAIL,
                meta: {
                    title: '课程详情',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/teach/CourseDetail.vue')
            },
            {
                path: `/teach/course-coding/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.TEACHER_COURSE_CODE_LIST,
                meta: {
                    title: '编程活跃度',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/teach/CourseCodingTime.vue')
            },
            {
                path: `/teach/lab-detail/:${ParamsEnum.LabId}`,
                name: ROUTE_NAME.TEACHER_LAB_DETAIL,
                meta: {
                    title: '实验详情',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/teach/LabDetail.vue')
            },
            {
                path: '/manage/platform',
                name: ROUTE_NAME.MANAGE_PLATFORM,
                meta: {
                    title: '系统管理',
                    accessRole: [RoleEnum.Manager]
                },
                component: () => import('../pages/manage/ManageHome.vue'),
            },
            {
                path: '/not-found',
                name: ROUTE_NAME.NOT_FOUND,
                meta: {
                    title: '无法访问',
                    accessRole: RoleList
                },
                component: () => import('../pages/404.vue')
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createRouterGuards(router);
export default router;