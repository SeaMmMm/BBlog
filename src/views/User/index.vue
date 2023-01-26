<script setup>
import {
  LogOutOutline as HomeIcon,
  LaptopOutline as WorkIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'

const renderIcon = icon => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = ref([
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/text1'
          }
        },
        { default: () => '回家' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/user/text2'
          }
        },
        { default: () => '上班' }
      ),
    key: 'go-to-work',
    icon: renderIcon(WorkIcon)
  }
])
</script>

<template>
  <n-menu :options="menuOptions" />
</template>

<style lang="scss" scoped></style>
