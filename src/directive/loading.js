import { createApp, h, ref } from 'Vue'
import Loading from '/@/components/Loading.vue'

// 1、通过模板创建一个虚拟节点
const vm = createApp(Loading)
// 2、通过render函数创建
// const app = createApp({
//   setup(props) {
//     const flag = ref(false)
//     return flag
//   },
//   render() {
//     return h()
//   }
// })

// 复用全局唯一的一个节点
let instance 
let mountLoading = (e, value) => {
  if (value) {
    if (!instance) {
      // 强制父级元素加上定位，配置loading组件的绝对定位
      e.style.position = 'relative'
      let dom = document.createElement('div')
      vm.mount(dom)
      dom = dom.children[0]
      instance = dom
    }
    e.appendChild(instance)
  } else if (!value && instance) {
    e.removeChild(instance)
  }
}


export default {
  beforeMount(e, binding) {
    mountLoading(e, binding.value)
  },
  beforeUpdate(e, binding) {
    mountLoading(e, binding.value)
  },
}