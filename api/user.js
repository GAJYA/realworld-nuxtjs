/*
 * @Author: your name
 * @Date: 2021-06-20 15:58:03
 * @LastEditTime: 2021-06-28 01:22:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/api/user.js
 */

import { request } from '@/plugins/request';

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}
// 用户更新信息
export const getUserDetail = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`,
    })
}
// 用户更新信息
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    })
}
// 关注用户
export const followUser = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`,
    })
}
// 取消关注用户
export const unfollowUser = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`,
    })
}