<script setup>
import { THEME_STORE } from '@/store/constant'

//导入的是全局主题和语言设置
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  darkTheme,
  dateZhCN,
  zhCN
} from 'naive-ui'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const theme = computed(() => store.getters[THEME_STORE.GET_MODEL])
</script>

<template>
  <!-- 全局默认汉语 -->
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme === 'white' ? null : darkTheme"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }"
  >
    <!-- 使用加载条 -->
    <n-loading-bar-provider>
      <n-message-provider>
        <div
          :class="theme === 'white' ? 'globalWhiteStyle' : 'globalDarkStyle'"
          class="globalDefault"
        >
          <router-view v-slot="{ Component, route }">
            <Transition
              mode="out-in"
              appear
              appear-active-class="animate__animated animate__fadeIn"
              :name="route.meta.transition"
            >
              <component :is="Component" />
            </Transition>
          </router-view>
        </div>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="scss">
@import '@/assets/globalstyle.scss';

.globalDefault {
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.globalWhiteStyle {
  background: #fef3f0;
}
.globalDarkStyle {
  background: black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
