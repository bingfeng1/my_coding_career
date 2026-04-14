export * from './date'

// 设置env文件的后端地址，根据环境自动切换
const port = import.meta.env.VITE_PORT
const backurl = `http://localhost:${port}`

export { port, backurl }
