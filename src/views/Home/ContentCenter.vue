<script setup>
import Instagram from '@/assets/iphoto.png'
import Tesla from '@/assets/tesla.png'
import TikTok from '@/assets/tictoc.png'
import Wechat from '@/assets/wechat.png'
import BlueCircle from '@/components/circle/BlueCircle.vue'
import PurpleCircle from '@/components/circle/PurpleCircle.vue'

import { Joget } from '@vicons/fa'
import { Eye16Filled } from '@vicons/fluent'
import { useElementVisibility } from '@vueuse/core'
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const showGal = ref(false)

//  图片对象数组,后面转换成接口调用
const galleries = reactive([
  {
    title: 'Instagram',
    image: Instagram,
    description:
      'A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.',
    tag: ['chat', 'photo'],
    url: 'https://www.instagram.com/'
  },
  {
    title: 'Tesla',
    image: Tesla,
    description:
      "Tesla is accelerating the world's transition to sustainable energy with electric cars, solar and integrated renewable energy solutions for homes and businesses",
    tag: ['car', 'speed'],
    url: 'https://www.tesla.com/en_hk'
  },
  {
    title: 'WeChat',
    image: Wechat,
    tag: ['chat', 'china'],
    description:
      'A cross-platform communication tool. Support single and multi-person participation. Send voice, pictures, videos, and text over the cellular network. WeChat for Windows can extract and translate text content in pictures.',
    url: 'https://web.wechat.com/'
  },
  {
    title: 'tiktok',
    image: TikTok,
    description:
      ' trends start here. On a device or on the web, viewers can watch and discover millions of personalized short videos. Download the app to get started',
    tag: ['short-video', 'share'],
    url: 'https://www.youtube.com/tiktok'
  }
])
//  展示图片是否出现
const showImage = ref(false)
// 用来轮播图的
const carousel = ref(null)
const isVisible = useElementVisibility(carousel)
const router = useRouter()

const goLogin = () => {
  router.push('/login')
}

const goOut = (_, url) => {
  window.open(url, '_blank')
}

watchEffect(() => {
  if (isVisible) showImage.value = true
})
</script>

<template>
  <!-- 中间部分 -->
  <div class="ContentWrapper">
    <div class="gridWrapper">
      <div class="Content">
        <Transition
          appear
          appear-active-class="animate__animated animate__zoomInDown"
        >
          <n-p> Create Your Own Beautiful Blog </n-p>
        </Transition>
        <BlueCircle class="bc" />
        <PurpleCircle class="pc" />
        <BlueCircle class="bc2" />
        <Transition
          appear
          appear-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <n-h1 :align-text="true">
            There is no passion to be found playing small in settling for <br />
            a life that is less than the one you are capable of living
          </n-h1>
        </Transition>
        <Transition
          appear
          appear-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <n-button @click="goLogin" size="large" dashed round
            ><template #icon>
              <n-icon>
                <joget />
              </n-icon> </template
            >Get started</n-button
          >
        </Transition>
      </div>
      <n-image
        style="pointer-events: none"
        lazy
        width="600"
        :src="require('@/assets/man.png')"
      />
    </div>

    <!-- 卡片部分 -->
    <div class="card">
      <n-h1 align-text type="info" prefix="bar">
        <n-text strong type="info">Galleries</n-text>
        <n-p>Why don't you hurry up and try it 🧐 ?</n-p>
      </n-h1>
      <n-button @click="showGal = true" text strong style="padding-left: 20px">
        <template #icon>
          <n-icon>
            <eye-16-filled />
          </n-icon>
        </template>
        查看全部
      </n-button>
      <n-modal v-model:show="showGal">
        <n-card
          style="width: 800px"
          title="Galleries"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <template #footer>
            <n-text type="info">更多即将呈现...</n-text>
          </template>
          <n-list hoverable clickable>
            <n-list-item v-for="el in galleries" :key="el.url">
              <n-thing :title="el.title" content-style="margin-top: 10px;">
                <template #description>
                  <n-space size="small" style="margin-top: 4px">
                    <n-tag
                      v-for="tg in el.tag"
                      :key="tg"
                      :bordered="false"
                      :type="
                        ['info', 'success', 'error', 'warning'][
                          Math.floor(Math.random() * 4)
                        ]
                      "
                      size="small"
                    >
                      {{ tg }}
                    </n-tag>
                  </n-space>
                  <n-text depth="3" type="default">{{ el.description }}</n-text>
                </template>

                <template #footer>
                  <n-button
                    quaternary
                    circle
                    type="success"
                    @click="goOut(_, el.url)"
                  >
                    <template #icon>
                      <n-icon><eye16-filled /></n-icon>
                    </template>
                  </n-button>
                </template>

                <template #header-extra>
                  <n-image
                    lazy
                    style="border-radius: 100px; object-fit: cover"
                    width="60"
                    height="60"
                    :src="el.image"
                  />
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-modal>
      <n-carousel
        ref="carousel"
        style="padding: 80px 0px"
        :default-index="1"
        slides-per-view="auto"
        autoplay
        show-arrow
        dot-type="line"
        :interval="2000"
      >
        <n-carousel-item
          v-for="el in galleries"
          :key="el.description"
          style="width: 25%"
        >
          <n-image
            style="pointer-events: none"
            width="250"
            lazy
            :src="el.image"
          />
        </n-carousel-item>
        <n-carousel-item
          v-show="showImage"
          style="width: 24%; border-radius: 40px"
        >
          <n-card style="pointer-events: none" embedded :bordered="false">
            <template #cover>
              <n-image
                height="240"
                lazy
                :src="require('@/assets/more-to-come.gif')"
              />
            </template>
            <template #action>
              <n-text type="info" strong>More to come...</n-text>
            </template>
          </n-card>
        </n-carousel-item>
      </n-carousel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ContentWrapper {
  .gridWrapper {
    display: grid;
    grid-template-columns: auto auto;
  }

  .Content {
    padding-top: 40px;
    p {
      font-style: normal;
      font-weight: 800;
      font-size: 70px;
      line-height: 84px;
      letter-spacing: 0.02em;
      background: linear-gradient(93.54deg, #3b82f6 9.03%, #d946ef 43.88%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
    }
    h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 30px;
      opacity: 0.8;
    }
    .bc {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 30%;
    }
    .pc {
      width: 120px;
      height: 120px;
      position: absolute;
      top: 30%;
      left: 50%;
    }
    .bc2 {
      width: 200px;
      height: 300px;
      position: absolute;
      top: 30%;
      right: 0;
      filter: blur(60px);
    }
  }
  .carousel-img {
    object-fit: contain;
    max-height: 380px;
    pointer-events: none;
  }
}
</style>
