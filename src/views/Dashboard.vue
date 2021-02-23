<template>
  <v-container>
    <h1>Dashboard</h1>
    <h3>User data</h3>

    <div v-if="isSuperUser">
      <h1>Is Admin Logged In To Telegram: {{ getTelegramLoggedIn }}</h1>
    </div>
    <v-stepper v-model="e1" v-if="isSuperUser" class="my-5">
      <v-stepper-header>
        <v-stepper-step
            :complete="e1 > 1"
            step="1"
        >
          Name of step 1
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="e1 > 2"
            step="2"
        >
          Name of step 2
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Name of step 3
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
              class="mb-12"

              height="300px"
          >

            <!--            TELEGRAM_API_ID = '2094101'-->
            <!--            TELEGRAM_API_HASH = 'a59f36960779a79a7569fbbf0843a5d2'-->
            <!--            TELEGRAM_TOKEN = '1555983656:AAGqDRBVaB0Hu77fbbT0K_YvARu-LOrVVsA'-->

            <!--            # your phone number-->
            <!--            TELEGRAM_PHONE = '+8801729996899'-->


            <v-text-field label="TELEGRAM API ID" v-model="telegramApiId"></v-text-field>
            <v-text-field label="TELEGRAM API HASH" v-model="telegramApiHash"></v-text-field>
            <v-text-field label="TELEGRAM TOKEN" v-model="telegramToken"></v-text-field>
            <vue-phone-number-input v-model="telegramPhone" @update="telegramUpdatePhone = $event"/>

          </v-card>

          <v-btn
              color="primary"
              @click="getVerificationCode"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
              class="mb-12"
              height="200px"
          >

            <h1>Enter verification code here.</h1>
            <v-text-field label="Verification Code" v-model="verificationCode"></v-text-field>
          </v-card>

          <v-btn
              color="primary"
              @click="loginToTelegram"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
              class="mb-12"
              height="200px"
          >

            <v-card-title>
              <h1>Successfully verified...</h1>
            </v-card-title>
          </v-card>

          <v-btn
              color="primary"
              @click="e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-card>
      <v-card-title>
        Username: {{ getUser.username }}
        <br>
        Email: {{ getUser.email }}
        <br>
        JOIN Date: {{ convertDateTime(getUser.date_joined) }}
      </v-card-title>
    </v-card>
    <!--    {{ getUser }}-->

    <h3>Subscription status</h3>
    <!--    {{getPaymentStatus}}-->

    <v-card v-if="getPaymentStatus !== null">
      <v-card-title>
        {{ getPaymentStatus.subscription.plan.product.name }}
      </v-card-title>
      <v-card-text>
        {{ getPaymentStatus.subscription.plan.product.description }}
        <br>
        Price: {{ getPaymentStatus.subscription.plan.amount }}
        {{ getPaymentStatus.subscription.plan.currency }}
        <br>
        Interval: {{ getPaymentStatus.subscription.plan.interval }}
      </v-card-text>

      <v-card-actions>
        <div class="d-flex justify-end">
          <v-btn color="primary" @click="cancelSubscription">Cancel Subscription</v-btn>

        </div>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title> You don't have any subscription...
      </v-card-title>
    </v-card>

    <div v-if="getPaymentStatus !== null">
      <h3>User Info</h3>
      <v-card v-if="userInfo.length !== 0">
        <v-card-text>
          First Name: {{ userInfo.first_name }}
          <br>
          Last Name: {{ userInfo.last_name }}
          <br>
          Phone: {{ userInfo.phone }}
          <br>

          <!--        {{isSuperUser}}-->
          <div v-if="userInfo.is_active ">Telegram status:
            <v-chip color="green lighten-2"> Active</v-chip>
          </div>
          <div v-else>Telegram status:
            <v-chip color="red" dark> Disabled</v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex  justify-end">

          <div class="d-flex flex-column">
            <!--          <div>-->
            <v-btn color="red" block class="my-2" dark v-if="userInfo.is_active" @click="disableTelegram">Disable
              telegram
            </v-btn>
            <v-btn color="green" block class="my-2" v-else @click="enableTelegram">Enable telegram</v-btn>

            <v-dialog
                v-model="dialog"
                width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-2"
                    dark
                    class="pa-3"
                    v-bind="attrs"
                    v-on="on"

                >
                  Change Telegram Contact
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">

                  Fill the form.

                  <v-spacer></v-spacer>

                  <v-btn @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card-text>
                  <v-form>
                    <div class="d-flex">
                      <v-text-field label="First Name" v-model="firstName" class="pa-4"></v-text-field>
                      <v-text-field label="Last Name" v-model="lastName" class="pa-4"></v-text-field>
                    </div>

                    <vue-phone-number-input v-model="phone" @update="updatedPhone = $event"/>
                    {{ updatedPhone }}
                    <!--      formattedNumber-->

                    <!--                <div class="d-flex justify-end">-->
                    <!--                  <v-btn :disabled="!updatedPhone.isValid" @click="submit">Submit</v-btn>-->
                    <!--                </div>-->

                  </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      text
                      :disabled="!updatedPhone.isValid"
                      @click="changeTelegram"
                      block
                  >
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

          <!--        </div>-->


        </v-card-actions>
      </v-card>
    </div>
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
import {mapGetters, mapActions} from 'vuex';
import moment from "moment";

