<script setup lang="ts">
import { onMounted, reactive, readonly, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { createEchart } from '@/api/echart';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';
// 因为echarts模板中需要使用echarts，这边先提前引入
import * as $echarts from 'echarts'

const props = defineProps(
    {
        option: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    optionStr: ''
                }
            }
        }
    }
)

// 提取关闭dialog
const emit = defineEmits(['close', 'update-echartlist'])

// 将optionStr变为非响应式数据
let { option: { optionStr, name } } = props
// 然后作为自身组件的响应式
// 为echart的option提供数据
const _option = reactive({
    optionStr,
    realOption: {},
    name
})

// 是否验证通过，作为可以提交入库的判断
const isVaild = ref(false)

// 是否已保存
const hasSave = ref(true)


// 绘制echarts
const drawEchart = (text: string) => {
    let echarts
    let option = {};
    try {
        // 如果可以通过，且不为空，就赋值
        // 这里的解析步骤，以后需要拿出来单独作为解析判断，这里简略使用eval
        if (text.includes('echarts')) {
            echarts = readonly($echarts)
        }
        eval(text)
        if (text !== "") {
            _option.realOption = option
            isVaild.value = true
        }
    } catch (e) {
        console.error('option解析错误', e);

        isVaild.value = false
    }
}

// 在页面加载完成后，通过传入的str来进行绘制
onMounted(() => {
    drawEchart(optionStr)
})

// monaco editor 变化时
const handleEditorChange = (value: string) => {
    _option.optionStr = value
}

// 如果手动写入的话，那就改为textarea的值
watch(() => _option.optionStr, (text: string) => {
    hasSave.value = false
    isVaild.value = false
    drawEchart(text)
})


// 获取echarts的dom，为保存图片做准备
const echartDom = ref()
// 保存数据
const save = async () => {
    let name = _option.name;
    let optionStr = _option.optionStr

    // 需要保存一下图片，交给后台
    let dom = echartDom.value
    let width = dom.getWidth()
    let height = dom.getHeight()
    dom.resize({
        width: '500',
        height: '500'
    })

    let base64 = dom.getDataURL()
    dom.resize({
        width,
        height
    })

    // 判断是否有名字
    if (!name) {
        let result
        try {
            result = await ElMessageBox.prompt('目前名称是空的，确定不输入名称嘛？', {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            })
        } catch {
            return
        }

        // 将输入的名字赋值（如果还是为空，也可以入库）
        name = result.value
        // .then(({ value }) => {
        //     name = value
        // }).catch(() => {
        //     // 点击取消无事发生
        //     return
        // })
    }

    let { data } = await createEchart({
        name,
        optionStr,
        base64
    })

    ElMessage.success({
        message: data
    })

    _option.name = ""
    hasSave.value = true
    emit('update-echartlist')
}

// 退出时
const backEchartList = () => {
    if (!hasSave.value) {
        ElMessageBox.confirm(
            '当前修改暂未保存，是否退出编辑',
            '警告',
            {
                confirmButtonText: '确认退出',
                cancelButtonText: '取消',
                type: 'warning',
                confirmButtonClass: "warning"
            }
        ).then(() => {
            emit('close')
        }).catch(() => {
            return
        })
        return
    }
    emit('close')
}

</script>

<template>
    <div class="drawChart flex">
        <div>
            <el-input
                v-model="_option.name"
                placeholder="名称"
                class="echart-name"
            >
                <template #prepend>echarts名称</template>
            </el-input>
            <el-tooltip
                effect="light"
                content="有语法错误，无法保存"
                placement="top-start"
                :disabled="isVaild"
            >
                <div class="editor">
                    <VueMonacoEditor
                        language="javascript"
                        theme="vs"
                        :value="_option.optionStr"
                        @change="handleEditorChange"
                        :options="{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 2,
                            wordWrap: 'on'
                        }"
                    />
                </div>
            </el-tooltip>
        </div>
        <div class="show-echart flex-column-between">
            <div class="toolbar">
                <el-button
                    :disabled="!isVaild"
                    type="primary"
                    @click="save()"
                >保存</el-button>
                <el-button type="primary" plain @click="backEchartList()">返回列表</el-button>
                <slot name="toolbar"></slot>
            </div>
            <v-chart
                ref="echartDom"
                :autoresize="true"
                style="flex:1;"
                :option="_option.realOption"
                :update-options="{ notMerge: true }"
            ></v-chart>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.drawChart {
    width: 100%;
    // 设置全屏
    height: calc(100vh - 90px);
    gap: 20px;
    & > * {
        flex: 1;
    }

    .echart-name {
        margin-bottom: 20px;
    }

    .editor {
        overflow: auto;
        height: calc(100vh - 160px);
        border: 1px solid rgb(199, 199, 199);
        border-radius: 4px;
    }

    .show-echart {
        border-radius: 6px;
        background-color: white;
        border: 1px solid rgb(199, 199, 199);

        .toolbar {
            margin: 8px;
            padding-bottom: 8px;
            box-sizing: border-box;
            border-bottom: 1px solid rgb(199, 199, 199);
        }
    }
}
</style>