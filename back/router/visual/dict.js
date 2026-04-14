import express from "express"
import Dict from "../../mongodb/visual/dictionary.js"
import DictService from "../../services/dictService.js"
import { successRes } from "../../utils/response.js"

const router = express.Router()

let dict = new DictService()

router.get('/', async (req, res) => {
    let result = await dict.getDictList({
        
    })
    res.send(successRes(result))
})

router.post('/', async (req, res) => {
    const { _id, key, value, isdel, desc } = req.body
    let result
    if (!_id) {
        result = await dict.addDict({
            key, value, desc
        })
    } else {
        result = await dict.updateDict({ _id, key, value, isdel, desc })
    }
    res.send(successRes(result))
})

router.delete('/', async (req, res) => {
    const { _id } = req.query
    let result = await dict.deleteDict({
        _id,
    })
    res.send(successRes(result))
})

router.post('/child', async (req, res) => {
    let result = await dict.addDictItem(req.body)
    res.send(successRes(result))
})

router.put('/child', async (req, res) => {
    let result = await dict.updateDictItem(req.body)
    res.send(successRes(result))
})

router.delete('/child', async (req, res) => {
    const { _id } = req.query
    let result = await dict.deleteDictItem({
        _id
    })
    res.send(successRes(result))
})

export default router