<template>
  <div>
    <v-container fluid>
<div class="text-center">
  <h1 class="title_header">Crypto Broker Services</h1>
</div>

<!--    Monthly | Annual-->

    <div class="text-center">
      <h2 class="subtitle_header">Monthly | Annual</h2>
    </div>
    <div class="d-flex flex-wrap justify-center description_font">
      <div v-for="product in products" :key="product.id">
        <v-card class="pa-9 ma-2">
          <p class="price_title"> {{ product.name }}</p>
          <v-card-title class="font-weight-black ">
            {{ product.description }}
          </v-card-title>

          <h2>Plans:</h2>
          <div class="d-flex flex-wrap justify-space-around">
            <v-card class="pa-3 ma-3" elevation="10" v-for="plan in product.plan_set" :key="plan.id">
              <v-card-title>Recurring interval {{plan.interval_count}} {{ plan.interval }}</v-card-title>
              <p class="price_value_font">{{ plan.amount }} <i style="font-size:40px">{{ plan.currency }}</i></p>
              <v-card-text>{{plan.nickname}}</v-card-text>
              <v-card-actions>

                <StripeForm v-if="isAuthenticated" :price-id="plan.id"/>
                <v-btn to="/login" v-else
                       color="#4d90fe"
                       dark
                >
                  Purchase
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-card>
      </div>
    </div>

    </v-container>
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

  created() {
    document.title = "Products - Ovex Broker";
  },
  mounted() {

    this.getPlans();
    this.getProducts();

  },

  computed: {
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', [ 'getLoadingState']),
    ...mapGetters('user', ['isAuthenticated'])
  },

  methods: {
    ...mapActions('loadingState', ['setLoadingState']),
    ...mapActions('user', ['setSnackBarData']),
    getPlans() {
      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'payment/get-plans/').then(res => {
        this.plans = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
        if (err.response){
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }

      }).finally(()=>{
        this.setLoadingState(false)
      })
    },
    getProducts() {
      this.$axios.get(this.getBaseUrl + 'payment/get-products/').then(res => {
        this.products = res.data
        console.log(res)
      }).catch(err => {
        if (err.response){
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');

.title_header {
  font-family: 'Roboto Slab', serif;
  color: #4d90fe;
  font-size: 3rem;
  display: block;

}

.subtitle_header{
  font-family: 'Roboto Slab', serif;
  color: #ff9a00;
  font-size: 2rem;
  display: block;
}

.price_title {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  color: #4d90fe;
}

.description_font {
  font-family: 'Roboto Slab', serif;
}

.price_value_font{
  font-size: 72px;
  color: #ff9a00;
}


</style>