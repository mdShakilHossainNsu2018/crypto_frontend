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

    <div>
      <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="374"
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
    this.fetchCategories();
    this.fetchBlog();
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
    ...mapActions('blog', ['fetchCategories', 'postBlog', 'fetchBlog']),

    markedConverter(text){
      return marked(text)
    },

    timeConverter(time){
      return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    },

    submit() {
      Object.entries(this.getCategories).forEach(([key, value]) => {
        console.log("key", key, "Value", value.category)
        if (this.value.includes(value.category)) {
          this.selectedCategory.push(value.id)
        }
      })

      this.formData.append("title", this.title)
      // this.formData.append("category", [{"pk": 1}, {"pk": 2}])
      this.selectedCategory.forEach(item => {
        this.formData.append("category", item)
      })

      console.log(this.selectedCategory)
      this.formData.append("image", this.image)
      this.formData.append("content", this.content)

      this.postBlog(this.formData)

      this.formData = new FormData()

    }
  },

  computed: {
    ...mapGetters('blog', ['getCategories', 'getBlogs']),
    ...mapGetters('user', ['isStaff']),
    categories() {
      const data = []
      // console.log("Categories",this.getCategories.length)
      for (let i = 0; i < this.getCategories.length; i++) {
        data[i] = this.getCategories[i].category
      }
      return data;
    }
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

</style>