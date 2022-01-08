import { createRouter, createWebHashHistory } from "vue-router";

const router = new createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
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