<script setup lang="ts">
import { reactive } from 'vue';
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus';
import { useDict } from 'stores/dict'
import { FormData } from '@/types'

const dict = useDict()

// 当前组件的双向绑定
const dictData = reactive({
    dialogVisible: false,
    formData: {
        _id: '',
        key: '',
        value: '',
        isdel: false,
        desc: '',
    },
    // 是否是子类的添加
    isChild: false,
    // 是否是子项的修改
    isChildEdit: false
})

// 打开添加页面
const showDialog = (row: FormData | undefined) => {
    if (row) {
        dictData.formData = cloneDeep(row)
    }
    dictData.dialogVisible = true
}

// 提交表单
const dealDictData = async () => {
    const formData = dictData.formData
    await dict.dealDictData(formData)
    ElMessage.success("添加成功")
    dictData.dialogVisible = false

}

// 删除总字典表
const deleteThisDict = async (_id: string) => {
    await dict.deleteThisDict(_id)
    ElMessage.success("删除成功")
}

// 增加子项
const addDictItem = async (id: string) => {
    dictData.isChild = true
    // 获取父级id
    dictData.formData._id = id
    // 弹出框
    dictData.dialogVisible = true
}

// 修改子项
const editDictItem = async (row: FormData) => {
    // 判断子类
    dictData.isChild = true
    dictData.isChildEdit = true
    dictData.formData = row
    // 弹出框
    dictData.dialogVisible = true

}

// 提交子集
const dealDictItemData = async () => {
    const formData = dictData.formData
    await dict.editDictChild(dictData.isChildEdit, formData)
    ElMessage.success("添加成功")
    dictData.dialogVisible = false
}

const deleteDictItem = async (_id: string) => {
    await dict.deleteDictItem(_id)
    ElMessage.success("删除成功")

}

const isUse = (isdel: boolean) => {
    return isdel ? '停用' : '启用'
}

// 清空form表单
const clearForm = () => {
    dictData.formData = {
        _id: '',
        key: '',
        value: '',
        isdel: false,
        desc: '',
    }
    // 取消子集判断
    dictData.isChild = false
    dictData.isChildEdit = false
}
</script>

<template>
    <el-button @click="showDialog(undefined)">添加字典</el-button>
    <el-table :data="dict.dictTable" :border="true" default-expand-all>
        <el-table-column type="expand">
            <template #default="{ row }">
                <div class="child-table">
                    <el-table :data="row.children">
                        <el-table-column prop="key" label="字典名"></el-table-column>
                        <el-table-column prop="value" label="字典意义"></el-table-column>
                        <el-table-column prop="desc" label="字典描述"></el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row }">
                                <el-button
                                    size="small"
                                    @click="editDictItem(row)"
                                >修改</el-button>
                                <el-button
                                    size="small"
                                    @click="deleteDictItem(row._id)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="key" label="字典名"></el-table-column>
        <el-table-column prop="value" label="字典意义"></el-table-column>
        <el-table-column prop="isdel" label="字典状态">
            <template #default="{ row }">{{ isUse(row.isdel) }}</template>
        </el-table-column>
        <el-table-column prop="desc" label="字典描述"></el-table-column>
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button size="small" @click="addDictItem(row._id)">添加</el-button>
                <el-button size="small" @click="showDialog(row)">修改</el-button>
                <el-button size="small" @click="deleteThisDict(row._id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dictData.dialogVisible" title="添加字典" @close="clearForm">
        <el-form :model="dictData.formData" label-width="80px">
            <el-form-item label="字典key">
                <el-input v-model="dictData.formData.key"></el-input>
            </el-form-item>
            <el-form-item label="字典名称">
                <el-input v-model="dictData.formData.value"></el-input>
            </el-form-item>
            <el-form-item label="是否禁用">
                <el-switch v-model="dictData.formData.isdel" />
            </el-form-item>
            <el-form-item label="字典描述">
                <el-input v-model="dictData.formData.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="dictData.isChild ? dealDictItemData() : dealDictData()"
                >提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style lang="scss" scoped>
.child-table {
    padding-left: 80px;
}
</style>