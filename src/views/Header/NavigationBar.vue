<script setup>
import IconComponent from '@/components/svgcomponent/IconComponent.vue'
import { WeatherSunnyLow24Regular } from '@vicons/fluent'
import { MdLogIn } from '@vicons/ionicons4'
import { DarkModeTwotone, SupervisedUserCircleTwotone } from '@vicons/material'
import { computed, reactive, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { THEME_STORE } from '@/store/constant'

const router = useRouter()
const store = useStore()
// 导航栏的
const linkTxt = reactive([
  {
    title: ' About',
    to: '/about'
  },
  {
    title: ' Team',
    to: '/team'
  },
  {
    title: ' More',
    to: '/more'
  }
])

const setWhiteTheme = () => store.commit(THEME_STORE.SET_WHITE_MODEL, 'white')
const setDarkTheme = () => store.commit(THEME_STORE.SET_DARK_MODEL, 'dark')

const themeModel = computed(() => store.getters[THEME_STORE.GET_MODEL])
const theme = ref(themeModel.value === 'white' ? false : true)

watchEffect(() => {
  const themeModel = computed(() => store.getters[THEME_STORE.GET_MODEL])

  if (!theme.value) {
    setWhiteTheme()
  } else {
    setDarkTheme()
  }
  theme.value = themeModel.value === 'white' ? false : true
})

const goto = (_, url) => {
  router.push(url)
}
const railStyle = ({ focused, checked }) => {
  const style = {}
  if (!checked) {
    style.background = 'rgba(15, 14, 71, 0.5)'
    if (focused) {
      style.boxShadow = '0 0 0 1px #e9e7ef'
    }
  } else {
    style.background = '#a1afc9'
    if (focused) {
      style.boxShadow = '0 0 0 1px #47585c'
    }
  }
  return style
}
</script>

<template>
  <div>
    <div class="topWrapper" :class="themeModel === 'white' ? 'white' : 'dark'">
      <!-- 图标 -->
      <router-link to="/">
        <IconComponent :size="25" class="icon" />
      </router-link>

      <!-- 顶部文字 -->
      <div class="topTitle">
        <n-button
          text
          v-for="el in linkTxt"
          @click="router.push(el.to)"
          :key="el.title"
          style="font-weight: 900; font-size: 16px"
        >
          {{ el.title }}
        </n-button>
      </div>

      <!-- 按钮 -->
      <div class="auth">
        <n-button type="primary" strong @click="goto(_, '/login')">
          <template #icon>
            <n-icon>
              <md-log-in />
            </n-icon>
          </template>
          Login
        </n-button>
        <n-button type="info" dashed strong @click="goto(_, '/signup')">
          <template #icon>
            <n-icon>
              <supervised-user-circle-twotone />
            </n-icon>
          </template>
          SignUp
        </n-button>
        <div>
          <n-divider vertical />
          <n-switch v-model:value="theme" :rail-style="railStyle">
            <template #unchecked-icon>
              <n-icon :component="WeatherSunnyLow24Regular" />
            </template>
            <template #checked-icon>
              <n-icon :component="DarkModeTwotone" />
            </template>
          </n-switch>
        </div>
      </div>
    </div>
    <router-view />
    <n-back-top :right="100" />
  </div>
</template>

<style lang="scss" scoped>
.dark {
  background: rgba(36, 36, 36, 0.7);
}
.white {
  background: rgba(255, 255, 255, 0.7);
}
.topWrapper {
  display: grid;
  padding: 16px;
  backdrop-filter: blur(10px);
  grid-template-columns: repeat(3, auto);
  z-index: 100;
  justify-items: center;
  align-items: center;
  .icon {
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      transform: scale(1.2);
    }
  }

  .topTitle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    align-items: center;
    justify-items: center;
  }
  .auth {
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    gap: 20px;
  }
}
</style>
