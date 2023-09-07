import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const error = ref('')
const sub = ref('')
const res = ref('')


  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  function setError(err: any) {
    error.value = err;
  }

  function setSub(err: any) {
    sub.value = err;
  }

  function setRes(err: any) {
    res.value = err;
  }

  return { count, doubleCount, error, res, sub, increment, setError, setRes, setSub }
})
