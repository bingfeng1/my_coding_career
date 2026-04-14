// @ts-nocheck
import { execSync } from 'child_process'
import { copy } from 'fs-extra'
import { readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const source = path.resolve(__dirname, '../')
const target = path.resolve(__dirname, '../../docker-data/back/project')
const history = path.resolve(__dirname, '../../docker-data/back/history')

const ignoreCopy = ['node_modules', '.git', '.husky', 'bin', 'static', 'uploads']

async function main() {
    try {
        await copyDir(target, history)
        await copyDir(source, target)
    } catch (e) {
        throw new Error(e)
    }
}

async function copyDir(source, target) {
    let files = await readdir(source)
    let promiseList = []
    for (let file of files) {
        if (!ignoreCopy.includes(file)) {
            let targetTemp = path.resolve(target, file)
            let sourceTemp = path.resolve(source, file)
            promiseList.push(copy(sourceTemp, targetTemp))
        }
    }

    await Promise.all(promiseList)

    console.log(source + "-->" + target + '。文件处理完成')
}

main()