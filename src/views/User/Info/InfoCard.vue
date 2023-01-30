<script setup>
import { auth } from '@/utils/firebase'
import { useDateFormat } from '@vueuse/core'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const { currentUser } = auth
const qrcode = useQRCode('你扫你码呢')

const createTime = useDateFormat(
  JSON.parse(currentUser.metadata.createdAt) + 2000,
  'YYYY-MM-DD HH:mm'
)
</script>

<template>
  <div class="a">
    <div class="b">
      <a href="#"
        >你好👋 <br />{{ currentUser.displayName || currentUser.email }}</a
      >
      <h2>Welcome !!!</h2>
      <span
        >上次登录时间:{{ createTime }} <br />lastSignInTime:{{
          currentUser.metadata.lastSignInTime
        }}
        <br />提供方:{{ currentUser.providerId }}</span
      >
    </div>
    <div class="c">
      <!-- --i是用来计算平面圆柱的动效延迟和距离的
            --w则是用来计算平面圆柱的宽度 -->
      <div class="d" style="--i: 1; --w: 1.5"></div>
      <div class="d" style="--i: 2; --w: 1.6"></div>
      <div class="d" style="--i: 3; --w: 1.4"></div>
      <div class="d" style="--i: 4; --w: 1.7"></div>
      <div class="e" style="--i: 1"></div>
    </div>
    <!-- 设置二维码 -->
    <div class="f">
      <img :src="qrcode" alt="QR Code" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.a {
  position: relative;
  height: 400px;
  border: #fff 10px solid;
  background-color: rgb(120, 140, 200);
  border-radius: 20px;
  overflow: hidden;
}
.b {
  position: absolute;
  width: 400px;
  height: 300px;
  left: 0;
  margin: 75px 50px;
  transition: 1s;
}
.b a {
  text-decoration: none;
  color: #fff;
  font: 900 28px '';
}
.b h2 {
  /* 鼠标放开时的动画，第一个值是动画的过渡时间
            第二个值是延迟一秒后执行动画 */
  transition: 0.5s 1s;
  opacity: 0;
  color: rgb(30, 210, 200);
}
.b span {
  transition: 0.5s 1s;
  color: #fff;
  font: 500 15px '';
  position: absolute;
  top: 70px;
  line-height: 30px;
  padding-top: 40px;
}
.c {
  position: absolute;
  top: -130px;
  right: -240px;
}
.d,
.e {
  position: absolute;
  right: calc(var(--i) * 100px);
  width: calc(var(--w) * 40px);
  height: 500px;
  overflow: hidden;
  border-radius: 100px;
  transform: rotateZ(220deg) translate(0, 0);
  background: rgb(240, 220, 150);
  transition: 0.5s 0.5s;
}
.d:nth-child(2) {
  background: rgb(240, 190, 230);
}
.e {
  left: -470px;
  top: -140px;
  width: 70px;
  background-color: rgb(90, 220, 150);
}
.a:hover .c div {
  /* 设置延迟动画 */
  transition: 0.5s calc(var(--i) * 0.1s);
  /* 移动的轨迹 */
  transform: rotateZ(220deg) translate(-200px, 400px);
}
.a:hover .b {
  transition: 1s 0.5s;
  left: 300px;
}
.a:hover .b span {
  transition: 1s 0.5s;
  top: 105px;
}
.a:hover .b h2 {
  transition: 1s 0.5s;
  opacity: 1;
}
.f {
  width: 250px;
  height: 250px;
  position: absolute;
  background-size: cover;
  margin: 80px;
  opacity: 0;
  transition: 0.5s;
}
.a:hover .f {
  transition: 1s 1.3s;
  opacity: 1;
}
</style>
