<template>
    <v-container>
        <v-form>
            <v-text-field v-model="credential.email" prepend-icon="mdi-email" name="email" label="email"></v-text-field>
            <v-text-field v-model="credential.password" prepend-icon="mdi-lock" name="Password" label="Password"
                          type="password"></v-text-field>
            <v-card-actions>
              <v-btn  primary  to="/register">Sign Up</v-btn>
                <v-btn  primary  @click="loginMet">Login</v-btn>
            </v-card-actions>
        </v-form>
    </v-container>
</template>
<script>

import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "Login",
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

            loginMet() {

              this.login(this.credential)

            },


        },

      computed: {
          ...mapGetters('user', ['isAuthenticated', 'getToken'])
      }

    }
</script>

<style scoped>

</style>