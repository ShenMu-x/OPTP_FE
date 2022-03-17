<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent
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
  CanvasRenderer
]);

const props = defineProps<{ list: any[], id?: string }>();
const id = `echartEl_${props.id}` ?? 'echartEl';
onMounted(() => {
  let myChart = echarts.init(document.getElementById(id) as HTMLElement);
  getConfig && myChart.setOption(getConfig(props.list ?? []));
})

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