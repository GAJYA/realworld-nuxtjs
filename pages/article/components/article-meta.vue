<!--
 * @Author: your name
 * @Date: 2021-06-27 14:10:57
 * @LastEditTime: 2021-06-27 23:29:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/article/components/article-meta.vue
-->
<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          userId: article.author.username
        }
      }"
      ><img :src="article.author.image" />
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
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="article.author.username !== user.username">
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp; Follow {{ article.author.username }}
        <span class="counter">({{ Number(article.author.following) }})</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
    <template v-else>
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor',
          query: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button
        class="btn btn-outline-danger btn-sm"
        @click="deleteArticle()"
        :class="{ disabled: isDeleted }"
        :disabled="isDeleted"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleMeta',
  props: ['article'],
  data() {
    return {
      isDeleted: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async deleteArticle() {
      this.isDeleted = false
      await deleteArticle(this.article.slug)
      this.isDeleted = true
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
