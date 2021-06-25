<!--
 * @Author: your name
 * @Date: 2021-06-20 14:46:29
 * @LastEditTime: 2021-06-24 15:57:09
 * @LastEditors: lunarJan
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
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
  name: 'Settings',
  data() {
    return {
        
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async updateUser() {
      const params = {}
      await updateUser(params)
    }
  }
}
</script>

<style></style>
