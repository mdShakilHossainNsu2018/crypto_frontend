<template>
  <div>
  <v-container>
    <!--  fetch category view  -->
    <!--  create categories  -->
    <!--  select category  -->
    <!--  create mark down view  -->
    <!--  create photo upload  -->
    <!--  create title  -->
    <!--  finally upload   -->

    <div v-if="isStaff">

      <v-text-field v-model="title" placeholder="Enter title here..."></v-text-field>

      <v-select
          v-model="value"
          :items="categories"
          attach
          chips
          label="Select Categories..."
          multiple
      ></v-select>

      <v-file-input
          label="Upload Title Image"
          filled
          v-model="image"
          prepend-icon="mdi-camera"
      ></v-file-input>
      <vue-simplemde v-model="content" ref="markdownEditor"/>
      <v-btn @click="submit">Submit</v-btn>

    </div>

    <div class="d-flex  align-content-start flex-wrap">
      <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
          min-width="350"
          v-for="blog in getBlogs"
          :key="blog.id"
          :to="{name: 'BlogDetail', params: {blogId: blog.id , blogTitle: blog.title}}"
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

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Blog Category</v-card-title>

        <v-card-text>
<!--          <v-chip-group-->
<!--              v-model="selection"-->
<!--              active-class="deep-purple accent-4 white&#45;&#45;text"-->
<!--              column-->
<!--          >-->
            <v-chip class="pa-3 ma-1" color="primary" v-for="category in blog.category" :key="category.id">{{category.category}}</v-chip>

<!--            <v-chip>7:30PM</v-chip>-->

<!--            <v-chip>8:00PM</v-chip>-->

<!--            <v-chip>9:00PM</v-chip>-->
<!--          </v-chip-group>-->
          <p>{{timeConverter(blog.created_at)}}</p>
        </v-card-text>

<!--        <v-card-actions>-->
<!--          <v-btn-->
<!--              color="deep-purple lighten-2"-->
<!--              text-->
<!--              @click="reserve"-->
<!--          >-->
<!--            Reserve-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
      </v-card>
    </div>


    <!--    ...mapGetters('loadingState', [ 'getLoadingState']),-->

    <v-overlay
        :value="getLoadingState"
    >
      <v-progress-circular
          indeterminate
          size="80"
      >
        Loading...
      </v-progress-circular>
    </v-overlay>

  </v-container>
    <Footer/>
  </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";
import {mapActions, mapGetters} from "vuex";
import marked from 'marked';
import moment from 'moment';
import Footer from "@/components/Footer";

export default {
  name: "Blog",

  components: {
    VueSimplemde,
    Footer,
  },

  mounted() {
    this.setLoadingState(true);
    this.fetchCategories();
    this.fetchBlog();
    this.setLoadingState(false);
  },
  data() {
    return {
      content: "",
      title: "",
      items: [],
      value: [],
      selectedCategory: [],
      formData: new FormData(),
      image: null,
      loading: false,
      selection: 1,
    }
  },

  methods: {
    ...mapActions('user', ['setSnackBarData']),
    ...mapActions('blog', ['setBlog', 'setCategories']),

    ...mapActions('loadingState', ['setLoadingState']),


    fetchBlog(){
      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'blog/',).then(res=> {
        console.log(res)
        this.setBlog(res.data)
      }).catch(err => {
        if (err.response){
          this.setSnackBarData(err.response)
          this.setSnackBarState(true)
          // this.$store.commit('user/SET_SNACK_BAR_DATA', err.response)
          // this.$store.commit('user/SET_SNACK_BAR_STATE', true)
        }
        console.log(err.response)
      }).finally(() => {
        this.setLoadingState(false)
      })
    },


    postBlog(data){
      this.$axios.post(this.getBaseUrl + 'blog/', data, {
        headers: {
          // "Content-Type": "ma",
        }
      }).then(res=> {
        console.log(res)
      }).catch(err => {

        if (err.response){
          this.setSnackBarData(err.response)
          this.setSnackBarState(true)
        }

        console.log(err.response)
      })
    },


    fetchCategories(){
      this.$axios.get(this.baseUrl +  'blog/category/').then(res=> {
        console.log(res)

        this.setCategories(res.data)
        // state.categories = res.data;
      }).catch(err => {

        if (err.response){
          this.setSnackBarData(err.response)
          this.setSnackBarState(true)
        }

        console.log(err.response)
      })
    },


    // ...mapMutations('loadingState/SET_LOADING'),

    markedConverter(text){
      return marked(text)
    },

    timeConverter(time){
      return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    },

    submit() {

      this.setLoadingState(true);


      Object.entries(this.getCategories).forEach(([key, value]) => {
        console.log("key", key, "Value", value.category)
        if (this.value.includes(value.category)) {
          // console.log(value)
          this.selectedCategory.push({id: value.id})
        }
      })
      console.log("selected: ",this.selectedCategory)




      this.formData.append("title", this.title)
      // this.formData.append("category", [{"pk": 1}, {"pk": 2}])
      // this.selectedCategory.forEach(item => {
      //   // console.log(item);
      //   this.formData.append("category", item)
      // })

      this.formData.append('category', JSON.stringify(this.selectedCategory))

      console.log(this.selectedCategory)
      this.formData.append("image", this.image)
      this.formData.append("content", this.content)

      this.postBlog(this.formData)

      this.selectedCategory = []
      //
      this.formData = new FormData()
      this.setLoadingState(false);
      window.location.reload();
    }
  },

  computed: {
    ...mapGetters('blog', ['getCategories', 'getBlogs']),
    ...mapGetters('user', ['isStaff']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', [ 'getLoadingState']),

    categories() {
      const data = []
      // console.log("Categories",this.getCategories.length)
      for (let i = 0; i < this.getCategories.length; i++) {
        data[i] = this.getCategories[i].category
      }
      return data;
    },
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

</style>