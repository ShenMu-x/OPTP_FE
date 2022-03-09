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
import { getMyCodingTime } from '@/utils/services';

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  LegendComponent,
  HeatmapChart,
  CanvasRenderer
]);

const data = reactive<{
  timeList: any[]
}>({
  timeList: []
});

onMounted(() => {
  let myChart = echarts.init(document.getElementById('statEChartCt') as HTMLElement);
  // const listData = [
  //   ['2022-01-02', 1333],
  //   ['2022-01-03', 33],
  // ];

  getMyCodingTime()
    .then(res => {
      data.timeList = res.data?.codingTime ?? [];
      getConfig && myChart.setOption(getConfig(data.timeList));
    });
})

</script>

<template>
  <div id="statEChartCt"></div>
</template>

<style lang="less" scoped>
#statEChartCt {
  height: 180px;
  width: 100%;
}
</style>