<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { getEcharts, deleteEchart, getEchartTypes } from '@/api/echart';
import BlockDesc from '@/components/pageCommon/BlockDesc.vue';
import { dateYMD } from 'utils/index'
import { useDict } from '@/store/dict';
import { Dict, EchartTypeObj, Echarts, Echart } from '@/types'
import EchartEditor from '../../components/echarts/EchartEditor.vue';

const dict = useDict()

const form = reactive({
    name: ""
})

let echartList: Echarts<Echart> = reactive({
    list: [],
    types: [],
    selectedTypes: []
})

// 获取所有echart类型
const getEchartTypeList = async () => {
    let { data } = await getEchartTypes()

    let typeList: Dict[] = dict.dictTable.filter((dict: Dict) => dict.key === 'echarts')

    let items = typeList?.[0]?.children ?? []

    let tempObj: Array<EchartTypeObj> = data.map((type: string) => {
        let item = items?.find(v => v.key === type)
        return ({
            key: type,
            value: item?.value ?? type
        })

    })

    echartList.types = tempObj
}

// 查询
const getEchartList = async () => {
    let { data } = await getEcharts(echartList.selectedTypes)
    echartList.list = data

}

onMounted(async () => {
    await getEchartTypeList()
    await getEchartList()
})

// 根据名称搜索echarts
const searchName = async () => {
    await getEchartList()
}

// 增改进入参数
const turnCreate = (name: string, optionStr: string) => {
    echartEditorData.option = {
        name,
        optionStr
    }
    echartEditorData.dialogVisual = true
}

// 删除操作
const deleteById = async (id: string) => {
    let result = await deleteEchart(id)
    console.log(result);
    await getEchartList()
    return true
}

// 点击修改库里的数据
const changeSelectedType = async (type: string) => {
    let index = echartList.selectedTypes.indexOf(type)
    if (index !== -1) {
        echartList.selectedTypes.splice(index, 1)
    } else {
        echartList.selectedTypes.push(type)
    }
    await getEchartList()
}

// 是否弹出弹层
const echartEditorData = reactive({
    dialogVisual: false,
    option: {
        name: "",
        optionStr: ""
    }
})

// 清除弹出框内容
const clearData = () => {
    echartEditorData.option = {
        name: "",
        optionStr: ""
    }
}

</script>

<template>
    <!-- 头部搜索 -->
    <div class="flex-between">
        <el-form :inline="true" :model="form">
            <el-form-item label="按名字搜索">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchName()">查询</el-button>
            </el-form-item>
        </el-form>

        <el-button type="success" @click="echartEditorData.dialogVisual = true">
            <el-icon style="vertical-align: middle;">
                <plus />
            </el-icon>
            <span style="vertical-align: middle;">添加</span>
        </el-button>
    </div>
    <!-- 多选搜索/单选搜索 -->
    <div class="selectTypes flex">
        <div
            v-for="({ key, value }) in echartList.types"
            :key="key"
            @click="changeSelectedType(key)"
            :class="echartList.selectedTypes.includes(key) && 'active'"
        >{{ value }}</div>
    </div>

    <!-- echarts列表 -->
    <el-empty description="description" v-show="echartList.list.length === 0"></el-empty>
    <el-space wrap :size="20">
        <block-desc v-for="echart in echartList.list" :key="echart._id">
            <template #image>
                <el-image
                    @click="turnCreate(echart.name, echart.optionStr)"
                    style="height:100%;"
                    :src="echart.base64"
                    fit="cover"
                    :alt="echart.name"
                ></el-image>
            </template>
            <template #desc>
                <el-descriptions class="content" :column="1">
                    <el-descriptions-item label="名称">{{ echart.name }}</el-descriptions-item>
                    <el-descriptions-item
                        label="更新时间"
                    >{{ dateYMD(echart.updatedAt) }}</el-descriptions-item>
                    <el-descriptions-item label="操作">
                        <el-popconfirm
                            title="Are you sure to delete this?"
                            @confirm="deleteById(echart._id)"
                        >
                            <template #reference>
                                <el-link type="danger">删除</el-link>
                            </template>
                        </el-popconfirm>
                    </el-descriptions-item>
                </el-descriptions>
            </template>
        </block-desc>
    </el-space>

    <!-- 对echarts编辑功能 -->
    <el-dialog
        v-model="echartEditorData.dialogVisual"
        :fullscreen="true"
        @close="clearData"
        :destroy-on-close="true"
    >
        <echart-editor
            :option="echartEditorData.option"
            @close="echartEditorData.dialogVisual = false"
            @update-echartlist="getEchartList"
        ></echart-editor>
    </el-dialog>
</template>

<style lang="scss" scoped>
.selectTypes {
    background-color: rgb(230, 230, 230);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 0 10px;
    & > div {
        padding: 4px 8px;
        margin: 4px;
        background-color: white;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        &.active {
            background-color: #e0fbff;
        }
    }
}
</style>