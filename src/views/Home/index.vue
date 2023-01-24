<script setup>
import ContentCenter from './ContentCenter.vue'
import FootNavigation from './FootNavigation.vue'
import FooterContent from './FooterContent.vue'
</script>

<template>
  <div class="home">
    <ContentCenter />
    <FooterContent />
    <FootNavigation />
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 100px;
  padding-top: 200px;
  padding-bottom: 0;
}
</style>
