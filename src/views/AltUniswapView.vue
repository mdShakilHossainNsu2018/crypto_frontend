<template>
  <div>
    <div v-if="isSubscriber && isSuperUser">

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
        <!--      LineChart Component-->
        <div style="width: 95vw;">
          <AltUniswapLineChart :key="linearChartUpdateKey"
                               v-if="timestamps.length > 0"
                               :arbETHData="arbETH"
                               :arbCOMPData="arbCOMP"
                               :arbUSDTData="arbUSDT"
                               :arbDAIData="arbDAI"
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


      <v-simple-table v-if="cryptoData.length !==0 && radioGroup===1" class="pa-9">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Time Stamp
            </th>
            <th class="text-left">
              Alt (ETH)
            </th>
            <th class="text-left">
              Uniswap (ETH)
            </th>
            <th class="text-left">
              Alt (COMP)
            </th>
            <th class="text-left">
              Uniswap (COMP)
            </th>
            <th class="text-left">
              Alt (USDT)
            </th>
            <th class="text-left">
              Uniswap (USDT)
            </th>
            <th class="text-left">
              Alt (DAI)
            </th>
            <th class="text-left">
              Uniswap (DAI)
            </th>
            <th class="text-left">
              ETH (%)
            </th>
            <th class="text-left">
              COMP (%)
            </th>

            <th class="text-left">
              USDT (%)
            </th>
            <th class="text-left">
              DAI (%)
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in cryptoData.results"
              :key="item.id"
          >
            <td>{{ convertDateTime(item.timestamp) }}</td>
            <td>{{ item.altETH }}</td>
            <td>{{ item.uniETH }}</td>
            <td>{{ item.altCOMP }}</td>
            <td>{{ item.uniCOMP }}</td>
            <td>{{ item.altUSDT }}</td>
            <td>{{ item.uniUSDT }}</td>
            <td>{{ item.altDAI }}</td>
            <td>{{ item.uniDAI }}</td>
            <td>{{ item.arbETH }}</td>
            <td>{{ item.arbCOMP }}</td>
            <td>{{ item.arbUSDT }}</td>
            <td>{{ item.arbDAI }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>


      <!--      usd-crypto-table-->
      <v-simple-table v-if="cryptoData.length !==0 && radioGroup===2" class="pa-9">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Time Stamp
            </th>
            <th class="text-left">
              usd_to_zar
            </th>
            <th class="text-left">
              usd_to_zar_sa
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

            <td>{{ item.usd_to_zar }}</td>
            <td>{{ item.usd_to_zar_sa }}</td>
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
          You have no access to this page. This page only for super user. Your are not a super user.
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
import Footer from "@/components/Footer";
import {mapActions, mapGetters} from "vuex";
import AltUniswapLineChart from "@/components/AltUniswapLineChart";

var moment = require('moment');

export default {
  name: "AltUniswapView",

  created() {
    document.title = "Arbitrage calculator - Ovex Broker";
  },

  components: {
    AltUniswapLineChart,
    Footer,
  },
  data() {
    return {
      itemSize: 1000,
      cryptoData: [],
      arbETH: [],
      arbCOMP: [],
      arbUSDT: [],
      arbDAI: [],
      timestamps: [],
      startingAmount: 100000,
      bankFee: 500,
      lastCryptoData: {},
      linearChartUpdateKey: 0,
      // highestArbs: {},
      highestArbsLoadingState: false,
      radioGroup: 1,
    }
  },
  mounted() {
    if (this.isSubscriber && this.isSuperUser) {
    //   this.getLastCryptoData()
    this.getCryptoData()
    // this.getHighestArbs()
    }
  },
  computed: {
    ...mapGetters('payment', ['isSubscriber']),
    ...mapGetters('baseUrl', ['getBaseUrl']),
    ...mapGetters('loadingState', ['getLoadingState']),
    ...mapGetters('user', ['isSuperUser']),
  },
  methods: {

    ...mapActions('user', ['setSnackBarData']),

    ...mapActions('loadingState', ['setLoadingState']),

    getCryptoData() {

      this.setLoadingState(true)
      this.$axios.get(this.getBaseUrl + 'altcoin_uniswap/?page_size=' + this.itemSize).then(res => {
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

    getLastCryptoData() {
      this.$axios.get(this.getBaseUrl + 'altcoin_uniswap/last/').then(res => {
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
      this.arbETH = []
      this.arbCOMP = []
      this.arbUSDT = []
      this.arbDAI = []
      this.timestamps = []
      this.cryptoData.results.forEach(item => {

        this.arbETH.push(item.arbETH)
        this.arbCOMP.push(item.arbCOMP)
        this.arbUSDT.push(item.arbUSDT)
        this.arbDAI.push(item.arbDAI)
        this.timestamps.push(moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a'))

      })
      this.linearChartUpdateKey += 1;

    }
  }
}
</script>

<style scoped>

</style>