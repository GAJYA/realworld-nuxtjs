/*
 * @Author: your name
 * @Date: 2021-06-20 15:58:03
 * @LastEditTime: 2021-06-24 15:48:54
 * @LastEditors: lunarJan
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
export const updateUser = data => {
    return request({
        method: 'PUT',
        url: '/api/users',
        data
    })
}