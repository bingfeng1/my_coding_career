
const response = (code) => {
    return (message) => {
        return (data) => ({
            code,
            message,
            data
        })
    }
}

const successRes = response(200)('请求成功')

export {
    successRes,
    response
}