<script setup>
import man from '@/assets/fman.png'
import forest from '@/assets/forest.png'
import grl from '@/assets/grl.png'
import kd from '@/assets/kd.png'
import woman from '@/assets/woman.png'
import DatePeople from '@/components/echarts/DatePeople.vue'
import PeopleTotal from '@/components/echarts/PeopleTotal.vue'
import { THEME_STORE } from '@/store/constant'
import { RadarChartOutlined } from '@vicons/antd'
import { Airplane20Filled } from '@vicons/fluent'
import { NaturePeopleFilled } from '@vicons/material'
import { ChartArcs3 } from '@vicons/tabler'
import { addDays, isYesterday } from 'date-fns/esm'
import { useMessage } from 'naive-ui'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

const changeChart = ref(false)
// 作用于Latest Articles标签上的ref
const targetTxt = ref(null)
const imageList = ref([
  { alt: 'forest', image: forest },
  { alt: 'man', image: man },
  { alt: 'woman', image: woman },
  { alt: 'kd', image: kd },
  { alt: 'grl', image: grl }
])
const loopRef = ref(null)

const store = useStore()
const message = useMessage()
const checkedDate = reactive({
  year: null,
  month: null,
  date: null
})

const theme = computed(() => store.getters[THEME_STORE.GET_MODEL])

// const message = useMessage()
const value = ref(addDays(Date.now(), 0).valueOf())
const isDateDisabled = timestamp => {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}
const handleUpdateValue = (_, { year, month, date }) => {
  message.success(`${year}-${month}-${date}`)

  checkedDate.year = year
  checkedDate.month = month
  checkedDate.date = date
}

