import api from '..'

const getEcharts = (types: Array<string>) =>
    api.get('/echart', {
        params: {
            types
        }
    })
const createEchart = (data: { name: string; optionStr: string; base64: Blob }) =>
    api.post('/echart', data)
const deleteEchart = (_id: string) =>
    api.delete('/echart', {
        data: {
            _id
        }
    })

const getEchartTypes = () => api.get('/echart/types')

export { getEcharts, createEchart, deleteEchart, getEchartTypes }
