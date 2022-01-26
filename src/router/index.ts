// @ts-nocheck
import { createRouter, createWebHistory  } from "vue-router";
import { getToken } from "../utils/storage";
const router = new createRouter({
    history: createWebHistory (),
    routes: [
        {
            path: '/login',
            component: () => import('../pages/login/Login.vue')
        },
        {
            path:'/register',
            component: () => import( '../pages/login/Register.vue'),
        },
        {
            path:'/authentication',
            component: () => import( '../pages/login/Authentication.vue'),
        },
        {
            path: '/',
            component: () => import("../layout/index.vue"),
            children: [
                {
                    path: '/userCenter',
                    component: () => import('../pages/user/userCenter.vue')
                },
                {
                    path: '/',
                    component: () => import('../pages/user/userCenter.vue')
                },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    let token = getToken();
    const canNoLoginPath = ['/login', '/authentication', '/register'];
    
    if(!token && !canNoLoginPath.includes(to.path)){
        // next('./login');
        next('./register');
        return;
    }

    // 强制跳转
    if (to.path === '/') {
        next('/user_center')
        return
    }
    next()
    return
})

export default router;