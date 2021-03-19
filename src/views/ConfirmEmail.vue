<template>
  <div>
    <v-btn @click="confirm" x-large>Click here to verify your email</v-btn>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ConfirmEmail",
  components: {
    Footer
  },

  data() {
    return {
      token: this.$route.params.token
    }
  },

  methods: {

    ...mapActions('user', ['setSnackBarData', 'setSnackBarState']),
    ...mapActions('loadingState', ['setLoadingState']),

    confirm() {
      this.setLoadingState(true)
      // https://backend.ovexbroker.co.za/api/users/auth/registration/verify-email/  key
      this.$axios.post(this.getBaseUrl + "users/auth/registration/verify-email/", {key: this.token}).then(response => {
        console.log(response.data)
        this.$router.push('/login')
      }).catch(error => {
        this.setSnackBarData(error.response)
        this.setSnackBarState(true)
      }).finally(() => {
        this.setLoadingState(false)
      })
    }
  },

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl'])

  }

}
</script>

<style scoped>

</style>