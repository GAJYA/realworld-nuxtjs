/*
 * @Author: your name
 * @Date: 2021-06-20 18:02:21
 * @LastEditTime: 2021-06-28 15:53:11
 * @LastEditors: lunarJan
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/store/index.js
 */
const cookieParser  = process.server ? require('cookieparser') : undefined;
// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必把state定义成一个函数，返回数据对象
export const state = () => {
    return {
        user: null, // 当前登录用户的登录状态
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}

export const actions = {
    // nuxt中特殊的action方法
    // 在服务端渲染期间自动调研
    // 作用：初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        // 如果请求头中有cookie
        if (req.headers.cookie) {
            // 拿到的cookie都是字符串
            const parsed = cookieParser.parse(req.headers.cookie)
            // cookie格式不对的时候走catch
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
                
            }
        }
        // 提交mutation修改state状态
        commit('setUser', user)
      }
}