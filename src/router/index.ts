// @ts-nocheck
import { resolve } from "path";
import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "../utils/storage";

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
        component: () => import('../pages/lesson/EditIDE'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/usercenter',
                component: () => import('../pages/user/UserCenter.vue')
            },
            {
                path: '/teachercenter',
                component: () => import('../pages/user/TeacCenter.vue')
            },
            {
                path: '/editinfo',
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: '/lessonDetail/:courseId',
                component: () => import('../pages/lesson/LessonDetail.vue')
            },
            {
                path: '/teacher/lessonDetail/:lessonId',
                component: () => import('../pages/teach/LessonManage.vue')
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
        next('/teachercenter')
        return
    }

    next()
    return
})

export default router;