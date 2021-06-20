/*
 * @Author: your name
 * @Date: 2021-06-20 20:05:00
 * @LastEditTime: 2021-06-20 20:09:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/middleware/noAuthenticated.js
 */
export default function ({ store, redirect }) {
    if (store.state.user) {
        redirect('/');
    }
}