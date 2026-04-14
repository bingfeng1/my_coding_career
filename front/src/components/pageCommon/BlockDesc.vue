<script setup lang="ts">
</script>

<template>
    <el-card :body-style="{ padding: '0px' }" class="box-card">
        <div class="flex-column-between">
            <div class="image">
                <slot name="image"></slot>
            </div>

            <div class="desc">
                <slot name="desc"></slot>
            </div>
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
div.image{
    height: 158px;
    text-align: center;
}
div.desc {
    flex: 1;
}
</style>