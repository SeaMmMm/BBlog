<script setup>
import { useElementVisibility } from '@vueuse/core'
import { onMounted, ref, watchEffect } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'

const main = ref(null) // 使用ref创建虚拟DOM引用，使用时用main.value
const isVisible = useElementVisibility(main)

onMounted(() => {
  const myChart = echarts.init(main.value, 'black', {
    render: 'svg'
  })
  const option = {
    legend: {
      data: ['yesterday', 'today']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'China', max: 200 },
        { name: 'USA', max: 200 },
        { name: 'Canada', max: 200 },
        { name: 'Hongkong', max: 200 },
        { name: 'Development', max: 200 },
        { name: 'California', max: 200 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [102, 121, 132, 122, 162, 154],
            name: 'yesterday'
          },
          {
            value: [120, 103, 129, 200, 156, 189],
            name: 'today'
          }
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。

  watchEffect(() => {
    if (isVisible.value) myChart.setOption(option)
  })
})
</script>

<template>
  <div ref="main" style="height: 400px; padding: 40px" />
</template>

<style lang="scss" scoped></style>
