<!--
 * @Author: your name
 * @Date: 2021-06-19 15:14:49
 * @LastEditTime: 2021-06-27 16:23:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/home/index.vue
-->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link disabled"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tags' }"
                  :to="{ name: 'home', query: { tag: tag, tab: 'tags' } }"
                  exact
                  >{{ tag }}</nuxt-link
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
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                v-for="item in totalPage"
                :key="item"
                class="page-item"
                :class="{ active: page === item }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
                      tab: tab
                    }
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
              <li class="page-item"></li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    page: page,
                    tag: item,
                    tab: 'tags'
                  }
                }"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getTags,
  getFeedArticles,
  setFavorite,
  unFavorite
} from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    const page = Number(query.page || 1)
    const { tag } = query
    const tab = query.tab || 'global_feed'
    const limit = 20
    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * 2 //跳过前xxx条取数据
    // })
    // const { data: tagData } = await getTags()
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * 2, //跳过前xxx条取数据
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    let { tags } = tagRes.data
    // console.log('encodeURI', encodeURI(tags[0]))
    const xx = decodeURI('%E2%80%8C')
    const reg = new RegExp(xx, 'g')
    tags = tags.map(tag => tag.replace(reg, '')).filter(tag => tag.length)
    // 去重
    tags = new Set(tags)
    // console.log('tags-----', tags)
    articles.forEach(article => {
        article.loadingArticle = false
    })
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
      async onFavorite (article) {
          article.loadingArticle = true
          console.log(article);
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
      }
  }
}
</script>

<style></style>
