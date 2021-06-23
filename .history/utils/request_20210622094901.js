/*
 * @Author: your name
 * @Date: 2021-06-20 15:18:39
 * @LastEditTime: 2021-06-20 15:33:01
 * @LastEditors: Please set LastEditors
 * @Description: 基于axios封装的请求模块
 * @FilePath: /realworld-nuxtjs/utils/request.js
 */
import axios from "axios"

const request = axios.create({
    baseURL: "https://conduit.productionready.io"
})
// 请求拦截器

// 响应拦截器

export default request