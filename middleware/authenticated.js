/*
 * @Author: your name
 * @Date: 2021-06-20 20:00:24
 * @LastEditTime: 2021-06-20 20:04:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/middleware/authenticated.js
 */

export default function ({ store, redirect }) {
    if (!store.state.user) {
        redirect('/login');
    }
}