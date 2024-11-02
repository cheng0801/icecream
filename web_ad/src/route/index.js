import { createRouter, createWebHashHistory } from "vue-router"
import Web_content from '../page/Web_content.vue'
import sign_Modal from "@/components/Web_log/sign_Modal.vue"
import My_log_in from "../components/Web_log/my_log_in.vue"
import my_sign_in from "../components/Web_log/my_sign_in.vue"


//路由规则
const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/log' ,


    },

    {
        path: '/sign',
        name: "sign",

        component: my_sign_in,
            
    },
    {
        path: '/log',
        name: "log",
        // redirect: /log,
        component: My_log_in,

        // component: () =>
        //     import('../components/Web_log/my_log_in.vue')
    }
]



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