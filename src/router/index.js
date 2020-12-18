import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '/@/pages/index/index.vue'
import NotFound from '/@/pages/404/404.vue'
import BlogPage from '/@/pages/blog/blog.vue'
import CreateBlogPage from '/@/pages/create-blog/create-blog.vue'

const routes = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/blog',
    component: CreateBlogPage,
  },
  {
    path: '/blog/:id',
    component: BlogPage
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