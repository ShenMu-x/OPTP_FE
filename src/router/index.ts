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
        path: '/register',
        name: ROUTE_NAME.REGISTER,
        meta: {
            title: '注册页',
            accessRole: RoleList
        },
        component: () => import('../pages/login/Register.vue'),
    },
    {
        path: '/auth',
        name: ROUTE_NAME.FORGET_PASSWORD,
        meta: {
            title: '密码修改页',
            accessRole: RoleList
        },
        component: () => import('../pages/login/Authentication.vue'),
    },
    {
        path: '/ide',
        name: ROUTE_NAME.IDE,
        meta: {
            title: '在线编程页',
            accessRole: [RoleEnum.Student, RoleEnum.Teacher]
        },
        component: () => import('../pages/ide/Ide.vue'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/user_center',
                name: ROUTE_NAME.STUDENT_CENTER,
                meta: {
                    title: '学生主页',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/user/StudCenter.vue')
            },
            {
                path: '/edit_info',
                name: ROUTE_NAME.EDIT_INFO,
                meta: {
                    title: '个人信息修改',
                    accessRole: [RoleEnum.Student, RoleEnum.Teacher]
                },
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: `/course_detail/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.STUDENT_COURSE_DETAIL,
                meta: {
                    title: '课程详情',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/course/CourseDetail.vue')
            },
            {
                path: '/user_attend',
                name: ROUTE_NAME.STUDENT_ATTEND,
                meta: {
                    title: '个人签到',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/user/UserAttend.vue')
            },
            {
                path: '/online_oj',
                name: ROUTE_NAME.ONLINE_OJ,
                meta: {
                    title: '语法练习',
                    accessRole: [RoleEnum.Student]
                },
                component: () => import('../pages/oj/OnlineOJ.vue'),
            },
            {
                path: '/teach/user_center',
                name: ROUTE_NAME.TEACHER_CENTER,
                meta: {
                    title: '教师主页',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/user/TeacherCenter.vue')
            },
            {
                path: `/teach/course_detail/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.TEACHER_COURSE_DETAIL,
                meta: {
                    title: '课程详情',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/teach/CourseDetail.vue')
            },
            {
                path: `/teach/course_coding/:${ParamsEnum.CourseId}`,
                name: ROUTE_NAME.TEACHER_COURSE_CODE_LIST,
                meta: {
                    title: '编程活跃度',
                    accessRole: [RoleEnum.Teacher]
                },
                component: () => import('../pages/teach/CourseCodingTime.vue')
            },
            {
                path: `/teach/lab_detail/:${ParamsEnum.LabId}`,
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
                path: '/404',
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
        redirect: '/404'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createRouterGuards(router);
export default router;