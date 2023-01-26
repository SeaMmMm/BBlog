<script setup>
import NotFoundImage from '@/components/svgcomponent/NotFoundImage.vue'
import BigCircle from '@/components/svgcomponent/BigCircle.vue'
import LittleCircle from '@/components/svgcomponent/LittleCricle.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { THEME_STORE } from '@/store/constant'

const router = useRouter()
const store = useStore()

const gotoHome = () => {
  router.push({ path: '/' })
}

const theme = computed(() => store.getters[THEME_STORE.GET_MODEL])
</script>

<template>
  <div class="NWrapper" :class="theme === 'white' ? 'white' : 'dark'">
    <div class="NContent">
      <div class="txtLeft">
        <n-h1>
          <n-text style="font-weight: 800">Opss...</n-text>
        </n-h1>
        <n-h2>Page not found</n-h2>
        <n-p style="width: 400px"
          >We are very sorry for inconvenience. It looks you’re trying to access
          a page that either has been deleted or never been existed</n-p
        >
        <div class="button" @click="gotoHome">
          <n-text type="default">Go Home</n-text>
        </div>
      </div>
      <NotFoundImage :size="600" />
    </div>
    <BigCircle :size="450" class="bgC" />
    <LittleCircle :size="350" class="ltC" />
  </div>
</template>

<style lang="scss" scoped>
.white {
  background: #fef3f0;
}
.dark {
  background: linear-gradient(
    116.58deg,
    #71318a -1.32%,
    #30457b -1.31%,
    #450060 96.06%
  );
}
.NWrapper {
  padding-top: 150px;
  padding-left: 100px;
  padding-bottom: 100px;
  overflow: hidden;
  position: relative;
  .NContent {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;
  }
}
.ltC {
  position: absolute;
  right: -200px;
  top: 31px;
}
.bgC {
  position: absolute;
  left: -140px;
  top: 595px;
}
.button {
  padding: 16px 22px;
  max-width: 100px;
  text-align: center;
  background: #d75239;
  border-radius: 8px;
  cursor: pointer;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  }
}
</style>
