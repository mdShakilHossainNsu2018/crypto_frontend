<template>
  <div>
    <v-container style="height:53vh;">

      <v-alert
          outlined
          type="success"
          text
      >
        Please Check your email. Password reset credential has been sent to your email.
      </v-alert>

      <!--    <h1>Please Check your email. Password reset credential has been sent to email.</h1>-->
    </v-container>

    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: "ResetEmailConfirm",
  components: {
    Footer
  },
  created() {
    document.title = "Ovex Broker";
  },
}
</script>

<style scoped>

</style>