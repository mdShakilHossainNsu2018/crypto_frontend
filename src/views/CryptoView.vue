<template>
  <div>
    <v-container>
      <h1>Arbitrage Calculator</h1>

      <div v-if="isSubscriber">
        <v-row>
          <v-col>
            <v-text-field type="number" v-model="startingAmount" label="Enter allocation amount"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field type="number" v-model="bankFee" label="swift bank/other fees"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field type="number" v-model="arbCalculation" disabled
                          label="current potential Arbitrage points"></v-text-field>
          </v-col>
        </v-row>

<!--    </v-container>-->

<!--    <v-container class="grey lighten-5">-->
      <v-row
          no-gutters
          style="height: 150px;"
      >
        <v-col
        >
          <v-card
              class="mx-1"
              min-height="135"

          >
          <v-card-text class="text-center" v-if="highestArbsLoadingState">


            <v-progress-circular
                :size="70"
                :width="7"
                color="purple"
                indeterminate

            ></v-progress-circular>
          </v-card-text>

            <div v-else>
              <v-card-title>
                {{convertDateTime(lastCryptoData[0].timestamp)}}
              </v-card-title>
              <v-card-text>
              <h1>{{lastCryptoData[0].arb}} %</h1>
              </v-card-text>
            </div>

          </v-card>
        </v-col>

        <v-col
        >
          <v-card
              class="mx-1"
              min-height="135"
          >

            <v-card-text class="text-center" v-if="highestArbsLoadingState">


              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate

              ></v-progress-circular>
            </v-card-text>

            <div v-else>
              <v-card-title>
                Highest 24 hours
              </v-card-title>
              <v-card-text>
                <h1>{{highestArbs.daily_highest.arb__max}} %</h1>
              </v-card-text>
            </div>
          </v-card>
        </v-col>


        <v-col
        >
          <v-card
              class="mx-1"
              min-height="135"
          >

            <v-card-text class="text-center" v-if="highestArbsLoadingState">


              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="red"
                  indeterminate

              ></v-progress-circular>
            </v-card-text>

            <div v-else>
              <v-card-title>
                Highest 7 days
              </v-card-title>
              <v-card-text>
                <h1>{{highestArbs.weakly_highest.arb__max}} %</h1>
              </v-card-text>
            </div>

          </v-card>
        </v-col>



        <v-col
        >
          <v-card

              class="mx-1"
              min-height="135"
          >

            <v-card-text class="text-center" v-if="highestArbsLoadingState">


              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate

              ></v-progress-circular>
            </v-card-text>

            <div v-else>
              <v-card-title>
                Highest 30 days
              </v-card-title>
              <v-card-text>
                <h1>{{highestArbs.monthly_highest.arb__max}} %</h1>
              </v-card-text>
            </div>


          </v-card>
        </v-col>




        <v-col
        >
          <v-card
              class="mx-1"
              min-height="135"
          >

            <v-card-text class="text-center" v-if="highestArbsLoadingState">


              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="green"
                  indeterminate

              ></v-progress-circular>
            </v-card-text>

            <div v-else>
              <v-card-title>
                Highest 90 days
              </v-card-title>
              <v-card-text>
                <h1>{{highestArbs.ninety_days_highest.arb__max}} %</h1>
              </v-card-text>
            </div>

          </v-card>
        </v-col>



        <v-col
        >
          <v-card
              class="mx-1"
              min-height="135"
          >
            <v-card-text class="text-center" v-if="highestArbsLoadingState">

              <v-progress-circular
                  :size="70"
                  :width="7"
                  color="amber"
                  indeterminate

              ></v-progress-circular>
            </v-card-text>

            <div v-else>
              <v-card-title>
                Highest 365 days
              </v-card-title>
              <v-card-text>
                <h1>{{highestArbs.yearly_highest.arb__max}} %</h1>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

        <LineChart :key="cryptoData.next" v-if="timestamps.length > 1 && arbs.length > 1" :arbsData="arbs"
                   :timestampsData="timestamps"/>

        <v-simple-table v-if="cryptoData.length !==0">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                Time Stamp
              </th>
              <th class="text-left">
                luno_zar_ask
              </th>
              <th class="text-left">
                luno_zar_bid
              </th>
              <th class="text-left">
                valr_zar_ask
              </th>
              <th class="text-left">
                valr_zar_bid
              </th>
              <th class="text-left">
                kraken_zar_ask
              </th>
              <th class="text-left">
                kraken_zar_bid
              </th>
              <th class="text-left">
                kraken_eur_ask
              </th>
              <th class="text-left">
                kraken_eur_bid
              </th>
              <th class="text-left">
                eur_to_zar
              </th> <th class="text-left">
                arb(%)
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in cryptoData.results"
                :key="item.id"
            >
              <td>{{ convertDateTime(item.timestamp) }}</td>
              <td>{{ item.luno_zar_ask }}</td>
              <td>{{ item.luno_zar_bid }}</td>
              <td>{{ item.valr_zar_ask }}</td>
              <td>{{ item.valr_zar_bid }}</td>
              <td>{{ item.kraken_zar_ask }}</td>
              <td>{{ item.kraken_zar_bid }}</td>
              <td>{{ item.kraken_eur_ask }}</td>
              <td>{{ item.kraken_eur_bid }}</td>
              <td>{{ item.eur_to_zar }}</td>
              <td>{{ item.arb }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div class="d-flex justify-space-around">
          <v-btn @click="getPrevCryptoData" :disabled="cryptoData.previous===null" color="primary">Prev</v-btn>
          Total Pages: {{ cryptoData.count }}
          <v-btn @click="getNextCryptoData" :disabled="cryptoData.next===null" color="primary">Next</v-btn>
        </div>


      </div>

      <div v-else style="min-height: 80vh">
        <h1>You are not subscribed to our product please subscribe first.</h1>
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
    <Footer/>
  </div>
</template>
<script>

import LineChart from "@/components/LineChart";
import Footer from "@/components/Footer";
import {mapActions, mapGetters} from "vuex";

var moment = require('moment');
export default {
  name: "CryptoView",

  components: {
    Footer,
    LineChart

  },
  data() {
    return {

      cryptoData: {},
      arbs: [],
      timestamps: [],
      startingAmount: 100000,
      bankFee: 500,
      lastCryptoData: {},
      
      highestArbs: {},

      highestArbsLoadingState: false,


    }
  },
  mounted() {
    this.getLastCryptoData()
    this.getCryptoData()
    this.getHighestArbs()

  },
  computed: {
    ...mapGetters('payment', ['isSubscriber']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', [ 'getLoadingState']),

    amountRemaining() {
      return parseFloat(this.startingAmount) - parseFloat(this.bankFee);
    },

    amountInEuro() {
      const data = this.lastCryptoData[0] || {};
      return this.amountRemaining / data.eur_to_zar;
    },

    krakenBitcoinPrice() {
      const data = this.lastCryptoData[0] || {};
      return this.amountInEuro / data.kraken_eur_ask;
    },

    remainingBitcoinInLuno() {
      const BitcoinTransferFeeToLuno = 0.00025;
      return this.krakenBitcoinPrice - BitcoinTransferFeeToLuno
    },

    bitcoinRemainingAfterFee() {
      const LunoBitcoinSellingFee = .10 / 100;
      return this.remainingBitcoinInLuno - LunoBitcoinSellingFee;
    },
    lunoBitcoinBuyingValueInZAR() {
      const data = this.lastCryptoData[0] || {};
      return this.bitcoinRemainingAfterFee * data.luno_zar_ask;
    },

    avg() {
      return (this.lunoBitcoinBuyingValueInZAR + parseFloat(this.startingAmount)) / 2;
    },

    sub() {
      return this.lunoBitcoinBuyingValueInZAR - parseFloat(this.startingAmount)
    },

    arbCalculation: function () {


      return ((this.sub / this.avg) * 100).toPrecision(4);
    }
  },
  methods: {

    ...mapActions('loadingState', ['setLoadingState']),

    getCryptoData() {

      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'crypto/').then(res => {
        this.cryptoData = res.data;
        // console.log(this.cryptoData.results)
        console.log(this.cryptoData)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.setdata()
        this.setLoadingState(false)
      })
    },

    getPrevCryptoData() {

      if (this.cryptoData.previous === null) {
        return;
      }

      const url = this.cryptoData.previous;


      this.setLoadingState(true)
      this.$axios.get(url).then(res => {
        this.cryptoData = res.data;
        // console.log(this.cryptoData.results)
        // console.log(this.cryptoData)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.setdata()
        this.setLoadingState(false)
      })


    },

    getNextCryptoData() {
      if (this.cryptoData.next === null) {
        return;
      }

      // console.log(this.cryptoData.next)

      const url = this.cryptoData.next;


      this.setLoadingState(true)
      this.$axios.get(url).then(res => {
        this.cryptoData = res.data;
        // console.log(this.cryptoData.results)
        // console.log(this.cryptoData)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.setdata()
        this.setLoadingState(false)
      })


    },
    
    
    getHighestArbs(){
      // https://powerful-basin-71452.herokuapp.com/api/crypto/highest_arbs/
      this.highestArbsLoadingState = true;
      this.$axios.get(this.getBaseUrl + 'crypto/highest_arbs/').then( res => {
        this.highestArbs = res.data
      }).catch( err => {
        console.log(err)
      }).finally(() => {
        this.highestArbsLoadingState = false;
      })
    },

    getLastCryptoData() {
      this.$axios.get(this.getBaseUrl + 'crypto/last/').then(res => {
        this.lastCryptoData = res.data;
        // console.log(this.lastCryptoData)
        // console.log(this.cryptoData.results)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // this.setdata()
        // this.setLoadingState(false)
      })
    },

    convertDateTime(time) {
      return moment(time).format('MMMM Do YYYY, h:mm:ss a')
    },

    setdata() {
      this.arbs = [];
      this.timestamps = []
      this.cryptoData.results.forEach(item => {
        this.arbs.push(item.arb)
        this.timestamps.push(moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a'))

      })

    }


  }

}
</script>

<style>

.line-chart {
  height: 150px;
  /*margin:  150px auto;*/
}

</style>