import express from "express"
import projectRouter from "./visual/project/index.js"
import echartRouter from "./echart/index.js"
import dictRouter from "./visual/dict.js"

const router = express.Router()

router.use('/project', projectRouter)
router.use('/echart', echartRouter)
router.use('/dict', dictRouter)

export {
    router
}