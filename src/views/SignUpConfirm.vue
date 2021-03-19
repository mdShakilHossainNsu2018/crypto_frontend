<template>
<div>
  <v-container style="height:53vh;">

    <v-alert
        outlined
        type="success"
        text
    >
      Confirmation message has been sent to your email. Please check your email.
    </v-alert>
  </v-container>
  <Footer/>
</div>
</template>

<script>
import Footer from '@/components/Footer.vue';
export default {
name: "SignUpConfirm",
  components: {
  Footer,
    }
}
</script>

<style scoped>

</style>