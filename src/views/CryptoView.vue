<template>
  <div>
    <div v-if="isSubscriber">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field type="number" v-model="startingAmount" label="Enter allocation amount"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field type="number" v-model="arbCalculation" disabled
                          label="current arbitrage percent"></v-text-field>
          </v-col>

          <v-col>
            <v-text-field type="number" v-model="profit" disabled
                          label="Profit"></v-text-field>
          </v-col>
        </v-row>
        <v-row
            no-gutters
            style="height: 150px;"
        >
          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  Updated at: {{ convertTime(lastCryptoData[0].timestamp) }}
                </v-card-title>
                <v-card-text>
                  <h1>{{ parseFloat(lastCryptoData[0].arb).toPrecision(2) }} %</h1>
                </v-card-text>
              </div>

            </v-card>
          </v-col>

          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  <h1>{{ parseFloat(highestArbs.daily_highest.arb__max).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>
            </v-card>
          </v-col>


          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  7 days average
                </v-card-title>
                <v-card-text>
                  <h1>{{ parseFloat(highestArbs.weakly_avg.arb__avg).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>

            </v-card>
          </v-col>


          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  monthly average
                </v-card-title>
                <v-card-text>
                  <h1>{{ parseFloat(highestArbs.monthly_avg.arb__avg).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>

            </v-card>
          </v-col>
        </v-row>


        <v-row
            no-gutters
            style="height: 150px;"
        >

          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  <h1>{{ parseFloat(highestArbs.weakly_highest.arb__max).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
          <v-col
          >
            <v-card

                class="mx-1"
                min-height="135"
                elevation="10"
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
                  <h1>{{ parseFloat(highestArbs.monthly_highest.arb__max).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>
            </v-card>
          </v-col>

          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  <h1>{{ parseFloat(highestArbs.ninety_days_highest.arb__max).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>
            </v-card>
          </v-col>

          <v-col
          >
            <v-card
                class="mx-1"
                min-height="135"
                elevation="10"
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
                  <h1>{{ parseFloat(highestArbs.yearly_highest.arb__max).toPrecision(3) }} %</h1>
                </v-card-text>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="d-flex justify-end px-8 ">

        <v-radio-group
            v-model="itemSize"
            row
            class="align-self-center mr-16"
        >
          <v-radio
              label="1 week"
              :value="2016"
              @click="getCryptoData"
          ></v-radio>
          <v-radio
              label="1 month"
              :value="8640"
              @click="getCryptoData"
          ></v-radio>

          <v-radio
              label="3 months"
              :value="25920"
              @click="getCryptoData"
          ></v-radio>

          <v-radio
              label="6 months"
              :value="51840"
              @click="getCryptoData"
          ></v-radio>
          <v-radio
              label="1 year"
              :value="103680"
              @click="getCryptoData"
          ></v-radio>
        </v-radio-group>
<!--        <v-text-field-->
<!--            single-line-->
<!--            outlined-->
<!--            type="number"-->
<!--            v-model="itemSize"-->
<!--            label="data size"-->
<!--            class="shrink mt-6 align-self-center"-->
<!--        >-->
<!--        </v-text-field>-->

<!--        <v-tooltip bottom>-->
<!--          <template v-slot:activator="{ on, attrs }">-->
<!--            <v-icon-->
<!--                x-large-->
<!--                class="mr-16 ml-3 align-self-center"-->
<!--                @click="getCryptoData"-->
<!--                color="primary"-->
<!--                dark-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--            >-->
<!--              mdi-rotate-left-->
<!--            </v-icon>-->
<!--          </template>-->
<!--          <span>refresh</span>-->
<!--        </v-tooltip>-->

      </div>

      <div class="d-flex justify-space-between align-center">

        <v-btn @click="getNextCryptoData"
               :disabled="cryptoData.next===null"
               icon height="500"
               class="ml-2"
               color="primary"
               width="50">
          <v-icon size="100">mdi-chevron-left</v-icon>
        </v-btn>

        <div style="width: 95vw;">
          <LineChart :key="linearChartUpdateKey"
                     v-if="timestamps.length > 0 && arbs.length > 0" :arbsData="arbs"
                     :timestampsData="timestamps"/>
        </div>
        <v-btn
            @click="getPrevCryptoData"
            :disabled="cryptoData.previous===null"
            icon
            height="500"
            class="mr-2"
            color="primary"
            width="50">
          <v-icon size="100">mdi-chevron-right</v-icon>
        </v-btn>
      </div>


      <v-simple-table v-if="cryptoData.length !==0" class="pa-9">
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
            </th>
            <th class="text-left">
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
    </div>

    <div v-else style="height:50vh">
      <v-container>
        <v-alert
            outlined
            type="warning"
            prominent
            border="left"
        >
          You have no access to this page. Because you are not subscribed to our product. Please subscribe first.
          <br>
          Visit our products page
          <router-link to="/products">click here.</router-link>
        </v-alert>
      </v-container>
    </div>

    <Footer class="mt-6"/>
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
    LineChart,

  },
  data() {
    return {
      itemSize: 1000,
      cryptoData: [],
      arbs: [],
      timestamps: [],
      startingAmount: 100000,
      bankFee: 500,
      lastCryptoData: {},
      linearChartUpdateKey: 0,
      highestArbs: {},
      highestArbsLoadingState: false,
    }
  },
  mounted() {
    if (this.isSubscriber) {
      this.getLastCryptoData()
      this.getCryptoData()
      this.getHighestArbs()
    }
  },
  computed: {
    ...mapGetters('payment', ['isSubscriber']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', ['getLoadingState']),

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
    },

    profit() {
      return (this.arbCalculation * this.startingAmount);
    }
  },
  methods: {

    ...mapActions('user', ['setSnackBarData']),

    ...mapActions('loadingState', ['setLoadingState']),

    getCryptoData() {

      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'crypto/?page_size=' + this.itemSize).then(res => {
        this.cryptoData = res.data;
        this.setdata()
      }).catch(err => {

        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }

        console.log(err)
      }).finally(() => {
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
        this.setdata()
      }).catch(err => {

        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }
        console.log(err)
      }).finally(() => {
        this.setLoadingState(false)
      })


    },

    getNextCryptoData() {
      if (this.cryptoData.next === null) {
        return;
      }
      const url = this.cryptoData.next;
      this.setLoadingState(true)
      this.$axios.get(url).then(res => {
        this.cryptoData = res.data;
        this.setdata()
      }).catch(err => {

        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }
        console.log(err)
      }).finally(() => {
        this.setLoadingState(false)
      })
    },


    getHighestArbs() {
      // https://powerful-basin-71452.herokuapp.com/api/crypto/highest_arbs/
      this.highestArbsLoadingState = true;
      this.$axios.get(this.getBaseUrl + 'crypto/highest_arbs/').then(res => {
        this.highestArbs = res.data
      }).catch(err => {
        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }
        console.log(err)
      }).finally(() => {
        this.highestArbsLoadingState = false;
      })
    },

    getLastCryptoData() {
      this.$axios.get(this.getBaseUrl + 'crypto/last/').then(res => {
        this.lastCryptoData = res.data;
      }).catch(err => {
        if (err.response) {
          this.setSnackBarData(err.response.data)
          this.setSnackBarState(true)
        }
        console.log(err)
      }).finally(() => {
      })
    },

    convertDateTime(time) {
      return moment(time).format('MMMM Do YYYY, h:mm:ss a')
    },

    convertTime(time) {
      return moment(time).format('h:mm:ss a')
    },

    setdata() {
      this.arbs = [];
      this.timestamps = []
      this.cryptoData.results.forEach(item => {
        this.arbs.push(item.arb)
        this.timestamps.push(moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a'))

      })
      this.linearChartUpdateKey += 1;

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