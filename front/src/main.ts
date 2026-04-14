import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 引入自定义样式
import '@/assets/css/common.scss'
import axios from './api/index.js'
import { createPinia } from 'pinia'
import ECharts from 'vue-echarts'
// 全量引入echarts
import * as echarts from 'echarts'
import { init as storeInit } from './store/index.js'

const app = createApp(App)

// 设置全局属性
app.config.globalProperties.$http = axios

// 设置中文
app.use(ElementPlus, {
    locale: zhCn
})
app.use(router)
// 设置状态管理
const pinia = createPinia()
app.use(pinia)
// 初始化全局状态管理
storeInit()

app.component('v-chart', ECharts)

app.mount('#app')