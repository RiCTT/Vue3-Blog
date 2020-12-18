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
    // TODO: 重新渲染的时候，instance也会被清空掉，新的节点是一个没有loading元素的
    // 后期参考一下其他实现or组件的形式
    // 或者Teleport
    if (!e.children?.length) return
    let index = e.children.length
    for (let i = 0; i < index; i++) {
      let child = e.children[i]
      if (child === instance) {
        e.removeChild(instance)
        break
      }
    }
  }
}



export default {
  beforeMount(e, binding) {
    e._flag = binding.value
    mountLoading(e, binding.value)
  },
  beforeUpdate(e, binding) {
    if (e._flag !== binding.value) {
      e._flag = binding.value
      mountLoading(e, binding.value)
    }
  },
}