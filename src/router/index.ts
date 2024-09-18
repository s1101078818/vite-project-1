import { createMemoryHistory, createRouter } from 'vue-router'
import Layout from "../layout/index.vue"
import { registerGuard } from "./Guard";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import("../views/login/index.vue"),
    },
    {
        path: '/',
        component: Layout,
        children: [{
            path: "/home",
            name: "Home",
            meta: {
                title: '主页',
                icon: 'House',
                requireAuth: true,
            },
            /** 在src/views 文件下创建home文件 */
            component: () => import("../views/home/index.vue"),
        }]
    },
    {
        path: '/failed',
        name: 'Failed',
        component: () => import("../components/Failed.vue"),
      }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

registerGuard(router);

export default router;