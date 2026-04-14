export interface MyResponseType<T = any> {
    code: number
    message: string
    data: T
}

export interface DictData {
    dictTable: Array<Dict>
    dialogVisible: boolean
    formData: FormData
    // 是否是添加子项
    isChild: boolean
    isChildEdit: boolean
}
export interface Dict {
    _id: string
    key: string
    value: string
    isdel: boolean
    desc: string
    children?: Dict[]
}

export interface FormData {
    _id: string
    key: string
    value: string
    isdel: boolean
    desc: string
}

export interface EchartTypeObj {
    key: string
    value: string
}

// 后端数据类型
export interface Echart {
    _id: string
    name: string
    optionStr: string
    option: object
    updatedAt: string
    base64: string
}

// 类型集合
export interface Echarts<T> {
    list: Array<T>
    types: Array<EchartTypeObj>
    selectedTypes: Array<string>
}

// 搜索选项
export interface EchartSelect {
    name?: string
}
