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
        {{ phone }}
        {{ updatedPhone }}
        <!--      formattedNumber-->

        <div class="d-flex justify-end">
          <v-btn :disabled="!updatedPhone.isValid" @click="submit">Submit</v-btn>
        </div>

      </v-form>
    </v-card>

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

    ...mapActions('telegram', ['addToTelegramContact']),
    ...mapActions('loadingState', ['setLoadingState']),

    submit() {
      this.setLoadingState(true)
      const data = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone: this.updatedPhone.formattedNumber,
      }

      console.log("submit submit")

      this.addToTelegramContact(data)
      this.setLoadingState(false)

    }
  },

  computed: {
    ...mapGetters('user', ['getToken'])
  }
}
</script>

<style scoped>

</style>