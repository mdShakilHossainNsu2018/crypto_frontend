<template>
  <div>


    <v-container>
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

    ...mapActions('user', ['login', 'setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),

    onClickSubmit() {
      this.setLoadingState(true);

      this.$axios.post(this.getBaseUrl + 'users/auth/registration/', this.credential).then(() => {
        this.login({email: this.credential.email, password: this.credential.password1 } )
      }).catch(err => {
        console.log(err.response)

        if (err.response){
          this.setSnackBarData(err.response)
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
    ...mapGetters('loadingState', ['getLoadingState']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
  }
}
</script>

<style scoped>

</style>