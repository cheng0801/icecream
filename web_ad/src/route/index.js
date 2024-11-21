
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
        component: () =>
            import('../page/log_in.vue')

    },
    {
        path: "/sign",
        name: "sign",
        component: () =>
            import('../page/sign_in.vue')

    },
    {
        path: "/rest_psd",
        component: () =>
            import('../page/rest_psd.vue')

    },
    {
        path: "/user_center",
        component: () =>
            import('../page/user_center.vue')

    },
    // NOT_FOUND页面
    {
        path: "/:pathMatch(.*)*",
        component: () =>
            import('../page/NOT_FOUND.vue')

    }
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