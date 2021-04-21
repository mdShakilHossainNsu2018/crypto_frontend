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
              label="24 Hours"
              :value="228"
              @click="getCryptoData"
          ></v-radio>
          <v-radio
              label="72 Hours"
              :value="864"
              @click="getCryptoData"
          ></v-radio>
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
                               :arbBATData="arbBAT"
                               :alt_valr_doge_arbData="alt_valr_doge_arb"
                               :alt_valr_trx_arbData="alt_valr_trx_arb"
                               :alt_valr_xrp_arbData="alt_valr_xrp_arb"
                               :alt_valr_ada_arbData="alt_valr_ada_arb"
                               :alt_valr_bat_arbData="alt_valr_bat_arb"
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


      <v-simple-table v-if="cryptoData.length !==0 && radioGroup===1" fixed-header height="600px" class="pa-9">
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

<!--            arbBAT: [],-->
            <th class="text-left">
              Alt (BAT)
            </th>
            <th class="text-left">
              Uniswap (BAT)
            </th>

            <!--            alt_valr_doge_arb: [],-->
            <th class="text-left">
              Alt (DOGE)
            </th>
            <th class="text-left">
              Valr (DOGE)
            </th>
            <!--            alt_valr_trx_arb: [],-->

            <th class="text-left">
              Alt (TRX)
            </th>
            <th class="text-left">
              Valr (TRX)
            </th>
            <!--            alt_valr_xrp_arb: [],-->

            <th class="text-left">
              Alt (XRP)
            </th>
            <th class="text-left">
              Valr (XRP)
            </th>
            <!--            alt_valr_ada_arb: [],-->
            <th class="text-left">
              Alt (ADA)
            </th>
            <th class="text-left">
              Valr (ADA)
            </th>
            <!--            alt_valr_bat_arb: [],-->
            <th class="text-left">
              Alt (BAT)
            </th>
            <th class="text-left">
              Valr (BAT)
            </th>

            <th class="text-left">
              ETH(%)
            </th>
            <th class="text-left">
              COMP(%)
            </th>

            <th class="text-left">
              USDT(%)
            </th>
            <th class="text-left">
              DAI(%)
            </th>

<!--            arbBAT: [],-->
            <th class="text-left">
              BAT(%)
            </th>
<!--            alt_valr_doge_arb: [],-->
            <th class="text-left">
              alt valr DOGE(%)
            </th>
<!--            alt_valr_trx_arb: [],-->
            <th class="text-left">
              alt valr TRX(%)
            </th>
<!--            alt_valr_xrp_arb: [],-->
            <th class="text-left">
              alt valr XRP(%)
            </th>
<!--            alt_valr_ada_arb: [],-->
            <th class="text-left">
              alt valr ADA(%)
            </th>
<!--            alt_valr_bat_arb: [],-->
            <th class="text-left">
              alt valr BAT(%)
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
<!--            added-->

<!--            arbBAT: [],-->
            <td>{{ item.altBAT }}</td>
            <td>{{ item.uniBAT }}</td>
<!--            alt_valr_doge_arb: [],-->
            <td>{{ item.alt_doge }}</td>
            <td>{{ item.valr_doge }}</td>
<!--            alt_valr_trx_arb: [],-->
            <td>{{ item.alt_trx }}</td>
            <td>{{ item.valr_trx }}</td>
<!--            alt_valr_xrp_arb: [],-->
            <td>{{ item.alt_xrp }}</td>
            <td>{{ item.valr_xrp }}</td>
<!--            alt_valr_ada_arb: [],-->
            <td>{{ item.alt_ada }}</td>
            <td>{{ item.valr_ada }}</td>
<!--            alt_valr_bat_arb: [],-->
            <td>{{ item.altBAT }}</td>
            <td>{{ item.valr_bat }}</td>
            <td :class="{red: item.altETH < item.uniETH, green: item.altETH > item.uniETH}">{{ item.arbETH }}</td>
            <td :class="{red: item.altCOMP < item.uniCOMP, green: item.altCOMP > item.uniCOMP}">{{ item.arbCOMP }}</td>
            <td :class="{red: item.altUSDT < item.uniUSDT, green: item.altUSDT > item.uniUSDT}">{{ item.arbUSDT }}</td>
            <td :class="{red: item.altDAI < item.uniDAI, green: item.altDAI > item.uniDAI}">{{ item.arbDAI }}</td>

<!--            arbBAT: [],-->
            <td :class="{red: item.altBAT < item.uniBAT, green: item.altBAT > item.uniBAT}">{{ item.arbBAT }}</td>
<!--            alt_valr_doge_arb: [],-->
            <td :class="{red: item.alt_doge < item.valr_doge, green: item.alt_doge > item.valr_doge}">{{ item.alt_valr_doge_arb }}</td>
<!--            alt_valr_trx_arb: [],-->
            <td :class="{red: item.alt_trx < item.valr_trx, green: item.alt_trx > item.valr_trx}">{{ item.alt_valr_trx_arb }}</td>
<!--            alt_valr_xrp_arb: [],-->
            <td :class="{red: item.alt_xrp < item.valr_xrp, green: item.alt_xrp > item.valr_xrp}">{{ item.alt_valr_xrp_arb }}</td>
<!--            alt_valr_ada_arb: [],-->
            <td :class="{red: item.alt_ada < item.valr_ada, green: item.alt_ada > item.valr_ada}">{{ item.alt_valr_ada_arb }}</td>
<!--            alt_valr_bat_arb: [],-->
            <td :class="{red: item.altBAT < item.valr_bat, green: item.altBAT > item.valr_bat}">{{ item.alt_valr_bat_arb }}</td>
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
      itemSize: 228,
      cryptoData: [],
      arbETH: [],
      arbCOMP: [],
      arbUSDT: [],
      arbDAI: [],
      arbBAT: [],
      alt_valr_doge_arb: [],
      alt_valr_trx_arb: [],
      alt_valr_xrp_arb: [],
      alt_valr_ada_arb: [],
      alt_valr_bat_arb: [],
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

        this.arbBAT.push(item.arbBAT)
        this.alt_valr_doge_arb.push(item.alt_valr_doge_arb)
        this.alt_valr_trx_arb.push(item.alt_valr_trx_arb)
        this.alt_valr_xrp_arb.push(item.alt_valr_xrp_arb)
        this.alt_valr_ada_arb.push(item.alt_valr_ada_arb)
        this.alt_valr_bat_arb.push(item.alt_valr_bat_arb)

        this.timestamps.push(moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a'))

      })
      this.linearChartUpdateKey += 1;

    }
  }
}
</script>

<style scoped>
/*.red-color{*/
/*  background-color: #dc5f5f;*/
/*}*/

/*.green{*/
/*  background-color: #447e44;*/

/*}*/

</style>