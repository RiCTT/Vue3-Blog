import axios from 'axios'

const instance = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
})

// 请求拦截，记得返回配置/结果
instance.interceptors.request.use((config) => {
  return config
})

// 响应拦截
instance.interceptors.response.use((response) => {
  // 模拟loading
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!response || response.data.code !== 200) {
        console.infn('错误：服务器出现错误...')
      }
      resolve(response.data)
    }, 500)
  })
})

/**
 * 
 * @param {String} method 请求方法
 * @param {String} url 请求地址
 * @param {*} params 请求查询参数
 * @param {*} data 请求携带数据
 * @param {*} config 配置
 */
export const http = (method, url, params, data, config = {}) => {
  return instance({
    method,
    url,
    params,
    data,
    ...config
  })
}
