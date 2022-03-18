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
        path: '/auth',
        component: () => import('../pages/login/Authentication.vue'),
    },
    {
        path: '/',
        component: () => import("../layout/index.vue"),
        children: [
            {
                path: '/user_center',
                component: () => import('../pages/user/StudCenter.vue')
            },
            {
                path: '/edit_info',
                component: () => import('../pages/user/EditInfo.vue')
            },
            {
                path: '/course_detail/:courseId',
                component: () => import('../pages/course/CourseDetail.vue')
            },
            {
                path: '/teach/user_center',
                component: () => import('../pages/user/TeacherCenter.vue')
            },
            {
                path: '/teach/course_detail/:courseId',
                component: () => import('../pages/teach/CourseDetail.vue')
            },
            {
                path: '/teach/course_coding/:courseId',
                component: () => import('../pages/teach/CourseCodingTime.vue')
            },
            {
                path: '/teach/lab_detail/:labId',
                component: () => import('../pages/teach/LabDetail.vue')
            },
            {
                path: '/user_attend',
                component: () => import('../pages/user/UserAttend.vue')
            },
            {
                path: '/ide',
                component: () => import('../pages/ide/Ide.vue'),
            },
            {
                path: '/online_oj',
                component: () => import('../pages/oj/OnlineOJ.vue'),
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
    let token = getToken();
    const canNoLoginPath = ['/login', '/auth', '/register'];
    if (!token && !canNoLoginPath.includes(to.path)) {
        next('./login');
        return;
    }

    // 职能区分
    if (to.path === '/') {
        isTeacher() ?
            next('/teach/user_center') :
            next('/user_center')
        return
    }
    // 部分路由参数校验
    let checkCourse = /course_detail/i;
    if (checkCourse.test(to.path)) {
        const courseId = parseInt(to.params.courseId);
        if (isNaN(courseId)) {
            next('/404')
            return
        }
    }

    let checkLab = /lab_detail/i;
    if (checkLab.test(to.path)) {
        const labId = parseInt(to.params.labId);
        if (isNaN(labId)) {
            next('/404')
            return
        }
    }
    next()
    return
})

export default router;