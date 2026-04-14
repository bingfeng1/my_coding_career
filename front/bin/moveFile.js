/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-var-requires */
const child_process = require('child_process')
const { move, emptyDir, copy } = require('fs-extra')
const path = require('path')

// 文件路径
// 打包路径
const source = path.resolve(__dirname, '../dist')
const target = path.resolve(__dirname, '../../docker-data/nginx/html')
const history = path.resolve(__dirname, '../../docker-data/nginx/history')

async function main() {
    console.log('进入node对文件额外处理')
    let result = child_process.execSync(`git rev-parse --abbrev-ref HEAD `)

    console.log('当前分支是：' + result.toString())

    // 如果是master提交的话，那就自动打包
    if (result.toString().includes('master')) {
        console.log('正在打包项目')
        child_process.execSync('npm run build')
        console.log('完成打包，正在准备迁移文件')
        try {
            let err = await move(target, path.resolve(history), {
                overwrite: true
            })
            if (err) {
                console.error(err)
                throw new Error('移动历史文件失败')
            }

            await emptyDir(target)

            err = await copy(source, target)
            if (err) {
                console.error(err)
                throw new Error('移动打包后的文件失败')
            }
            console.log('文件处理完成')
        } catch (e) {
            throw new Error(e)
        }
    }

    console.log('退出node程序')
}

main()