export default {
  name: "Dashboard",
  mounted() {
    // this.getPaymentDetail()
    this.setLoadingState(true)
    this.fetchSubscription()
    this.fetchUserInfo()

    if (this.isSuperUser) {
      this.isLoggedInToTelegram()
    }

    this.setLoadingState(false)
  },

  data() {
    return {
      userInfo: {},
      dialog: false,
      phone: null,
      updatedPhone: {},
      firstName: null,
      lastName: null,
      e1: 1,

      telegramApiId: null,
      telegramApiHash: null,
      telegramToken: null,
      telegramPhone: null,
      telegramUpdatePhone: null,
      verificationCode: null,
    }
  },

  methods: {
    ...mapActions('payment', ['fetchSubscription', 'cancelSubscription']),
    ...mapActions('telegram', ['addToTelegramContact', 'deleteContact', 'enableTelegram', 'disableTelegram', 'isLoggedInToTelegram', 'requestForVerificationCode']),
    ...mapActions('loadingState', ['setLoadingState']),
    convertDateTime(time) {
      return moment(time).format('MMMM Do YYYY, h:mm:ss a')
    },


    getVerificationCode(){
      // api_id = request.data['api_id']
      // api_hash = request.data['api_hash']
      // phone = request.data['phone']
      // token = request.data['token']

      const data = {
        api_id: this.telegramApiId,
        api_hash: this.telegramApiHash,
        phone: this.telegramUpdatePhone.formattedNumber,
        token: this.telegramToken
      }

      this.$axios.post(this.getBaseUrl+'telegram/request_telegram_code/', data, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.getToken,
        }
      }).then((response) => {
        console.log(response)
        this.e1 = 2
      }).catch((error) => console.log(error))

      
    },


    loginToTelegram(){
      // login_to_telegram/

      // code = request.data['code']

      const data = {
        code: this.verificationCode,
      }
      this.$axios.post(this.getBaseUrl+'telegram/login_to_telegram/', data, {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.getToken,
        }
      }).then((response) => {
        console.log(response)
        this.e1 = 3
      }).catch((error) => console.log(error))
    },


    changeTelegram() {

      // todo test
      this.setLoadingState(true)

      this.dialog = false;

      this.deleteContact();

      const data = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone: this.updatedPhone.formattedNumber,
      }

      this.addToTelegramContact(data)
      this.setLoadingState(false)

    },


    fetchUserInfo() {
      // get_user_info

      if(this.getPaymentStatus !== null){
        this.setLoadingState(true)
        this.$axios.get(this.getBaseUrl + 'telegram/get_user_info/', {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.getToken,
          }
        }).then(response => {
          console.log(response.data)
          this.userInfo = response.data;

        }).catch(error => console.log(error)).finally(() => {
          this.setLoadingState(false)
        })
      }
    }

  },


  computed: {
    ...mapGetters('user', ['getUser', 'getToken', 'isSuperUser']),
    ...mapGetters('payment', ['getPaymentStatus']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('telegram', ['getTelegramLoggedIn']),
    ...mapGetters('loadingState', [ 'getLoadingState']),
  }
}
</script>

<style scoped>

</style>