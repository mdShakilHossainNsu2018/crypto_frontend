<template>
  <v-container>
    <v-form>
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
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "Register",
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
    onClickSubmit(){
      // todo
      this.signup(this.credential)

    }
  }
}
</script>

<style scoped>

</style>