/*
 * @Author: your name
 * @Date: 2021-06-20 15:58:03
 * @LastEditTime: 2021-06-20 16:01:33
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