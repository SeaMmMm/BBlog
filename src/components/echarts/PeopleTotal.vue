<script setup>
import { useElementVisibility } from '@vueuse/core'
import { onMounted, ref, watchEffect } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'

const main = ref(null) // 使用ref创建虚拟DOM引用，使用时用main.value
const isVisible = useElementVisibility(main)

onMounted(() => {
  const myChart = echarts.init(main.value, null, {
    render: 'svg'
  })
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'start'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold',
            color: 'linear-gradient(93.54deg, #3B82F6 9.03%, #D946EF 43.88%)'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 60, name: 'China' },
          { value: 30, name: 'USA' },
          { value: 21, name: 'Canada' },
          { value: 7, name: 'Hongkong' },
          { value: 2, name: 'California' }
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
