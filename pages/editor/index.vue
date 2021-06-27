<!--
 * @Author: your name
 * @Date: 2021-06-20 14:51:26
 * @LastEditTime: 2021-06-28 00:29:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/pages/article/index.vue
-->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model.trim="article.title"
                  :disabled="disableFlag"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model.trim="article.description"
                  :disabled="disableFlag"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model.trim="article.body"
                  :disabled="disableFlag"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model.trim="tag"
                  @keyup.enter="setTags(tag)"
                  :disabled="disableFlag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) in article.tagList"
                    :key="index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="createArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, getArticleDeatil } from '@/api/article'
export default {
  middleware: 'authenticated', // 在路由匹配组件渲染之前会先执行中间件处理，如果有多个中间件可以写成数组的形式
  name: 'ArticleIndex',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      slug: '',
      tag: '',
      disableFlag: false
    }
  },
  async created() {
    this.slug = this.$route.query.slug
    if (this.slug) {
      const { data } = await getArticleDeatil(this.slug)
      this.article = data.article
    }
  },
  methods: {
    setTags(tag) {
      tag && this.article.tagList.unshift(tag)
      this.article.tagList = new Set(this.article.tagList)
      this.tag = ''
    },
    removeTag(tag) {
      const index = this.article.tagList.findIndex(item => item === tag)
      this.article.tagList.splice(index, 1)
    },
    async createArticle() {
      let params = this.article
      let postArticle = createArticle
      if (this.slug) {
        params = {
          slug: this.slug,
          data: this.article
        }
        postArticle = updateArticle
      }
      this.disableFlag = true
      const { data } = await postArticle(params)
      this.disableFlag = false
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>

<style></style>
