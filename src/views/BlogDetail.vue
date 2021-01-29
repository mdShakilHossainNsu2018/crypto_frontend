<template>
  <div>


  <v-container>

    <v-card
        :loading="loading"
        class="mx-auto my-12"
        v-for="blog in getBlogs"
        :key="blog.id"
    >
      <template slot="progress">
        <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
        ></v-progress-linear>
      </template>

      <v-img
          height="250"
          :src="blog.image"
      ></v-img>

      <v-card-title>Blog Category</v-card-title>

      <v-card-text>

        <v-chip class="px-3 mx-1" color="primary" v-for="category in blog.category" :key="category.id">{{category.category}}</v-chip>

        <p>{{timeConverter(blog.created_at)}}</p>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>

      <v-card-title> <h1>{{blog.title}}</h1></v-card-title>

      <v-card-text>
        <!--          <v-row-->
        <!--              align="center"-->
        <!--              class="mx-0"-->
        <!--          >-->
        <!--            <v-rating-->
        <!--                :value="4.5"-->
        <!--                color="amber"-->
        <!--                dense-->
        <!--                half-increments-->
        <!--                readonly-->
        <!--                size="14"-->
        <!--            ></v-rating>-->

        <!--            <div class="grey&#45;&#45;text ml-4">-->
        <!--              4.5 (413)-->
        <!--            </div>-->
        <!--          </v-row>-->

        <!--          <div class="my-4 subtitle-1">-->
        <!--            $ • Italian, Cafe-->
        <!--          </div>-->

        <div v-html="markedConverter(blog.content)"></div>
      </v-card-text>




    </v-card>

  </v-container>
<Footer/>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import marked from 'marked';
import moment from 'moment';
import Footer from '@/components/Footer.vue'

export default {
  name: "BlogDetail",

  components: {
    Footer,
  },

  data() {
    return {
      blogId: this.$route.params.blogId,
      blog: [],
      loading: false,

    }
  },

  mounted() {

    this.getBlog()
  },

  methods: {
    ...mapActions('loadingState', ['setLoadingState']),
    getBlog(){
      this.getBlogs.forEach(blog => {
        if (this.blogId === blog.id){
          this.blog = blog
        }
      })
    },
    markedConverter(text){
      return marked(text)
    },

    timeConverter(time){
      return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    },
  },

  computed: {
    ...mapGetters('blog', ['getBlogs'])
  }
}
</script>

<style scoped>

</style>