# Util文件夹说明

  - index.js统一加载导出文件夹下的模块
  
  ```js
  // 模块内部统一用export const xxx = xxx
  // ./axios.js
  export const http = axios.create({})

  // index.js导入导出
  // 后续维护如果需要导出别名，只需要在index.js下修改即可
  import { http } from './axios.js'
  export default {
    http
  }

  // 引用utils的模块
  import Utils from '/@/utils/index'
  // 备注：import * as name from 'xxx' 这两种方式的东西不一样的
  const { http } = Utils
  app.use(http)
  ```