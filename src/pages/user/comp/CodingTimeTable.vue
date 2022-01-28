<template>
    <div id="statEChartCt"></div>
</template>

<style lang="less" scoped>
#statEChartCt {
    height: 200px;
    width: 100%;
}
</style>

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


// const props = defineProps({
//     data: []
// });
const listData = reactive([
      ['2022-01-02', 133],
      ['2022-01-01', 33],
]); 

onMounted(() => {
    let myChart = echarts.init(document.getElementById('statEChartCt') as HTMLElement); 
    const listData = [
      ['2022-01-02', 1333],
      ['2022-01-03', 33],
    ];

getConfig && myChart.setOption(getConfig(listData));

})

</script>
