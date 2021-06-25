<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>

        <ArticleMeta :article="article"></ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article"></ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model.trim="comment"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                required
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="user.image"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary" @click="addComments">
                Post Comment
              </button>
            </div>
          </form>
          <ArticleComments :article="article"></ArticleComments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDeatil, addArticleComments } from '@/api/article'
import { mapState } from 'vuex'
import MarkdownIt from 'markdown-it'
export default {
  middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
  name: 'EditorIndex',
  components: {
    ArticleMeta: () => import('./components/article-meta.vue'),
    ArticleComments: () => import('./components/article-comments.vue')
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {
      ...mapState(['user'])
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    const slug = params.slug
    const { data } = await getArticleDeatil(slug)
    //   console.log(data);
    const { article } = data
    const md = new MarkdownIt()
    const body = md.render(article.body)
    return {
      article,
      body
    }
  },
  methods: {
    async addComments() {
      if (!this.comment) return
      const params = {
        slug: this.article.slug,
        data: {
          comment: {
            body: this.comment
          }
        }
      }
      const { data } = await addArticleComments(params)
    }
  }
}
</script>

<style></style>
