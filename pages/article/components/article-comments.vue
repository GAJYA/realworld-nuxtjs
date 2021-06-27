<!--
 * @Author: your name
 * @Date: 2021-06-27 14:10:57
 * @LastEditTime: 2021-06-28 01:29:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/article/components/article-comments.vue
-->
<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              userId: comment.author.username
            }
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              userId: comment.author.username
            }
          }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.createdAt | date('MMM DD, YYYY')
        }}</span>
        <span
          class="mod-options"
          v-show="user.username === comment.author.username"
        >
          <i class="ion-trash-a" @click="deleteCb(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, deleteArticleComments } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComments',
  props: ['article'],
  data() {
    return {
      comments: [] // 文章评论
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async deleteCb(id) {
      await deleteArticleComments(this.article.slug, id)
      const index = this.comments.findIndex(comment => comment.id === id)
      this.comments.splice(index, 1)
    }
  }
}
</script>

<style></style>
