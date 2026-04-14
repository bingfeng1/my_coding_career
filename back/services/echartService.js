import Echart from "../mongodb/echarts/index.js"
import * as echarts from "echarts"

class EchartService {
    async getEchart({ types, ...args }) {
        const filterList = {}

        if (types) {
            filterList['option.series.type'] = { $in: types }
        }
        let echartsData = await Echart.find({
            ...filterList,
            ...args
        })
        return echartsData
    }

    async addEchart({ name, optionStr, base64 }) {
        let option
        eval(optionStr)
        let echart = new Echart({
            name,
            option,
            optionStr,
            base64
        })
        await echart.save()

        return echart
    }

    async updateEchart(_id, { name, optionStr, base64 }) {
        let option
        eval(optionStr)
        return await Echart.updateOne({ _id }, {
            name,
            option,
            optionStr,
            base64
        })
    }

    async deleteEchart(_id) {
        await Echart.deleteOne({ _id })
    }

    async getTypes() {
        let result = await Echart.find({}, 'option.series.type')
        let types = new Set()
        let series = result.map(
            ({ option: { series } }) => {
                return series
            }
        )

        series.forEach(_types => {
            _types.forEach(({ type }) => types.add(type))
        })

        return [...types]
    }
}

export default EchartService