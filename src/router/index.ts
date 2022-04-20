// @ts-nocheck
import { createRouter, createWebHistory } from "vue-router";
import { getLocalStorage, LocalVal } from "../utils/storage";
import { isTeacher, isStudent, isManager, isAllowedRole, ParamsEnum } from "@/utils/helper";
import { TeacherRole, ManagerRole, StudentRole } from "@/utils/option";

const routes = [
    {
        path: '/login',
        component: () => import('../pages/login/Login.vue')
    },
    {
        path: '/register',
        component: () => import('../pages/login/Register.vue'),
    },
    {
        path: '/auth',
        component: () => import('../pages/login/Authentication.vue'),
    },
    {
        path: '/ide',
        name: 'ide',
        component: () => import('../pages/ide/Ide.vue'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/user_center',
                meta: {
                    allowRole: [StudentRole]
                },
                component: () => import('../pages/user/StudCenter.vue')
            },
            {
                path: '/edit_info',
                meta: {
                    allowRole: [StudentRole, TeacherRole]
                },
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: `/course_detail/:${ParamsEnum.CourseId}`,
                meta: {
                    allowRole: [StudentRole]
                },
                component: () => import('../pages/course/CourseDetail.vue')
            },
            {
                path: '/user_attend',
                meta: {
                    allowRole: [StudentRole]
                },
                component: () => import('../pages/user/UserAttend.vue')
            },
            {
                path: '/online_oj',
                meta: {
                    allowRole: [StudentRole]
                },
                component: () => import('../pages/oj/OnlineOJ.vue'),
            },
            {
                path: '/teach/user_center',
                meta: {
                    allowRole: [TeacherRole]
                },
                component: () => import('../pages/user/TeacherCenter.vue')
            },
            {
                path: `/teach/course_detail/:${ParamsEnum.CourseId}`,
                meta: {
                    allowRole: [TeacherRole]
                },
                component: () => import('../pages/teach/CourseDetail.vue')
            },
            {
                path: `/teach/course_coding/:${ParamsEnum.CourseId}`,
                meta: {
                    allowRole: [TeacherRole]
                },
                component: () => import('../pages/teach/CourseCodingTime.vue')
            },
            {
                path: `/teach/lab_detail/:${ParamsEnum.LabId}`,
                meta: {
                    allowRole: [TeacherRole]
                },
                component: () => import('../pages/teach/LabDetail.vue')
            },
            {
                path: '/manage/platform',
                meta: {
                    allowRole: [ManagerRole]
                },
                component: () => import('../pages/manage/ManageHome.vue'),
            },
            {
                path: '/404',
                name: 'not_found',
                component: () => import('../pages/404.vue')
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/404'
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // 权限校验
    let token = getLocalStorage(LocalVal.AccessToken) ?? '';
    const pathsAllowNoLogin = ['/login', '/auth', '/register'];
    if (!token && !pathsAllowNoLogin.includes(to.path)) {
        next('/login');
        return;
    }

    console.log(to);

    // 职能区分
    if (to.path === '/') {
        isTeacher() && (next('/teach/user_center'))
        isStudent() && (next('/user_center'))
        isManager() && (next('/manage/platform'))
        return
    }

    // 路由权限控制
    if (to.meta?.allowRole && !isAllowedRole(to.meta.allowRole)) {
        next('/404');
        return;
    }
    next()
})

export default router;