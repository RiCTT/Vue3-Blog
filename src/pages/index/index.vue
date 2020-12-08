<template>
  <div>
    <div>
      计时器: {{ count }}
    </div>
    <div>
      内容：{{ book.title }}
      技术：{{ book.bookCount }}
    </div>
    <button @click="count += 1">+1</button>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUpdated, onUnmounted } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const book = reactive({ title: 'Vue book', bookCount: count })
    const handleClick = (e) => {
      count.value++
    }
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })

    return {
      count,
      book,
      handleClick
    }
  }
}
</script>

<style>

</style>