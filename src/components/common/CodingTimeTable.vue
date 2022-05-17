<script lang="ts" setup>
import { onMounted, watch, toRef } from 'vue';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    LegendComponent,
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import getConfig from './timeTableConfig';

echarts.use([
    TitleComponent,
    CalendarComponent,
    TooltipComponent,
    VisualMapComponent,
    LegendComponent,
    HeatmapChart,
    CanvasRenderer,
]);

const props = defineProps<{ list: any[]; id?: string }>();
const list = toRef(props, 'list');
const id = `echartEl_${props.id}` ?? 'echartEl';
let myChart: echarts.ECharts | null = null;
onMounted(() => {
    myChart = echarts.init(document.getElementById(id) as HTMLElement);
    getConfig && myChart.setOption(getConfig(props.list ?? []));
});
watch(list, (newv) => {
    myChart && getConfig && myChart.setOption(getConfig(newv ?? []));
});
</script>

<template>
    <div :id="id" class="eChartCt"></div>
</template>

<style lang="less" scoped>
.eChartCt {
    position: relative;
    height: 180px;
    width: 100%;
}
</style>