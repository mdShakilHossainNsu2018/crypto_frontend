<template>
  <v-container>
    <h1>Dashboard</h1>
    <h3>User data</h3>
    <v-card>
      <v-card-title>
        Username: {{ getUser.username }}
        <br>
        Email: {{getUser.email}}
        <br>
        JOIN Date: {{convertDateTime(getUser.date_joined)}}
      </v-card-title>
    </v-card>
<!--    {{ getUser }}-->

    <h3>Subscription status</h3>
<!--    {{getPaymentStatus}}-->

    <v-card v-if="getPaymentStatus !== null">
      <v-card-title>
        {{getPaymentStatus.subscription.plan.product.name}}
      </v-card-title>
      <v-card-text>
        {{getPaymentStatus.subscription.plan.product.description}}
        <br>
        Price: {{getPaymentStatus.subscription.plan.amount}}
        {{getPaymentStatus.subscription.plan.currency}}
        <br>
        Interval: {{getPaymentStatus.subscription.plan.interval}}
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
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import moment from "moment";

export default {
  name: "Dashboard",
  mounted() {
    // this.getPaymentDetail()
    this.fetchSubscription()
  },

  methods: {
    ...mapActions('payment', ['fetchSubscription', 'cancelSubscription']),
    convertDateTime(time){
      return moment(time).format('MMMM Do YYYY, h:mm:ss a')
    }

  },


  computed: {
    ...mapGetters('user', ['getUser', 'getToken']),
    ...mapGetters('payment', ['getPaymentStatus']),
  }
}
</script>

<style scoped>

</style>