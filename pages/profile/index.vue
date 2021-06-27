<!--
 * @Author: your name
 * @Date: 2021-06-20 14:43:21
 * @LastEditTime: 2021-06-28 01:19:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/profile/index.vue
-->
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="profile.username !== user.username"
              @click="onFollow(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
              {{ profile.username }}
            </button>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link disabled"
                  :class="{ active: tab === 'my' }"
                  :to="{
                    name: 'profile',
                    params: {
                      userId: profile.username,
                      tab: 'my'
                    }
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'favorite' }"
                  :to="{
                    name: 'profile',
                    params: {
                      userId: profile.username
                    },
                    query: {
                      tab: 'favorite'
                    }
                  }"
                  exact
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    userId: article.author.username
                  }
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      userId: article.author.username
                    }
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date('MMM DD, YYYY')
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
                :disabled="article.loadingArticle"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              href=""
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, setFavorite, unFavorite } from '@/api/article'
import { getUserDetail, followUser, unfollowUser } from '@/api/user'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
  name: 'UserProfile',
  watchQuery: ['tab'],
  computed: {
    ...mapState(['user'])
  },
  async asyncData({ params, query }) {
    const { userId } = params
    const tab = query.tab || 'my'
    let param = { author: userId }
    if (tab === 'favorite') {
      param.favorited = userId
    }
    const { data: userData } = await getUserDetail(userId)
    const { profile } = userData
    const { data } = await getArticles(param)
    const { articles, articlesCount } = data
    articles.forEach(article => {
      article.loadingArticle = false
    })
    return {
      articles,
      articlesCount,
      tab,
      profile
    }
  },
  methods: {
    // 点赞/取消点赞
    async onFavorite(article) {
      article.loadingArticle = true
      console.log(article)
      if (article.favorited) {
        await unFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await setFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.loadingArticle = false
    },
    // 关注/取消关注
    async onFollow(userInfo) {
      if (userInfo.username === this.user.username) return
      if (userInfo.following) {
        await unfollowUser(userInfo.username)
        userInfo.following = false
      } else {
        await followUser(userInfo.username)
        userInfo.following = true
      }
    }
  }
}
</script>

<style></style>
