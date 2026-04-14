import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { init as mariadbInit } from './mariadb/index.js'

main()

async function main() {
    const app = express()

    app.use('/uploads', express.static('uploads'))
    app.use(express.json({
        limit: "10mb"
    }))

    app.use(morgan("tiny"))

    app.use(cors())

    await mariadbInit()
    const { router } = await import('./router/index.js')

    app.use("/api", router)

    app.listen('3000', () => {
        console.log('服务器启动成功');
    })
}