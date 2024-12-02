
import User_content from "@/components/Web_content/user_content/user_content.vue"


import Web_layout from "@/page/Web_layout.vue"
import { createRouter, createWebHashHistory } from "vue-router"



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
    {
        path: "/manage",
        meta: {
            title: '用户管理',
            noAuth: true,
        },
        component: () =>
            import('../page/Web_manage.vue'),
        children: [

            {
                path: '/manage/system-user',
                name: 'system-user',
                // meta: {
                //     title: '用户管理',
                //     permiss: '11',
                // },
                meta: {
                    title: '系统首页',
                    noAuth: true,
                },
                component: () => import('../components/Web_content/my_table.vue'),
            },
            {
                path: '/manage/system-role',
                name: 'system-role',
                // meta: {
                //     title: '角色管理',
                //     permiss: '12',
                // },
                meta: {
                    title: '用户管理',
                    noAuth: true,
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
// router.beforeEach(async(to,from,next)=>{
//     //发送请求，获取数据
//     const res = await 
// })

export default router