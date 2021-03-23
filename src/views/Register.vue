<template>
  <div>


    <v-container>

      <v-row>
        <v-col>
          <v-card max-width="500" elevation="10">
            <v-form class="mt-9">
              <!--      <v-text-field v-model="credential.username" prepend-icon="mdi-account" name="username"-->
              <!--                    label="username"></v-text-field>-->
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
              <v-text-field v-model="credential.password1"
                            prepend-inner-icon="mdi-lock"
                            class="px-9 pt-7"
                            placeholder="Enter your password"
                            outlined
                            dense
                            :error-messages="password1Errors"
                            @input="$v.credential.password1.$touch()"
                            @blur="$v.credential.password1.$touch()"
                            name="Password"
                            label="Password"
                            type="password"
              >

              </v-text-field>
              <v-text-field v-model="credential.password2"
                            prepend-inner-icon="mdi-lock"
                            name="Password2"
                            label="Confirm Password"
                            type="password"
                            class="px-9 pt-7"
                            placeholder="Enter your confirmation password"
                            outlined
                            dense
                            :error-messages="password2Errors"
                            @input="$v.credential.password2.$touch()"
                            @blur="$v.credential.password2.$touch()"

              >

              </v-text-field>

              <div style="padding-left:5rem; padding-right:5rem;" class="py-4">
                <v-btn class="py-6"  block color="#5bb829" @click="onClickSubmit"><p class="white-font">Sign Up</p></v-btn>
              </div>

              <div class="text-center py-5">
                Already have an account?<router-link to="/login"> Sign in</router-link>

              </div>

            </v-form>
          </v-card>
        </v-col>
        <v-col>

        </v-col>
      </v-row>


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
    <Footer class="mt-9"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Footer from '@/components/Footer.vue';
import {validationMixin} from 'vuelidate'
import {required, email, sameAs, minLength} from 'vuelidate/lib/validators'

export default {
  name: "Register",
  mixins: [validationMixin],

  validations: {
    credential: {
      email: {required, email},
      password1: {required, minLength: minLength(6)},
      password2: {required, sameAsPassword: sameAs('password1')}
    }

  },

  created() {
    document.title = "Register - Ovex Broker";
  },

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

    ...mapActions('user', ['login', 'setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),

    onClickSubmit() {
      this.setLoadingState(true);

      this.$axios.post(this.getBaseUrl + 'users/auth/registration/', this.credential).then(() => {
        this.$router.push('/signup-confirm')
      }).catch(err => {
        console.log(err.response.data)

        if (err.response){
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
          // this.$store.commit('user/SET_SNACK_BAR_DATA', err.response)
          // this.$store.commit('user/SET_SNACK_BAR_STATE', true)
        }

      }).finally(()=>{
        this.setLoadingState(false);
      })

    }
  },

  computed: {

    emailErrors () {
      const errors = []
      if (!this.$v.credential.email.$dirty) return errors
      !this.$v.credential.email.email && errors.push('Must be valid e-mail')
      !this.$v.credential.email.required && errors.push('E-mail is required')
      return errors
    },

    password1Errors (){
      const errors = []
      if (!this.$v.credential.password1.$dirty) return errors

      !this.$v.credential.password1.required && errors.push('Password is required')
      !this.$v.credential.password1.minLength && errors.push('Must contain at least 6 characters')
      return errors
    },

    password2Errors (){
      const errors = []
      if (!this.$v.credential.password2.$dirty) return errors

      !this.$v.credential.password2.required && errors.push('Password is required')
      !this.$v.credential.password2.sameAsPassword && errors.push('Password must match')
      return errors
    },

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
a {
text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>