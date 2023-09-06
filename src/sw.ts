import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import axios from 'axios'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

self.skipWaiting()
clientsClaim()

cleanupOutdatedCaches()

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  // eslint-disable-next-line no-useless-escape
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// saveSubscription saves the subscription to the backend
async function saveSubscription(subscription: PushSubscription) {
  const SERVER_URL = 'https://gregarious-dragon-2ecad7.netlify.app/api/save-subscription'

  const { data } = await axios.post(SERVER_URL, { subscription })

  return data
}

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  try {
    console.log('wtf asking perm')

    const applicationServerKey = urlB64ToUint8Array(
      'BHsJUwGqWFaA_Ubn62si146OwXNtzmMs8-RrsbODbih168vmFh1-rOAbxQGYWhZnQp1_ASgBrA9OW9U_VVqiJxY'
    )
    const options = { applicationServerKey, userVisibleOnly: true }

    console.log('subscribging')

    const subscription = await self.registration.pushManager.subscribe(options)

    console.log(JSON.stringify(subscription))

    const response = await saveSubscription(subscription)

    console.log(`RESPONsE`, response)
  } catch (err) {
    console.log('Error', err)
  }
})

function showLocalNotification(
  title: string,
  body: string,
  swRegistration: ServiceWorkerRegistration
) {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  }
  swRegistration.showNotification(title, options)
}

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Push event!! ', event.data.text())

    showLocalNotification('Yolo', event.data.text(), self.registration)
  } else {
    console.log('Push event but no data')
  }
})
