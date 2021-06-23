/*
 * @Author: your name
 * @Date: 2021-06-20 20:23:41
 * @LastEditTime: 2021-06-23 11:27:17
 * @LastEditors: lunarJan
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/api/article.js
 */

// import request from '@/utils/request';
import { request } from '@/plugins/request';

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}
// 获取标签列表
export const getTags = params => {
    return request({
        method: 'GET',
        url: '/api/tags',
        params
    })
}

// 获取关注的文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        headers: {
            Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTc2OTYzLCJ1c2VybmFtZSI6Ikx1bmEiLCJleHAiOjE2MjkzNzUxNjd9.AgMwxlw8PxyOYs4f_U_CpOYqwUolh526Ou5uYHi5Scg`

        },
        params
    })
}