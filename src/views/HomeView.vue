<template>
  <div class="row justify-center">
    <div class="col-auto">
      <h1>Sample App</h1>

      <h3>AFTER ASKING HELLO {{ str }}</h3>

      <q-file outlined v-model="model" label="Outlined" />

      <q-btn @click="requestNotificationPermission()"> allow </q-btn>

      <h4>permission {{ permission }}</h4>
      <h6>err {{ error ? error : '' }}</h6>
      <h6>sub {{ sub ? sub : '' }}</h6>
      <h6>res {{ res ? res : '' }}</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'

const str = ref('')
const permission = ref('')
const model= ref(null)

const { error, res, sub } = storeToRefs(useCounterStore())

onMounted(async () => {
  try {
    const resp = await axios.get('https://imaginative-moonbeam-04f17a.netlify.app/api/hello')

    console.log('from comp', resp.data)

    str.value = resp.data

    permission.value = window.Notification.permission
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

  ;(await navigator.serviceWorker.ready).showNotification('test', { body: 'test' })
}
</script>
