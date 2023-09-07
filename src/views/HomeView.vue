<template>
  <div class="row justify-center">
    <div class="col-auto">
      <h1>Sample App</h1>

      <h3>AFTER ASKING HELLO {{ str }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
const str = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('https://imaginative-moonbeam-04f17a.netlify.app/api/hello')

    console.log('from comp', res.data)

    str.value = res.data
  } catch (error) {
    console.error(error)
  }
})
</script>
