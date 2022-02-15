// @ts-nocheck
import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "../utils/storage";
import { isTeacher } from "@/utils/helper/is";

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
        path: '/authentication',
        component: () => import('../pages/login/Authentication.vue'),
    },
    {
        path: '/editide',
        component: () => import('../pages/course/EditIDE'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/usercenter',
                component: () => import('../pages/user/StudCenter.vue')
            },
            {
                path: '/editinfo',
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: '/courseDetail/:courseId',
                component: () => import('../pages/course/CourseDetail.vue')
            },
            {
                path: '/teach/usercenter',
                component: () => import('../pages/user/TeacherCenter.vue')
            },
            {
                path: '/teach/courseDetail/:courseId',
                component: () => import('../pages/teach/CourseDetail.vue')
            }
        ]
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    let token = getToken();
    const canNoLoginPath = ['/login', '/authentication', '/register'];

    if (!token && !canNoLoginPath.includes(to.path)) {
        next('./login');
        return;
    }

    // 强制跳转
    if (to.path === '/') {
        if(isTeacher()) {
            next('/teach/usercenter')
        } else {
            next('usercenter')
        }
        return
    }

    next()
    return
})

export default router;