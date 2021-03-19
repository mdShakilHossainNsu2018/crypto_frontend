<template>
  <div>


    <v-container>
      <v-form class="mt-12">
        <v-text-field v-model="credential.email" prepend-icon="mdi-email" name="email" label="email"></v-text-field>
        <v-text-field v-model="credential.password" prepend-icon="mdi-lock" name="Password" label="Password"
                      type="password"></v-text-field>
        <v-card-actions>
          <v-btn primary to="/register">Sign Up</v-btn>
          <v-btn primary @click="loginMet">Login</v-btn>
          <v-btn primary to="/reset-password">Forgot password</v-btn>
<!--          {{getLoadingState}}-->
          <v-progress-circular
              class="mx-4"
              v-if="getLoadingState"
              :size="50"
              color="primary"
              indeterminate
          ></v-progress-circular>
        </v-card-actions>
      </v-form>


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
    <Footer class="mt-15"/>

  </div>
</template>
<script>

import {mapActions, mapGetters} from 'vuex';
import Footer from '@/components/Footer.vue';
// import {SET_SNACK_BAR_DATA, SET_SNACK_BAR_STATE, SET_TOKEN} from "@/store/user/mutation-types";
import router from "@/router";

export default {
  name: "Login",

  components: {
    Footer,
  },

  data() {
    return {
      credential: {
        email: "",
        password: "",
      }
    }
  },

  methods: {

    ...mapActions('user', ['getUserByToken', 'setToken', 'setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),
    // ...mapMutations('user', ['S'),


    loginMet() {

      this.setLoadingState(true)
      this.$axios.post(this.getBaseUrl + 'users/auth/login/', this.credential).then(res => {

        // this.$store.commit('SET_TOKEN', res.data)
        this.setToken(res.data)
        this.getUserByToken(this.getToken)
        router.push('/dashboard');

      }).catch(err => {

        if (err.response){
          this.setSnackBarData(err.response)
          this.setSnackBarState(true)
          // this.$store.commit('user/SET_SNACK_BAR_DATA', err.response)
          // this.$store.commit('user/SET_SNACK_BAR_STATE', true)
        }
        console.log('error',err.response)
      }).finally(() => {
        this.setLoadingState(false)
      })
    },


  },

  computed: {
    ...mapGetters('user', ['isAuthenticated', 'getToken', 'getLoadingState']),
    ...mapGetters('loadingState', [ 'getLoadingState']),
    ...mapGetters('baseUrl', [ 'getBaseUrl']),

  }

}
</script>

<style scoped>

</style>