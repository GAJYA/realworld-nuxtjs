<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
                    name: 'profile',
                    params: {
                      userId: comment.author.username
                    }
                  }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
                    name: 'profile',
                    params: {
                      userId: comment.author.username
                    }
                  }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments } from '@/api/article'
export default {
  name: 'ArticleComments',
  props: ['article'],
  data() {
    return {
      comments: [] // 文章评论
    }
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  }
}
</script>

<style></style>
