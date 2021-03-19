<template>
  <div>
    <v-container>
      <div style="height: 50vh;">
        <h1>Reset your password</h1>

        <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>

        <v-btn @click="submit">Submit</v-btn>
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
        this.$router.push('/reset-confirm')
      }).catch(err => {
        this.setSnackBarData(err.response)
        this.setSnackBarState(true)
      }).finally(()=>{
        this.setLoadingState(false)
      })
    },
  }
}
</script>

<style scoped>

</style>