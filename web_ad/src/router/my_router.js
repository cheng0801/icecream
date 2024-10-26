import Web_Content from '@/page/Web_Content.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.Base_URL),
    routes: [
        {
            path: "/",
            name: "home",
            comments: Web_Content,
        },
        {
            path: "/",
            name: "home",
        }
    ]
})

