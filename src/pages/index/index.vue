<template>
  <TwoColumnLayout>
    <template v-slot:left>
      <div class="content-wrapper">
        <div class="content-chunk">
          <h3>最新文章</h3>
          <ul class="list-wrapper">
            <li class="list-item" v-for="(item, index) in state.list" :key="index">
              <span class="date">2020年11月27日 » </span>
              <a href="blog/123455">
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
              <a href="blog/123455">
                <span class="title">科技爱好者周刊（第 135 期）：什么行业适合创业？</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template v-slot:right>
      <div class="right-wrapper" v-loading="state.loading">
        <img class="avatar" src="https://user-gold-cdn.xitu.io/2020/7/29/1739834eca7a5b53?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" alt="avatar">
        <div class="info-wrapper">
          <h3>网络日志</h3>
          <ul class="info-list">
            <li class="info-item">
              <span class="icon"><i>icon</i></span>
              <span>xxxx.com</span>
            </li>
          </ul>
        </div>
      </div>
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
      list: [],
      loading: false
    })
    const refState = ref([])
    
    getList()
      .then(res => {
        state.loading = true
        state.list = res.data
        refState.value = res.data.concat(res.data)
      })
      .finally(() => {
        state.loading = false
      })

    return {
      state,
      getList,
      refState
    }
  }
}
</script>

<style lang="scss" scoped>

.right-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 15px;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .info-wrapper {
    width: 100%;
    margin-top: 20px;
  }
}

.info-list {
  .info-item {
    .icon {
      margin-right: 10px;
    }
  }
}
</style>