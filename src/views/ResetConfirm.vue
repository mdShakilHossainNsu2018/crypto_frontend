<template>
  <div>
    <v-container>

      <div style="height: 50vh;">
      <form>
        <!--        uid, token, new_password1, new_password2-->

        <v-text-field
            v-model="new_password1"
            :error-messages="newPassword1Error"
            label="Password"
            required
            type="password"
            @input="$v.new_password1.$touch()"
            @blur="$v.new_password1.$touch()"
        ></v-text-field>

        <v-text-field
            v-model="new_password2"
            :error-messages="newPassword2Error"
            label="Confirm Password"
            required
            type="password"
            @input="$v.new_password2.$touch()"
            @blur="$v.new_password2.$touch()"
        ></v-text-field>


        <v-btn
            class="mr-4"
            @click="submit"
            :disabled="!isValid"
        >
          submit
        </v-btn>

        <!--        <v-btn @click="clear">-->
        <!--          clear-->
        <!--        </v-btn>-->
      </form>
      </div>
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

    uid: this.$router.params.uid,
    token: this.$router.params.token,
    new_password1: "",
    new_password2: ""


  }),

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl']),

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
      return !(this.$v.new_password2.$invalid || this.$v.new_password1.$invalid || this.$v.token.$invalid || this.$v.uid.$invalid)
    }
  },

  // https://backend.ovexbroker.co.za/api/users/auth/password/reset/confirm/
  // Todo: ResetConfirm with uid, token, new_password1, new_password2
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

</style>