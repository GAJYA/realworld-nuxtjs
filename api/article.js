/*
 * @Author: your name
 * @Date: 2021-06-20 20:23:41
 * @LastEditTime: 2021-06-24 15:13:27
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
        params
    })
}
// 点赞
export const setFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}
// 取消点赞
export const unFavorite  = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}
// 获取文章详情
export const getArticleDeatil  = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`,
    })
}
// 新增文章评论
export const addArticleComments  = ({slug, data}) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}
// 获取文章评论
export const getArticleComments  = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`,
    })
}