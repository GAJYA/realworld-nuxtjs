/*
 * @Author: your name
 * @Date: 2021-06-20 20:23:41
 * @LastEditTime: 2021-06-20 20:25:53
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