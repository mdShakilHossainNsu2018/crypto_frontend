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
        </v-card-actions>
      </v-form>
    </v-container>
    <Footer class="mt-15"/>
  </div>
</template>
<script>

import {mapActions, mapGetters} from 'vuex';
import Footer from '@/components/Footer.vue';

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

    ...mapActions('user', ['login']),
    ...mapActions('loadingState', ['setLoadingState']),

    loginMet() {
      this.setLoadingState(true)
      this.login(this.credential)
      this.setLoadingState(false)
    },


  },

  computed: {
    ...mapGetters('user', ['isAuthenticated', 'getToken'])
  }

}
</script>

<style scoped>

</style>