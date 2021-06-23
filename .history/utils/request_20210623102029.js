/*
 * @Author: your name
 * @Date: 2021-06-20 15:18:39
 * @LastEditTime: 2021-06-23 10:20:29
 * @LastEditors: lunarJan
 * @Description: 基于axios封装的请求模块
 * @FilePath: /realworld-nuxtjs/utils/request.js
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 如果请求失败（此时请求还没有发出去）就会进入这里
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request
