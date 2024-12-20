
import User_content from "@/components/Web_content/user_content/user_content.vue"

import main from '@/components/Web_content/user_content/el_main.vue'
import Web_layout from "@/page/Web_layout.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import { useInfoStore } from "@/stores/userInfo"


//路由规则
const routes = [

    {
        path: '/',
        name: 'home',
        component: Web_layout,

    },
    {
        path: '/user/:id',
        name: 'userhome',
        component: User_content,
        children: [
            {
                path: '/user/:id',
                name: 'main',
               
                component: main,
            },
            {
                path: '/user/:id/post',
                name: 'post_msg',
               
                component: import('@/components/Web_content/user_content/post_msg.vue'),
            },
        ]


    },

    {
        path: "/log",
        name: "log",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/log_in.vue')

    },
    {
        path: "/sign",
        name: "sign",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/sign_in.vue')

    },
    {
        path: "/rest_psd",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/rest_psd.vue')

    },
    {
        path: "/user_center",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/user_center.vue')

    },
    {
        path: "/test",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/test_page.vue')

    },
    // NOT_FOUND页面
    {
        path: "/:pathMatch(.*)*",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/NOT_FOUND.vue')

    },
    // 无权限页面
    {
        path: "/403",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/403.vue')

    },
    {
        path: "/manage",
        meta: {
            title: '用户管理',
            requiresAdmin: true, // 修改为requiresAdmin并设置为true
        },
        component: () => import('../page/Web_manage.vue'),
        children: [
            {
                path: '/manage/system-user',
                name: 'system-user',
                meta: {
                    title: '系统首页',
                    requiresAdmin: true, // 同样设置为需要管理员权限
                },
                component: () => import('../components/Web_content/my_table.vue'),
            },
            {
                path: '/manage/system-role',
                name: 'system-role',
                meta: {
                    title: '用户管理', // 注意：这里可能需要根据实际需求调整标题，以避免与父路由重复
                    requiresAdmin: true, // 同样设置为需要管理员权限
                },
                component: () => import('../components/manage/m_user.vue'),
            },
        ]
    },
]
//路由器
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由拦截
router.beforeEach((to, form, next) => {
    const manage = useInfoStore().userInfo.role;
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        // 如果用户不是管理员，则重定向到403页面（或其他无权访问的页面）
        if (manage !== "管理员") {
            console.log('用户不是管理员，重定向到403页面');
            next("/403"); // 处理权限不足的403页面
        } else {
            console.log('用户是管理员，允许访问');
            next();
        }
    } else {
        // 如果不需要管理员权限，则正常导航
        next();
    }
})

export default router