/*
 * @Author: your name
 * @Date: 2021-06-20 15:18:39
 * @LastEditTime: 2021-06-23 10:31:26
 * @LastEditors: lunarJan
 * @Description: 基于axios封装的请求模块
 * @FilePath: /realworld-nuxtjs/utils/request.js
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})
// 请求拦截器
// 任何请求都要经过请求拦截器
// 我们可以在请求拦截器中做一些公关的业务处理，例如统一设置token
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 请求会经过这里
    // 设置token
    config.headers.Authorization = `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc2OTYzLCJ1c2VybmFtZSI6Ikx1bmEiLCJleHAiOjE2MjkzNzUxNjd9.AgMwxlw8PxyOYs4f_U_CpOYqwUolh526Ou5uYHi5Scg`
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
