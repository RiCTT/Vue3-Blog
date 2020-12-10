# Vue3初体验

  刚开始纠结使用vite还是webpack其实是很纠结的，这过程多了其他的学习成本；

## 项目介绍

  - 搭建了本地mock服务，实现前后端分离
  - 采用了css3的var变量，共享通用的样式（后续可以一键换肤
  - i18n，通过爬虫生成language文件，根据环境切换语言（生产不建议，玩玩即可）


## Mock说明

  xxx
  ```js
    // 根据路由访问mock下对应的js文件
    // 下面的代码访问mock/blog.js中的list变量
    this.$http.get('/mock/blog/list')
  ```

## Util文件夹说明

  - index.js统一加载导出文件夹下的模块
  
  ```js
  // 模块内部统一用export const xxx = xxx 或者 export {}
  // ./axios.js
  export const http = axios.create({})

  // index.js导入导出
  // 后续维护如果需要导出别名，只需要在index.js下修改即可
  import { http } from './axios.js'
  export {
    http
  }

  // 引用utils的模块
  import { http } from '/@/utils/index'
  // 备注：import * as name from 'xxx' 这两种方式的东西不一样的
  app.use(http)
  ```

## setup

  综合看了ref、reactive一些api的介绍，写了计数器的demo，感觉还是有点略爽的，一下子抵消了配置vite时的各种负面情绪
