<template>
  <TwoColumnLayout>
    <template v-slot:left>
      <div class="content-wrapper">
        <div class="content-chunk">
          <h3>最新文章</h3>
          <ul class="list-wrapper">
            <li class="list-item" v-for="(item, index) in state.list" :key="index">
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
            <li class="list-item"  v-for="(item, index) in refState" :key="index">
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
import { ref, reactive, onMounted, onUpdated, onUnmounted } from 'vue'
import TwoColumnLayout from '/@/layout/TwoColumnLayout.vue'
import { getList, getComment } from '/api/blog'
export default {
  components: {
    TwoColumnLayout
  },
  setup() {
    const state = reactive({
      list: []
    })
    const refState = ref([])
    
    getList()
      .then(res => {
        state.list = res.data
        refState.value = res.data.concat(res.data)
      })
    return {
      state,
      getList,
      refState
    }
  }
}
</script>

<style>

</style>