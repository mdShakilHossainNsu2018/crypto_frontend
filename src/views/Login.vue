<template>
  <div>


    <v-container>

      <v-row>
        <v-col>
          <v-card max-width="500" elevation="10">

          <v-form class="mt-12">
            <v-text-field v-model="credential.email"
                          prepend-inner-icon="mdi-email"
                          name="email"
                          label="email"
                          class="px-9 pt-7"
                          placeholder="Enter your email"
                          outlined
                          dense
                          :error-messages="emailErrors"
                          @input="$v.credential.email.$touch()"
                          @blur="$v.credential.email.$touch()"
            ></v-text-field>
            <v-text-field v-model="credential.password"
                          prepend-inner-icon="mdi-lock"
                          name="password"
                          label="password"
                          type="password"
                          class="px-9"
                          placeholder="Enter your password"
                          outlined
                          dens
                          required
                          :error-messages="passwordErrors"
                          @input="$v.credential.password.$touch()"
                          @blur="$v.credential.password.$touch()"
            ></v-text-field>
            <!--          <v-card-actions>-->

            <div style="padding-left:2.3rem; padding-right:2.3rem;">
              <v-btn block color="#4d90fe" class="py-7" @click="loginMet"><p class="white-font">Log In</p></v-btn>

            </div>

            <div class="text-center py-5">
              <v-btn text primary to="/reset-password"><p class="forgot-text">Forgotten password?</p></v-btn>
            </div>

            <hr>
            <div style="padding-left:5rem; padding-right:5rem;" class="py-4">
              <v-btn class="py-6" primary block color="#5bb829" to="/register"><p class="white-font">Sign Up</p></v-btn>
            </div>
            <!--          {{getLoadingState}}-->
<!--            <v-progress-circular-->
<!--                class="mx-4"-->
<!--                v-if="getLoadingState"-->
<!--                :size="50"-->
<!--                color="primary"-->
<!--                indeterminate-->
<!--            ></v-progress-circular>-->
            <!--          </v-card-actions>-->
          </v-form>

          </v-card>
        </v-col>

        <v-col>

        </v-col>
      </v-row>

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
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'
import router from "@/router";

export default {
  name: "Login",
  mixins: [validationMixin],
  components: {
    Footer,
  },

  validations: {
    credential: {
      email: {required, email},
      password: {required}
    }

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

        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
          // this.$store.commit('user/SET_SNACK_BAR_DATA', err.response)
          // this.$store.commit('user/SET_SNACK_BAR_STATE', true)
        }
        console.log('error', err.response)
      }).finally(() => {
        this.setLoadingState(false)
      })
    },


  },

  computed: {

    emailErrors () {
      const errors = []
      if (!this.$v.credential.email.$dirty) return errors
      !this.$v.credential.email.email && errors.push('Must be valid e-mail')
      !this.$v.credential.email.required && errors.push('E-mail is required')
      return errors
    },

    passwordErrors (){
      const errors = []
      if (!this.$v.credential.password.$dirty) return errors

      !this.$v.credential.password.required && errors.push('Password is required')
      return errors
    },
    ...mapGetters('user', ['isAuthenticated', 'getToken', 'getLoadingState']),
    ...mapGetters('loadingState', ['getLoadingState']),
    ...mapGetters('baseUrl', ['getBaseUrl']),

  }

}
</script>

<style scoped>

.forgot-text {
  color: #1877f2;
  font-size: 14px;
  font-weight: 500;
}

.forgot-text:hover {
  text-decoration: underline;
}

.white-font {
  color: white;
  font-weight: 900;
  margin-top: 1rem;
  font-size: 1.2rem;
}

</style>