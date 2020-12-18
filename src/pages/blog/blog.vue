<template>
  <div class="blog-wrapper" v-loading="loading">
    <h3 class="blog-title">{{detail.title}}</h3>
    <div>{{detail.content}}</div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogDetail } from '/@/api/blog'

export default {
  setup() {
    let route = useRoute()
    let router = useRouter()
    let blogId = computed(() => route?.params?.id)
    let state = reactive({
      loading: false,
      detail: {}
    })

    state.loading = true
    getBlogDetail({ id: blogId.value })
      .then(res => {
        console.log(res)
        state.detail = res.data
      })
      .finally(() => {
        setTimeout(() => {
          state.loading = false
        }, 1000)
      })

    console.log(state)

    return {
      blogId,
      // 通过toRefs去解构响应式对象
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.blog-wrapper {
  padding: 10px;
  background-color: #fff;
  border-radius: var(--common-radius);
  min-height: 1000px;
}

.blog-title {
  border-left: 4px solid skyblue;
  padding: 6px;
  margin: 10px 0;
}
</style>