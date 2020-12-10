<template>
  <TwoColumnLayout>
    <template v-slot:left>
      <div class="content-wrapper">
        <div class="content-chunk">
          <h3>最新文章</h3>
          <ul class="list-wrapper">
            <li class="list-item">
              <span class="date">2020年11月27日 » </span>
              <a href="baidu.com">
                <span class="title">科技爱好者周刊（第 135 期）：什么行业适合创业？</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="content-chunk">
          <h3>一句话</h3>
          <ul class="list-wrapper">
            <li class="list-item">
              <span class="date">2020年11月27日 » </span>
              <a href="baidu.com">
                <span class="title">科技爱好者周刊（第 135 期）：什么行业适合创业？</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>12</div>
    </template>
    <template v-slot:right>
      <div class="right-wrapper"></div>
      <div>456</div>
    </template>
  </TwoColumnLayout>
  
</template>

<script>
import { ref, reactive, onMounted, onUpdated, onUnmounted, getCurrentInstance } from 'vue'
import TwoColumnLayout from '/@/layout/TwoColumnLayout.vue'
export default {
  components: {
    TwoColumnLayout
  },
  setup() {
    const ctx = getCurrentInstance()
    const count = ref(0)
    const articleList = ref([])
    const book = reactive({ title: 'Vue book', bookCount: count })
    const handleClick = (e) => {
      count.value++
    }
    
    onMounted(() => {
      console.log(ctx)
      console.log(ctx.$http)
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