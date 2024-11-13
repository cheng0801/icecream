
import User_content from "@/components/Web_content/user_content/user_content.vue"
import Web_Header from "@/page/Web_Header.vue"

import Web_layout from "@/page/Web_layout.vue"
import { createRouter, createWebHashHistory } from "vue-router"



//路由规则
const routes = [

    {
        path: '/',
        name: 'home',
        component: Web_layout,
        // children: [
        //     {
        //         path: '/sign',
        //         name: "sign",
        //         // 箭头函数：懒加载 调用的时候加载
        //         component: () => import('../components/Web_log/my_sign_in.vue'),

        //     },
        //     {
        //         path: '/log',
        //         name: "log",


        //         component: () =>
        //             import('../components/Web_log/my_log_in.vue')
        //     },
        //     // 设置一个默认路由（索引路由）
        //     {
        //         path: '', // 空字符串表示默认路由
        //         name: 'homelog',
        //         redirect: '/log', // 重定向到 /log 路由
        //     },

        // ]
    },
    {
        path: '/user/:id',
        name: 'userhome',
        component: User_content,


    },

    {
        path: "/log",
        component: () =>
            import('../page/log_in.vue')

    },
    {
        path: "/sign",
        component: () =>
            import('../page/sign_in.vue')

    },
// NOT_FOUND页面
    {
        path: "/:pathMatch(.*)*",
        component: () =>
            import('../page/NOT_FOUND.vue')

    }
]
// {
//     path: '/',
//     name: 'home',
//     redirect: '/log' ,


// },

// {
//     path: '/sign',
//     name: "sign",

//     component: my_sign_in,

// },
// {
//     path: '/log',
//     name: "log",
//     // redirect: /log,
//     component: My_log_in,

//     // component: () =>
//     //     import('../components/Web_log/my_log_in.vue')
// }




// {




// redirect: '/log' ,

//     // children:
//     // {
//     //     path: 'my_test',
//     //     name: "test",
//     //     component: () =>
//     //         import('@/my_test.vue')
//     // }
// },

// 登录 注册



//路由器
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router