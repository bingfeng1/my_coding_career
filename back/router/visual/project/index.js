import express from "express"
import multer from "multer"
import { v4 } from "uuid"
import Projects from "../../../mariadb/project/index.js"
import { successRes } from "../../../utils/response.js"

const storage = multer.diskStorage({
    destination: 'uploads/projects',
    filename: function (req, file, cb) {
        let filename = v4()
        let filesplit = file.originalname.split('.')
        let ext = filesplit[filesplit.length - 1]
        cb(null, filename + '.' + ext)
    }
})

const upload = multer({
    storage
})
const router = express.Router()

router.get('/', async (req, res) => {
    let projects = await Projects.findAll()
    let result = successRes(projects)
    res.send(result)
})

router.post('/', upload.single("icon"), async (req, res) => {
    let { name } = req.body
    let { file } = req
    await Projects.create({ name, icon: file.path })
    let result = successRes('添加成功')
    res.send(result)
})

export default router