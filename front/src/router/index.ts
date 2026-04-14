import layoutVue from 'pages/layout.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: layoutVue,
        children: [
            {
                path: '',
                component: () => import('@/pages/project/ProjectCreate.vue')
            },
            {
                path: 'echarts',
                component: () => import('pages/echarts/Echarts.vue')
            },
            {
                path: 'echarts/add',
                name: 'EchartAdd',
                component: () => import('pages/echarts/EchartAdd.vue'),
                props: true
            },
            {
                path: 'dicts',
                component: () => import('pages/dicts/DictPage.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
