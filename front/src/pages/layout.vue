<script setup lang="ts">
import MainSide from '@/components/layout/main-side.vue';

</script>

<template>
    <el-container class="container">
        <el-header class="flex-center">
            <!-- 拖拽低代码平台 -->
        </el-header>
        <el-container>
            <el-aside width="200px">
                <MainSide></MainSide>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.container {
    .el-header {
        height: 60px;
        background-color: var(--el-color-primary-light-3);
        color: white;
        font-size: 32px;
    }

    .el-aside {
        height: calc(100vh - 60px);
        background-color: var(--el-color-primary);
    }

    .el-main {
        height: calc(100vh - 60px);
        background-color: var(--el-bg-color);
    }
}
</style>