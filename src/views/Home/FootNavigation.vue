<script setup>
import { ref } from 'vue'
import Icon from '@/components/svgcomponent/IconComponent.vue'

const description = ref(
  'All media, contents, articles and everything here are have copyright material and law.'
)
</script>

<template>
  <div class="footernav">
    <div class="footerCont">
      <div class="Bleft">
        <Icon :size="40" />
        <n-p>BBLOG | ✍🏻</n-p>
      </div>
      <div class="Bright">
        <div class="description">{{ description }}</div>
        <div class="auth">
          Copyright (c) 2023 by
          <a
            style="font-weight: 800"
            target="_blank"
            href="https://github.com/SMingC"
            >Seaming</a
          >
          87215099+SMingC@users.noreply.github.com, All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footernav {
  margin-top: 120px;
  height: 100%;
  background: #111827;
  border-radius: 32px 32px 0px 0px;
  padding-top: 64px;
  padding-left: 25px;
  .footerCont {
    display: grid;
    grid-template-columns: repeat(2, auto);
  }
  .Bleft {
    display: grid;
    grid-template-columns: repeat(2, auto);
    justify-items: start;
    align-items: center;
    justify-content: center;
    gap: 20px;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 26px;
      line-height: 32px;
      letter-spacing: 0.02em;
      background: linear-gradient(93.54deg, #3b82f6 9.03%, #d946ef 43.88%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
    }
  }
  .Bright {
    display: grid;
    grid-template-rows: repeat(2, auto);
    justify-items: start;
    gap: 30px;
    .description {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #f9fafb;
      width: 380px;
    }
    .auth {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #f9fafb;
    }
  }
}
</style>
