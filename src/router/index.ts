// @ts-nocheck
import { createRouter, createWebHistory  } from "vue-router";

const router = new createRouter({
    history: createWebHistory (),
    routes: [
        {
            path: '/',
            component: () => import("../layout/index.vue"),
            children: [
                {
                    path: '/home',
                    component: () => import('../pages/Home.vue')
                },
                {
                    path: '/',
                    component: () => import('../pages/404.vue')
                },
            ]
        },
        {
            path: '/login',
            component: () => import('../pages/Login.vue')
        },
        {
            path: '/home',
            component: () => import('../pages/Home.vue')
        },
        {
            path: '/user',
            component: () => import('../pages/User.vue')
        },
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to, from, 111);
    next();
});

export default router;