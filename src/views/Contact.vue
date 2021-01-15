<template>
  <div>

    <v-container>

      <v-card>
        <v-card-title>
         Contact Us
        </v-card-title>
        <v-card-subtitle>
          <h2>
            Email: ovexbroker@gmail.com
          </h2>
          <h2>
            WhatsApp: +27628488484
          </h2>
          <h2>
            Facebook: Facebook.com/ovexbroker
          </h2>
          <h2>
            Twitter: Twitter/com/ovexbroker
          </h2>
        </v-card-subtitle>

        <v-card-text>

          <v-form class="contact-form" @submit.prevent="sendEmail">
            <v-text-field
                label="Name"
                required
            >

            </v-text-field>
<!--            <label>Email</label>-->
<!--            <input type="email" name="user_email">-->

            <v-text-field
                label="Email"
                required
            >

            </v-text-field>

<!--            <label>Message</label>-->
<!--            <textarea name="message"></textarea>-->

            <v-textarea label="Message">

            </v-textarea>

<!--            <input type="submit" value="Send">-->
            <v-btn>Send</v-btn>
          </v-form>


        </v-card-text>
      </v-card>
    </v-container>

    <Footer/>
  </div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import emailjs from 'emailjs-com';

export default {
  name: "Contact",

  components: {
    Footer,
  },

  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
          .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
          }, (error) => {
            console.log('FAILED...', error);
          });
    }
  }
}
</script>

<style scoped>

</style>