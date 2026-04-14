<script setup lang="ts">
import { createProject, getProjects } from '@/api/project';
import { onMounted, reactive, ref } from 'vue';
import { Plus } from "@element-plus/icons-vue"
import { ElForm } from 'element-plus';
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import BlockDesc from '../../components/pageCommon/BlockDesc.vue';
import { dateYMD, backurl } from 'utils/index'

// 后端数据类型
interface Project {
    id: number,
    name: string,
    icon: string,
    createdAt: string,
    updatedAt: string
}

// 类型集合
interface Projects<T> {
    data: Array<T>
}

let projects: Projects<Project> = reactive({
    data: []
})

// 进入时获取数据
onMounted(async () => {
    await _getProjects()
})

// 获取项目列表
async function _getProjects() {
    // 获取项目列表
    let { data } = await getProjects()

    projects.data = data
}

// 切换为表单
const isForm = ref(false)
const showForm = () => {
    isForm.value = true
}

// 表单选项
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const formData = reactive({
    name: "",
})

// 文件上传成功时
let file: UploadFile | undefined = undefined;
const changeFile = (_file: UploadFile) => {
    file = _file
}

// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl || !file) return
    let form = new FormData()
    form.append("name", formData.name)
    form.append("icon", file.raw)
    await createProject(form)
    // 提交成功后，再次获取数据
    await _getProjects()

    // 重置表单
    resetForm()
}

const resetForm = () => {
    formData.name = ""
    file = undefined
    isForm.value = false
}

</script>

<template>
    <el-space wrap>
        <el-card class="box-card plus">
            <el-icon
                :size="100"
                color="rgba(0,0,0,.2)"
                v-if="!isForm"
                @click="showForm"
            >
                <plus />
            </el-icon>
            <el-form v-else :model="formData" ref="formRef" label-width="120px">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="项目图标" prop="icon">
                    <el-upload
                        action="#"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="changeFile"
                    >
                        <el-link type="primary">上传图标</el-link>
                    </el-upload>
                </el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">新建</el-button>
                <el-button @click="resetForm()">取消</el-button>
            </el-form>
        </el-card>
        <block-desc v-for="project in projects.data" :key="project.id">
            <template #image>
                <el-image
                    style="height:100%;"
                    :src="backurl + '/' + project.icon"
                    fit="cover"
                    :alt="project.name"
                ></el-image>
            </template>
            <template #desc>
                <el-descriptions class="content" :column="1">
                    <el-descriptions-item label="名称">{{ project.name }}</el-descriptions-item>
                    <el-descriptions-item
                        label="创建时间"
                    >{{ dateYMD(project.createdAt) }}</el-descriptions-item>
                    <el-descriptions-item
                        label="更新时间"
                    >{{ dateYMD(project.updatedAt) }}</el-descriptions-item>
                </el-descriptions>
            </template>
        </block-desc>
    </el-space>
</template>

<style lang="scss" scoped>
.box-card {
    width: 280px;
    height: 280px;
    &.plus {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        .el-icon {
            cursor: pointer;
        }
    }

    .content {
        margin: 10px;
    }
}

.el-form-item {
    display: flex;
    margin-bottom: 20px;
}
</style>
