import express from "express"
import Echart from "../../mongodb/echarts/index.js"
import EchartService from "../../services/echartService.js"
import { successRes } from "../../utils/response.js"

const router = express.Router()

const echarts = new EchartService()

router.get('/', async (req, res) => {
    const { types, ...args } = req.query

    let result = await echarts.getEchart({ types, ...args })

    res.send(successRes(result))
})

router.post('/', async (req, res) => {
    let { name, optionStr, base64 } = req.body
    await echarts.addEchart({ name, optionStr, base64 })
    res.send(successRes('添加成功'))
})

router.put('/', async (req, res) => {
    let { id, name, optionStr, base64 } = req.body
    await echarts.updateEchart(id, { name, optionStr, base64 })
    res.send(successRes('修改成功'))
})

router.delete('/', async (req, res) => {
    let { _id } = req.body

    let result = await echarts.deleteEchart(_id)
    res.send(successRes(result))

})

router.get('/types', async (req, res) => {

    let types = await echarts.getTypes()
    res.send(
        successRes(types)
    )
})

export default router