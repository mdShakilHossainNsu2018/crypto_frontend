<template>
  <div>
    <v-container>
      <v-card elevation="10" class="pa-16">


      <form>
        <!--        uid, token, new_password1, new_password2-->
        <h1>Enter your new password here</h1>
        <v-text-field
            v-model="new_password1"
            prepend-inner-icon="mdi-key"
            class="mt-5"
            :error-messages="newPassword1Error"
            label="New Password"
            placeholder="Enter your new password"
            required
            type="password"
            @input="$v.new_password1.$touch()"
            @blur="$v.new_password1.$touch()"
        ></v-text-field>

        <v-text-field
            v-model="new_password2"
            class="mt-5"
            :error-messages="newPassword2Error"
            label="New Confirm Password"
            prepend-inner-icon="mdi-key"
            required
            type="password"
            @input="$v.new_password2.$touch()"
            @blur="$v.new_password2.$touch()"
        ></v-text-field>


        <v-btn
            class="mr-4 mt-3 mb-10"
            @click="submit"
            color="#4d90fe"
            :disabled="!isValid"
        >
          <p class="white-font">Submit</p>
        </v-btn>
      </form>
      </v-card>
    </v-container>

    <Footer/>
  </div>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, sameAs, minLength} from 'vuelidate/lib/validators'
import Footer from '@/components/Footer.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "ResetConfirm",
  mixins: [validationMixin],
  components: {
    Footer,
  },
  validations: {
    new_password1: {required, minLength: minLength(6)},
    new_password2: {required, sameAsPassword: sameAs('new_password1')},
  },

  data: () => ({

    // uid: "",
    // token: "",
    new_password1: "",
    new_password2: ""


  }),

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl']),

    uid(){
      return this.$route.params.uid;
    },

    token(){
      return this.$route.params.token;
      },

    newPassword1Error() {
      const errors = []
      if (!this.$v.new_password1.$dirty) return errors
      !this.$v.new_password1.required && errors.push('Password is required')
      !this.$v.new_password1.minLength && errors.push('Password length must be at least 6')
      return errors
    },

    newPassword2Error() {
      const errors = []
      if (!this.$v.new_password2.$dirty) return errors
      !this.$v.new_password2.required && errors.push('Confirm Password is required')
      !this.$v.new_password2.sameAsPassword && errors.push('Password must match.')
      return errors
    },

    isValid() {
      return !(this.$v.new_password2.$invalid || this.$v.new_password1.$invalid)
    }
  },

  methods: {
    ...mapActions('user', ['setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),
    submit() {
      this.$v.$touch()
      this.setLoadingState(true)
      this.$axios.post(this.getBaseUrl + "users/auth/password/reset/confirm/", {
        uid: this.uid,
        token: this.token,
        new_password1: this.new_password1,
        new_password2: this.new_password2
      }).then(res => {
        console.log(res)
        this.$router.push('/login')
      }).catch(err => {
        this.setSnackBarData(err.response)
        this.setSnackBarState(true)
      }).finally(() => {
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