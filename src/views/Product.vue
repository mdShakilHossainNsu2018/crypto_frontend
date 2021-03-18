<template>
  <div>


    <div class="d-flex flex-wrap">
      <div v-for="product in products" :key="product.id">
        <v-card class="pa-9 ma-8">
          <p class="price_title"> {{ product.name }}</p>
          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <h2>Plans:</h2>
          <div class="d-flex flex-wrap">
            <v-card class="pa-9 ma-8" v-for="plan in product.plan_set" :key="plan.id">
              <v-card-title>Recurring interval {{plan.interval_count}} {{ plan.interval }}</v-card-title>
              <p class="price_value_font">{{ plan.amount }} <i style="font-size:40px">{{ plan.currency }}</i></p>
              <v-card-text>{{plan.nickname}}</v-card-text>
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
    ...mapActions('user', ['setSnackBarData']),
    getPlans() {
      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'payment/get-plans/').then(res => {
        this.plans = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
        if (err.response){
          this.setSnackBarData(err.response)
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
          this.setSnackBarData(err.response)
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
.price_title {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  color: #4d90fe;
}

.price_value_font{
  font-size: 72px;
  color: #ff9a00;
}


</style>