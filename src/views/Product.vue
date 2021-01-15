<template>
  <div>
    <h1>Product View</h1>

    <div v-for="product in products" :key="product.id">
      <v-card>
        {{ product.name }}
      </v-card>
    </div>


    <h1>Plans</h1>
    <div class="d-flex flex-wrap">
      <v-card v-for="plan in plans" width="400px" class="pa-3" :key="plan.id">
        {{ plan.amount }}
        <v-card-actions>
          <v-btn>Buy</v-btn>
        </v-card-actions>
      </v-card>
      <!--            <v-divider></v-divider>-->
    </div>
    <StripeForm/>
    <Footer/>
  </div>
</template>

<script>
import StripeForm from "@/components/StripeForm";
import Footer from "@/components/Footer.vue"

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
  methods: {
    getPlans() {
      this.$axios.get('http://localhost:8000/api/payment/get-plans/').then(res => {
        this.plans = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getProducts() {
      this.$axios.get('http://localhost:8000/api/payment/get-products/').then(res => {
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