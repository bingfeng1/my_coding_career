import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// 将$http设置在ts的提示中，vue3官网
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $http: typeof axios
        $validate: (data: object, rule: object) => boolean
    }
}

// 设置env文件的后端地址，根据环境自动切换
const port = import.meta.env.VITE_PORT

const config = {
    // baseURL: process.env.baseURL
    baseURL: `/api`,
    port
}

const api = axios.create(config)
// 默认post为json
api.defaults.headers.post['Content-Type'] = 'application/json'
// 需要添加拦截
api.interceptors.response.use((response: AxiosResponse) => {
    try {
        const {
            data: { code, message }
        } = response
        if (code === 200) {
            return response.data
        } else {
            ElMessage.error({
                message: message
            })
        }
    } catch (e: any) {
        ElMessage.error({
            message: e.message
        })
    }
})

export default api
