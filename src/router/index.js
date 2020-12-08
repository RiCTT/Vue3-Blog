import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '/@/pages/index/index.vue'
import NotFound from '/@/pages/404/404.vue'
import DetailPage from '/@/pages/detail/detail.vue'

const routes = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/detail/:id',
    component: DetailPage
  },
  {
    path: '/:catchAll(.*)*', // Todo： router3使用通用匹配的规则变了，不能直接*，文档看不懂..
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router