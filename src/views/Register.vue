<template>
  <div>


  <v-container >
    <v-form class="mt-9">
<!--      <v-text-field v-model="credential.username" prepend-icon="mdi-account" name="username"-->
<!--                    label="username"></v-text-field>-->
      <v-text-field v-model="credential.email" prepend-icon="mdi-email" name="email" label="email"></v-text-field>
      <v-text-field v-model="credential.password1" prepend-icon="mdi-lock" name="Password" label="Password"
                    type="password"></v-text-field>
      <v-text-field v-model="credential.password2" prepend-icon="mdi-lock" name="Password" label="Password"
                    type="password"></v-text-field>
      <v-card-actions>
        <v-btn primary to="/login">Login</v-btn>
        <v-btn primary @click="onClickSubmit">Sign Up</v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
<Footer class="mt-9"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import Footer from '@/components/Footer.vue'

export default {
  name: "Register",

  components: {
    Footer,
  },

  data() {
    return {
      credential: {
        email: "",
        password1: "",
        password2: "",
      }
    }
  },

  methods: {

    ...mapActions('user', ['signup']),
    ...mapActions('loadingState', ['setLoadingState']),
    onClickSubmit(){
      this.setLoadingState(true);
      this.signup(this.credential)
      this.setLoadingState(false);

    }
  }
}
</script>

<style scoped>

</style>