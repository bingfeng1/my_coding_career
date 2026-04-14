import {
    addDict,
    addDictChild,
    deleteDict,
    deleteDictChildItem,
    editDictChild,
    getDict
} from '@/api/dict'
import { defineStore } from 'pinia'
import { FormData } from '@/types'

// 字典表是公共存储的
export const useDict = defineStore('dict', {
    // 字典表状态管理
    state: () => {
        return {
            dictTable: []
        }
    },
    getters: {},
    actions: {
        // 获取字典表信息
        async getDictTable() {
            const { data } = await getDict()
            this.dictTable = data
        },
        // 处理字典表信息（增改）
        async dealDictData(formData: FormData) {
            const { data } = await addDict(formData)
            if (data) {
                await this.getDictTable()
            }
        },
        // 删除字典表
        async deleteThisDict(_id: string) {
            const { data } = await deleteDict(_id)
            if (data) {
                await this.getDictTable()
            }
        },
        // 修改字典表
        async editDictChild(isChildEdit: boolean, formData: FormData) {
            let result
            // 子集修改
            if (isChildEdit) {
                result = await editDictChild(formData)
            } else {
                // 如果是子集
                result = await addDictChild(formData)
            }
            const { data } = result
            if (data) {
                await this.getDictTable()
            }
        },
        // 删除字典表子集
        async deleteDictItem(_id: string) {
            const { data } = await deleteDictChildItem(_id)

            if (data) {
                await this.getDictTable()
            }
        }
    }
})
