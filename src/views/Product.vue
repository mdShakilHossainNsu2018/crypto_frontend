<template>
  <div>

    <v-container>
    <h1>Product View</h1>

    <div class="d-flex">
      <div v-for="product in products" :key="product.id">
        <v-card class="pa-9 ma-8">
          <v-card-title> {{ product.name }}</v-card-title>
          <v-card-text>
            {{ product.description }}
          </v-card-text>

          Plans:
          <div class="d-flex">
            <v-card class="pa-9 ma-8" v-for="plan in product.plan_set" :key="plan.id">
              <v-card-title>{{ plan.interval }}</v-card-title>
              <v-card-text>{{ plan.amount }} {{ plan.currency }}</v-card-text>
              <v-card-actions>
                <StripeForm :price-id="plan.id"/>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </div>
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

<!--    <h1>Plans</h1>-->
<!--    <div class="d-flex flex-wrap">-->
<!--      <v-card v-for="plan in plans" width="400px" class="pa-3" :key="plan.id">-->
<!--        {{ plan.amount }}-->
<!--        <v-card-actions>-->
<!--          <v-btn>Buy</v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--      &lt;!&ndash;            <v-divider></v-divider>&ndash;&gt;-->
<!--    </div>-->

    <Footer/>
  </div>
</template>

<script>
import StripeForm from "@/components/StripeForm";
import Footer from "@/components/Footer.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Product",
  components: {StripeForm, Footer},
  data() {
    return {
      plans: [],
      products: [],
    }
  },
  mounted() {

    this.getPlans();
    this.getProducts();

  },

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', [ 'getLoadingState']),
  },

  methods: {
    ...mapActions('loadingState', ['setLoadingState']),
    getPlans() {
      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'payment/get-plans/').then(res => {
        this.plans = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      }).finally(()=>{
        this.setLoadingState(false)
      })
    },
    getProducts() {
      this.$axios.get(this.getBaseUrl + 'payment/get-products/').then(res => {
        this.products = res.data
        console.log(res)
      }).catch(err => {

        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>