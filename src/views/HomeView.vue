<template>
  <div class="row justify-center">
    <div class="col-auto">
      <h1>Sample App</h1>

      <h3>AFTER ASKING HELLO {{ str }}</h3>

      <q-btn @click="requestNotificationPermission()">
        allow
      </q-btn>

      <h4>permission {{ permission }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
const str = ref('')
const permission = ref('')
onMounted(async () => {
  try {
    const res = await axios.get('https://imaginative-moonbeam-04f17a.netlify.app/api/hello')

    console.log('from comp', res.data)

    str.value = res.data
  } catch (error) {
    console.error(error)
  }
})

async function requestNotificationPermission() {
  permission.value = await window.Notification.requestPermission()
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission.value !== 'granted') {
    throw new Error('Permission not granted for Notification')
  }
}
</script>
