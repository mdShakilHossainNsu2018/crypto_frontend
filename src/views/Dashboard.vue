<template>
  <v-container>
    <h1>Dashboard</h1>

    {{ getUser }}

  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "Dashboard",
  mounted() {
    this.getPaymentDetail()
  },

  methods: {

    getPaymentDetail() {
      this.$axios.get('http://localhost:8000/api/payment/get-user-detail/',
          {
            headers: {
              // 'Content-Type': 'application/json',
              'Authorization': 'Token ' + this.getToken,
            }
          },
      ).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err.response)
      })
    }

  },


  computed: {
    ...mapGetters('user', ['getUser', 'getToken'])
  }
}
</script>

<style scoped>

</style>