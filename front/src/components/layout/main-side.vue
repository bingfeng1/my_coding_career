<script setup lang="ts">
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
</script>
<template>
    <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        :router="true"
    >
        <el-menu-item index="/">
            <el-icon>
                <IconMenu />
            </el-icon>
            <span>项目模板</span>
        </el-menu-item>
        <el-menu-item index="/echarts">
            <el-icon>
                <IconMenu />
            </el-icon>
            <span>echarts模板</span>
        </el-menu-item>
        <el-menu-item index="/dicts">
            <el-icon>
                <IconMenu />
            </el-icon>
            <span>字典管理</span>
        </el-menu-item>
    </el-menu>
</template>

<style lang="scss" scoped>
</style>