// 开关自定义函数
const railStyle = ({ focused, checked }) => {
  const style = {}
  if (checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}
</script>

<template>
  <div class="FooterWrapper">
    <div class="FootContent">
      <n-h1 align-text prefix="bar">
        <n-text type="success"> Latest Articles </n-text>
        <n-p
          >At the moment of inspiration, use your computer or mobile device to
          record your thoughts in words at any time</n-p
        >
      </n-h1>
      <div ref="targetTxt" :class="theme === 'white' ? 'whitedart' : 'chart'">
        <div class="chartContent">
          <n-statistic label="we have more than" tabular-nums>
            <template #prefix>
              <n-icon>
                <nature-people-filled />
              </n-icon>
            </template>
            <n-number-animation :from="0" :to="120" :duration="4000" />
            <template #suffix> Authenticated!</template>
          </n-statistic>
          <PeopleTotal v-if="changeChart" />
          <DatePeople v-else />
          <n-switch
            :rail-style="railStyle"
            v-model:value="changeChart"
            size="medium"
            style="position: absolute; bottom: 20px; right: -40px"
          >
            <template #checked-icon>
              <n-icon :component="ChartArcs3" />
            </template>
            <template #unchecked-icon>
              <n-icon :component="RadarChartOutlined" />
            </template>
          </n-switch>
        </div>
      </div>
    </div>
    <div class="descriptions">
      <n-h1 prefix="bar" align-text type="warning">
        <n-text strong type="warning">Calendar</n-text>
        <n-p
          >Choose a date that suits you and start recording your first blog on
          BBlog</n-p
        >
      </n-h1>
      <n-calendar
        class="calendar"
        :class="theme === 'white' ? 'whitecalendar' : 'darkcalendar'"
        v-model:value="value"
        #="{ year, month, date }"
        :is-date-disabled="isDateDisabled"
        @update:value="handleUpdateValue"
      >
        {{ year }}-{{ month }}-{{ date }}
      </n-calendar>
    </div>

    <div class="carsu">
      <n-h1 prefix="bar" align-text type="error">
        <n-text type="error" strong>Charts</n-text>
        <n-p>可能我这组建没有啥用,但是你也别叫,西沟🤪</n-p>
      </n-h1>
      <div class="content">
        <n-carousel
          direction="vertical"
          dot-placement="right"
          autoplay
          :interval="2500"
          trigger="hover"
          effect="fade"
          style="border-radius: 5px; width: 100%; height: 300px"
        >
          <n-image
            lazy
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
          />
          <n-image
            lazy
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
          />
          <n-image
            lazy
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
          />
          <n-image
            lazy
            class="carousel-img"
            src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
          />
        </n-carousel>
        <n-divider title-placement="right"
          >额,我承认没有啥用🥵,但你是真的西🐶</n-divider
        >
      </div>
    </div>

    <div class="footer">
      <div class="footerContain">
        <div class="left">
          <vue3-seamless-scroll
            singleLine
            :step="0.4"
            direction="right"
            :list="[1, 2, 3, 4]"
            class="leftscroll"
            :limitScrollNum="1"
          >
            <n-icon :component="Airplane20Filled" />
          </vue3-seamless-scroll>
          <div class="title">Collect and Save Inspirations</div>
          <div class="describ">
            Find inspiration has never been easier than it is now.
          </div>
          <n-button style="margin-top: 60px" size="large" type="info">
            Start exploring
          </n-button>
        </div>
        <div class="right" ref="loopRef">
          <vue3-seamless-scroll
            :step="0.4"
            ease="ease-in-out"
            v-for="el in 2"
            :key="el"
            :direction="el === 1 ? 'down' : 'up'"
            :list="imageList"
            class="scroll"
            hover
            :limitScrollNum="1"
          >
            <div class="item" v-for="item in imageList" :key="item.image">
              <n-image
                lazy
                style="pointer-events: none"
                width="120"
                :src="item.image"
              />
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.leftscroll {
  overflow: hidden;
}
.scroll {
  height: 400px;
  overflow: hidden;
}
.item {
  padding: 3px 0;
}
.footer {
  height: 400px;
  background: linear-gradient(180deg, #ddd6fe 0%, #a78bfa 100%);
  border-radius: 28px;
  margin-top: 150px;

  .footerContain {
    display: grid;
    grid-template-columns: auto auto;
    .left {
      padding-top: 130px;
      padding-left: 60px;
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 28px;
        line-height: 30px;
        color: #111827;
      }
      .describ {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #9e69aa;
        margin-top: 20px;
      }
    }
  }
}
.right {
  height: 100%;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-items: center;
  padding-right: 50px;
  justify-content: end;
  gap: 30px;
}
.FooterWrapper {
  margin-top: 150px;
  .FootContent {
    padding: 0 40px;
  }
  .whitedart {
    background: #c9d6ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      rgb(201, 214, 255),
      rgb(226, 226, 226)
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      rgb(201, 214, 255),
      rgb(226, 226, 226)
    );
    border-radius: 40px;
    padding: 0 100px;
    margin-top: 100px;
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.25),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
  }

  .chart {
    padding: 0 100px;
    margin-top: 100px;
    background: #667db6;
    background: -webkit-linear-gradient(
      to right,
      rgb(102, 125, 182),
      rgb(0, 130, 200),
      rgb(0, 130, 200),
      rgb(102, 125, 182)
    );
    background: linear-gradient(
      to right,
      rgb(102, 125, 182),
      rgb(0, 130, 200),
      rgb(0, 130, 200),
      rgb(102, 125, 182)
    );
    border-radius: 40px;
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.25),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
  }
  .chartContent {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    align-items: center;
  }
}

.descriptions {
  margin-top: 200px;

  .chartTxt {
    padding-right: 200px;
  }
  .calendar {
    padding: 50px 100px;
    backdrop-filter: blur(20px);
    border-radius: 60px;
    margin-top: 50px;
  }
  .darkcalendar {
    background: #485563;
    background: -webkit-linear-gradient(
      to right,
      rgb(72, 85, 99),
      rgb(41, 50, 60)
    );
    background: linear-gradient(to right, rgb(72, 85, 99), rgb(41, 50, 60));
  }
  .whitecalendar {
    background: #ece9e6;
    background: -webkit-linear-gradient(
      to right,
      rgb(236, 233, 230),
      rgb(255, 255, 255)
    );
    background: linear-gradient(
      to right,
      rgb(236, 233, 230),
      rgb(255, 255, 255)
    );
  }
}

.carsu {
  padding-top: 200px;

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.carousel-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
