import api from '..'

const getDict = () => api.get('/dict')
const addDict = (data: { key: string; value: string; isdel: boolean; desc: string }) =>
    api.post('/dict', data)
const deleteDict = (_id: string) =>
    api.delete('/dict', {
        params: {
            _id
        }
    })

const addDictChild = (data: {
    _id: string
    key: string
    value: string
    isdel: boolean
    desc: string
}) => api.post('/dict/child', data)

const editDictChild = (data: {
    _id: string
    key: string
    value: string
    isdel: boolean
    desc: string
}) => api.put('/dict/child', data)

const deleteDictChildItem = (_id: string) =>
    api.delete('/dict/child', {
        params: {
            _id
        }
    })

export { getDict, addDict, deleteDict, addDictChild, editDictChild, deleteDictChildItem }
