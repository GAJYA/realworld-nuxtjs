/*
 * @Author: your name
 * @Date: 2021-06-20 20:23:41
 * @LastEditTime: 2021-06-22 00:03:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/api/article.js
 */

import request from '@/utils/request';

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