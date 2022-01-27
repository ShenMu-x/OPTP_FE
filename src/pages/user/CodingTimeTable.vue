<template>
    <div id="statEChartCt"></div>
</template>

<style lang="less" scoped>
#statEChartCt {
    height: 240px;
    width: 100%;
}
</style>

<script lang="ts" setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent
} from 'echarts/components';
import { HeatmapChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer
]);


// const props = defineProps({
//     data: []
// });

const option = {
  visualMap: {
    show: false,
    min: 0,
    max: 2000,
    type: 'piecewise',
    orient: 'horizontal',
    left: 'center',
  },
  calendar: {
    range: '2022',
    yearLabel: {
      show: false
    },
    monthLabel:{
      nameMap: 'ZH',
    },
    dayLabel:{
      firstDay: 1,
      nameMap: 'ZH',
    },
    top: 30,
    left: 30,
    right: 30,
  },
  series: {
    type: 'heatmap',
    coordinateSystem: 'calendar',
    data: [
        ['2022-01-22', 1333],
        ['2022-01-21', 33],
    ]
  },
  tooltip:[
    {
      show: true,
      showContent: true,
      trigger: "item",
      triggerOn: "mousemove|click",
      alwaysShowContent: false,
      displayMode: "single",
      renderMode: "auto",
      confine: null,
      showDelay: 0,
      hideDelay: 100,
      transitionDuration: 0.4,
      enterable: false,
      backgroundColor:'#FFFFFF',
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, .2)',
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      borderRadius: 4,
      borderWidth: 1,
      padding: null,
      extraCssText: ""
    }
  ],
}

onMounted(() => {
    let myChart = echarts.init(document.getElementById('statEChartCt') as HTMLElement); 
    option && myChart.setOption(option);
})

</script>
