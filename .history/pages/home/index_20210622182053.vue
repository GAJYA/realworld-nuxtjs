<!--
 * @Author: your name
 * @Date: 2021-06-19 15:14:49
 * @LastEditTime: 2021-06-22 18:20:53
 * @LastEditors: lunarJan
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
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
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
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
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
                      tag: $route.query.tag
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
                to="{
                    name: 'home',
                    query: {
                      tag: item
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
import { getArticles, getTags } from '@/api/article'
export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag'],
  async asyncData({ query }) {
    const page = Number(query.page || 1)
    const tag = Number(query.tag || '')
    const limit = 20
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * 2 //跳过前xxx条取数据
    // })
    // const { data: tagData } = await getTags()
    // 优化成并行异步任务
    // 相对情况来讲并行一般速度优于串行，当有多个连续的异步操作，且他们之间没有依赖可以优化成并行
    const [articlesRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * 2, //跳过前xxx条取数据
        tag
      }),
      getTags()
    ])

    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagRes.data
    
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
}
</script>

<style></style>
