<!--
 * @Author: your name
 * @Date: 2021-06-20 14:46:29
 * @LastEditTime: 2021-06-28 01:31:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/settings/index.vue
-->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="users.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="users.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="users.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="users.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="users.password"
                />
              </fieldset>
              <button
                type="button"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="onUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
  name: 'Settings',
  data() {
    return {
      users: { password: '' }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    let { email, username, password, image, bio } = this.user
    this.users = Object.assign({}, this.users, {
      email,
      username,
      password,
      image,
      bio
    })
  },
  methods: {
    async onUser() {
      const { data } = await updateUser({
        user: this.users
      })
      this.$store.commit('setUser', data.user)
      this.$router.push({
        name: 'profile',
        params: {
          userId: data.user.username
        }
      })
    },
    // 退出登录
    logout() {
      // 清除vuex中的数据
      this.$store.commit('setUser', null)
      // 清除cookie
      Cookie.remove('user')
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
