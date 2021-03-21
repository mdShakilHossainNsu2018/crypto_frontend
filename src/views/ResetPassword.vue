<template>
  <div>
    <v-container>
      <div style="height: 50vh;">
        <h1>Reset your password</h1>

        <v-text-field
            class="mt-5"
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            placeholder="Enter your email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>


<!--        <div style="padding-left:2.3rem; padding-right:2.3rem;">-->
          <v-btn color="#4d90fe" class="mt-2" @click="submit"><p class="white-font">Submit</p></v-btn>
<!--        </div>-->
      </div>
    </v-container>
    <Footer/>
  </div>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'
import Footer from '@/components/Footer.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "ResetPassword",
  mixins: [validationMixin],
  components: {
    Footer,
  },
  validations: {
    email: {required, email},
  },

  data: () => ({
    email: '',
  }),

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl']),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    ...mapActions('user', ['setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),
    submit () {
      this.$v.$touch()
      this.setLoadingState(true)
      this.$axios.post(this.getBaseUrl + "users/auth/password/reset/", {email: this.email}).then(res => {
        console.log(res)
        this.$router.push('/reset-email-confirm')
      }).catch(err => {
        this.setSnackBarData(err.response.data)
        this.setSnackBarState(true)
      }).finally(()=>{
        this.setLoadingState(false)
      })
    },
  }
}
</script>

<style scoped>
.white-font {
  color: white;
  font-weight: 900;
  margin-top: 1rem;
  font-size: 1.2rem;
}
</style>