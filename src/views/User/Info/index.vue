<script setup>
import { ref } from 'vue'
import InfoCard from './InfoCard.vue'
import { uploadFile } from '@/utils/firebase'

const fileRef = ref(null)
const textarea = ref('')

const changeFile = async () => {
  textarea.value = fileRef.value.files[0].name
  await uploadFile(fileRef.value.files[0])

  console.log(fileRef.value.files[0])
}

const openFile = () => fileRef.value.click()
</script>
<template>
  <div>
    <InfoCard />
    <n-input placeholder="choose a file" v-model:value="textarea" />
    <n-button @click="openFile">click me</n-button>
    <input
      type="file"
      name="filename"
      ref="fileRef"
      style="display: none"
      @change="changeFile"
    />
  </div>
</template>

<style lang="scss" scoped></style>
