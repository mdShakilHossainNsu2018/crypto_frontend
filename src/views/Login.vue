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
    </v-container>
    <v-snackbar
        v-model="getSnackbarState"
        :multi-line="true"
    >
      {{ getSnackbarData }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
    ...mapGetters('user', ['isAuthenticated', 'getToken', 'getSnackbarData', 'getLoadingState']),
    // ...mapGetters('loadingState', [ 'getLoadingState']),


    getSnackbarState: {
      get(){
        return this.$store.getters["user/getSnackbarState"]
      },
      set(value){

        this.$store.dispatch('user/setSnackBarState', value)
      }
    },

  }

}
</script>

<style scoped>

</style>