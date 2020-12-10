import { http } from './axios.js'

/**
 * 这样用index的方法也有个不好的地方，如果只要main.js引用了这个包，所有的模块都被打包了
 */
// export default {
//   http
// }

// 不用default，外面可以直接解构的方式
export {
  http
}

// // 导入使用
// import Util from './index.js'
// const { http } = Util