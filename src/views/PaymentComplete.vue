<template>
  <v-container>

    <v-card class="text-center" color="success">
      <h1>payment successful.</h1>
    </v-card>

    <v-card class="pa-3 my-4">
      <v-card-title>
        <h1>Please complete this form to integrate your telegram to our bot.</h1><br>
      </v-card-title>

      <p class="warning d-inline pa-2 ml-2">Please make sure your telegram account is active...</p>
      <v-form>
        <div class="d-flex">
          <v-text-field label="First Name" v-model="firstName" class="pa-4"></v-text-field>
          <v-text-field label="Last Name" v-model="lastName" class="pa-4"></v-text-field>
        </div>

        <vue-phone-number-input v-model="phone" @update="updatedPhone = $event"/>
<!--        {{ phone }}-->
<!--        {{ updatedPhone }}-->
        <!--      formattedNumber-->

        <div class="d-flex justify-end mt-5">
          <v-btn :disabled="!updatedPhone.isValid" @click="submit">Submit</v-btn>
        </div>

      </v-form>
    </v-card>


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
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PaymentComplete",

  data() {
    return {
      phone: null,
      updatedPhone: {},
      firstName: null,
      lastName: null
    }
  },

  methods: {

    // ...mapActions('telegram', ['addToTelegramContact']),
    ...mapActions('loadingState', ['setLoadingState']),

    submit() {
      this.setLoadingState(true)
      const data = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone: this.updatedPhone.formattedNumber,
      }

      console.log("submit submit")


      this.$axios.post(this.getBaseUrl + 'telegram/create_user_info/', data, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.getToken,
        }
      }).then(response => {
        console.log(response.data)
        this.$router.push('/dashboard')
      }).catch(error => console.log(error)).finally(() =>{
        this.setLoadingState(false)
      })
      

      // this.addToTelegramContact(data)
      // this.setLoadingState(false)

    }
  },

  computed: {
    ...mapGetters('user', ['getToken']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', [ 'getLoadingState']),
  }
}
</script>

<style scoped>

</style>