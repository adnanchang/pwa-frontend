<template>
  <div class="row justify-center">
    <div class="col-auto">
      <h1>Sample App</h1>

      <!-- {{ onOpen }}

      <div class="row">
        {{ onMessage }}
      </div>

      <div class="row">
        ERRPR: {{ onError }}
      </div>

      <div class="row">
        ONCLOSE: {{ onClose }}
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

// const socket = new WebSocket('ws://10.11.0.4:8008/stream?token=CV2JpY6mfQRFpcu')

// const onOpen = ref('')
// const onMessage = ref('')
// const onClose = ref('')
// const onError = ref()

// socket.onopen = (ev) => {
//     console.log('i am connected from public fold', ev)

//     onOpen.value = 'connected to socket' + ev;
// }

// socket.onmessage = (ev) => {
//     console.log(ev)
//     const data = JSON.parse(ev.data)

//     onMessage.value = ev.data
// }

// socket.onerror = (error) => {
//   console.error(error)
//   onError.value = JSON.stringify(error);
// }

// socket.onclose = (ev) => {
//   console.log(ev)
//   onClose.value = JSON.stringify(ev)
// }
onMounted(async () => {
  try {
    const res = await axios.get('https://localhost:8443/')

    console.log('from comp', res.data)
  } catch (error) {
    console.error(error)
  }
})
</script>
