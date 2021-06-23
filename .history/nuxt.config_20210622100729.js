export default {
  server: {
    port: 3001 // 默认: 3000
  },
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 第一次设置nuxt.config.js文件后，需要重启项目，否则新设置的路由不起作用
      // 清除nuxt.js基于pages目录默认生成的路由表规则
      routes.splice(0)
      // 重新添加路由规则
      routes.push(
        ...[
          {
            path: '/', // 此时默认的加载页面就是layout
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '', // 默认子路由
                name: 'home',
                component: resolve(__dirname, 'pages/home/')
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/')
              },
              {
                path: '/profile/:userId',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/')
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/')
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/')
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/')
              }
            ]
          }
        ]
      )
      // routes.push({
      //   name: 'custom',
      //   path: '*',
      // })
    }
  }
}
