<script setup lang="ts">
import EchartEditor from '@/components/echarts/EchartEditor.vue';

const props = defineProps(
    ['optionStr'],
)

</script>

<template>
    <echart-editor :optionStr="props.optionStr">
    </echart-editor>
</template>

<style lang="scss" scoped>
</style>