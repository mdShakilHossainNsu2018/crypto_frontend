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
                               :alt_kraken_doge_arbData="alt_kraken_doge_arb"

                               :alt_kraken_comp_arbData="alt_kraken_comp_arb"
                               :alt_kraken_dai_arbData="alt_kraken_dai_arb"
                               :alt_kraken_usdt_arbData="alt_kraken_usdt_arb"
                               :alt_kraken_bat_arbData="alt_kraken_bat_arb"
                               :kraken_valr_doge_arbData="kraken_valr_doge_arb"
                               :kraken_valr_trx_arbData="kraken_valr_trx_arb"
                               :kraken_valr_ada_arbData="kraken_valr_ada_arb"
                               :kraken_valr_xlm_arbData="kraken_valr_xlm_arb"
                               :kraken_valr_bat_arbData="kraken_valr_bat_arb"
                               :kraken_valr_comp_arbData="kraken_valr_comp_arb"
                               :kraken_valr_dai_arbData="kraken_valr_dai_arb"
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


      <v-simple-table dense>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              BUYING PRICES
            </th>
            <th class="text-left">
              ETH
            </th>
            <th class="text-left">
              ADA - Cardano
            </th>
            <th class="text-left">
              USDT - Tether
            </th>
            <th class="text-left">
              COMP
            </th>
            <th class="text-left">
              Dai
            </th>
            <th class="text-left">
              TRX - TRON
            </th>
            <th class="text-left">
              XRP - Ripple
            </th>
            <th class="text-left">
              BAT
            </th>
            <th class="text-left">
              DOGE
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
          >
            <td>Altcoin Trader</td>
            <td>{{cryptoData.results[0].altETH}}</td>

            <td>{{cryptoData.results[0].alt_ada}}</td>
            <td>{{cryptoData.results[0].altUSDT}}</td>
            <td>{{cryptoData.results[0].altCOMP}}</td>
            <td>{{cryptoData.results[0].altDAI}}</td>
            <td>{{cryptoData.results[0].alt_trx}}</td>
            <td>{{cryptoData.results[0].alt_xrp}}</td>
            <td>{{cryptoData.results[0].altBAT}}</td>
            <td>{{cryptoData.results[0].alt_doge}}</td>
          </tr>
          <tr
          >
            <td>Valr</td>
            <td>{{cryptoData.results[0].valr_eth}}</td>

            <td>{{cryptoData.results[0].valr_ada}}</td>
            <td></td>
            <td>{{cryptoData.results[0].valr_comp}}</td>
            <td>{{cryptoData.results[0].valr_dai}}</td>
            <td>{{cryptoData.results[0].valr_trx}}</td>
            <td>{{cryptoData.results[0].valr_xrp}}</td>
            <td>{{cryptoData.results[0].valr_bat}}</td>
            <td>{{cryptoData.results[0].valr_doge}}</td>
          </tr>

          <tr
          >
            <td>Uniswap</td>
            <td>{{cryptoData.results[0].uniETH}}</td>

            <td></td>
            <td>{{cryptoData.results[0].uniUSDT}}</td>
            <td>{{cryptoData.results[0].uniCOMP}}</td>
            <td>{{cryptoData.results[0].uniDAI}}</td>
            <td></td>
            <td></td>
            <td>{{cryptoData.results[0].uniBAT}}</td>
            <td></td>
          </tr>

          <tr>
            <td>Kraken</td>
            <td></td>

            <td>{{cryptoData.results[0].kraken_ada}}</td>
            <td>{{cryptoData.results[0].kraken_usdt}}</td>
            <td>{{cryptoData.results[0].kraken_comp}}</td>
            <td>{{cryptoData.results[0].kraken_dai}}</td>
            <td>{{cryptoData.results[0].kraken_trx}}</td>
            <td></td>
            <td>{{cryptoData.results[0].kraken_bat}}</td>
            <td>{{cryptoData.results[0].kraken_doge}}</td>
          </tr>

          </tbody>
        </template>
      </v-simple-table>


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
<!--            29 april added -->
            <th class="text-left">
              Valr (ETH)
            </th>

            <th class="text-left">
              Alt (COMP)
            </th>
            <th class="text-left">
              Uniswap (COMP)
            </th>
<!--            29 april added-->
            <th class="text-left">
              Valr (COMP)
            </th>

            <th class="text-left">
              Kraken (COMP)
            </th>

            <th class="text-left">
              Alt (USDT)
            </th>
            <th class="text-left">
              Uniswap (USDT)
            </th>
<!--            29 april added-->
            <th class="text-left">
              Kraken (USDT)
            </th>
            <th class="text-left">
              Alt (DAI)
            </th>
            <th class="text-left">
              Uniswap (DAI)
            </th>

<!--            29 april added -->
            <th class="text-left">
              Valr (DAI)
            </th>
            <th class="text-left">
              Kraken (DAI)
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
            <th class="text-left">
              Kraken (DOGE)
            </th>
            <!--            alt_valr_trx_arb: [],-->

            <th class="text-left">
              Alt (TRX)
            </th>
            <th class="text-left">
              Valr (TRX)
            </th>
<!--            29 added-->
            <th class="text-left">
              Kraken (TRX)
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
<!--            29 april added-->
            <th class="text-left">
              Kraken (ADA)
            </th>
            <!--            alt_valr_bat_arb: [],-->
            <th class="text-left">
              Alt (BAT)
            </th>
            <th class="text-left">
              Valr (BAT)
            </th>
<!--           29 april added -->
            <th class="text-left">
              Kraken (BAT)
            </th>

<!--            29 april-->
            <th class="text-left">
              Alt (XLM)
            </th>
            <th class="text-left">
              Valr (XLM)
            </th>
            <th class="text-left">
              Kraken (XLM)
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
            <th class="text-left">
              alt kraken DOGE(%)
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

            <th class="text-left">
              Alt vs Kraken COMP(%)
            </th>
            <th class="text-left">
              Alt vs Kraken DAI(%)
            </th>
            <th class="text-left">
              Alt vs Kraken USDT(%)
            </th>
            <th class="text-left">
              Alt vs Kraken BAT(%)
            </th>
            <th class="text-left">
              Kraken vs Valr DOGE(%)
            </th>
            <th class="text-left">
              Kraken vs Valr TRX(%)
            </th>
            <th class="text-left">
              Kraken vs Valr ADA(%)
            </th>
            <th class="text-left">
              Kraken vs valr XLM(%)
            </th>
            <th class="text-left">
              Kraken vs Valr BAT(%)
            </th>
            <th class="text-left">
              Kraken vs Valr COMP(%)
            </th>
            <th class="text-left">
              Kraken vs Valr DAI(%)
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
<!--           29 april added -->
            <td>{{ item.valr_eth }}</td>


            <td>{{ item.altCOMP }}</td>
            <td>{{ item.uniCOMP }}</td>
<!--            29 april added -->
            <td>{{ item.valr_comp }}</td>
            <td>{{ item.kraken_comp }}</td>

            <td>{{ item.altUSDT }}</td>
            <td>{{ item.uniUSDT }}</td>
            <td>{{ item.kraken_usdt }}</td>

<!--            DAI-->
            <td>{{ item.altDAI }}</td>
            <td>{{ item.uniDAI }}</td>
<!--            29 april added -->
            <td>{{ item.valr_dai }}</td>
            <td>{{ item.kraken_dai }}</td>

            <!--            added-->

            <!--            arbBAT: [],-->
            <td>{{ item.altBAT }}</td>
            <td>{{ item.uniBAT }}</td>
            <!--            alt_valr_doge_arb: [],-->
            <td>{{ item.alt_doge }}</td>
            <td>{{ item.valr_doge }}</td>
            <td>{{ item.kraken_doge }}</td>
            <!--            alt_valr_trx_arb: [],-->
            <td>{{ item.alt_trx }}</td>
            <td>{{ item.valr_trx }}</td>
<!--            29 april added -->
            <td>{{ item.kraken_trx }}</td>
            <!--            alt_valr_xrp_arb: [],-->
            <td>{{ item.alt_xrp }}</td>
            <td>{{ item.valr_xrp }}</td>
            <!--            alt_valr_ada_arb: [],-->
            <td>{{ item.alt_ada }}</td>
            <td>{{ item.valr_ada }}</td>
<!--            29 april added -->
            <td>{{ item.kraken_ada }}</td>
            <!--            alt_valr_bat_arb: [],-->
            <td>{{ item.altBAT }}</td>
            <td>{{ item.valr_bat }}</td>
<!--            29 april added -->
            <td>{{ item.kraken_bat }}</td>

<!--            29 april-->
            <td>{{item.alt_xlm}}</td>
            <td>{{item.valr_xlm}}</td>
            <td>{{item.kraken_xlm}}</td>

            <td :class="{red: item.altETH < item.uniETH, green: item.altETH > item.uniETH}">{{ item.arbETH }}</td>
            <td :class="{red: item.altCOMP < item.uniCOMP, green: item.altCOMP > item.uniCOMP}">{{ item.arbCOMP }}</td>
            <td :class="{red: item.altUSDT < item.uniUSDT, green: item.altUSDT > item.uniUSDT}">{{ item.arbUSDT }}</td>
            <td :class="{red: item.altDAI < item.uniDAI, green: item.altDAI > item.uniDAI}">{{ item.arbDAI }}</td>

            <!--            arbBAT: [],-->
            <td :class="{red: item.altBAT < item.uniBAT, green: item.altBAT > item.uniBAT}">{{ item.arbBAT }}</td>
            <!--            alt_valr_doge_arb: [],-->
            <td :class="{red: item.alt_doge < item.valr_doge, green: item.alt_doge > item.valr_doge}">
              {{ item.alt_valr_doge_arb }}
            </td>
            <!--            alt_kraken-->
            <td :class="{red: item.alt_doge < item.kraken_doge, green: item.alt_doge > item.kraken_doge}">
              {{ item.alt_kraken_doge_arb }}
            </td>
            <!--            alt_valr_trx_arb: [],-->
            <td :class="{red: item.alt_trx < item.valr_trx, green: item.alt_trx > item.valr_trx}">
              {{ item.alt_valr_trx_arb }}
            </td>
            <!--            alt_valr_xrp_arb: [],-->
            <td :class="{red: item.alt_xrp < item.valr_xrp, green: item.alt_xrp > item.valr_xrp}">
              {{ item.alt_valr_xrp_arb }}
            </td>
            <!--            alt_valr_ada_arb: [],-->
            <td :class="{red: item.alt_ada < item.valr_ada, green: item.alt_ada > item.valr_ada}">
              {{ item.alt_valr_ada_arb }}
            </td>
            <!--            alt_valr_bat_arb: [],-->
            <td :class="{red: item.altBAT < item.valr_bat, green: item.altBAT > item.valr_bat}">{{
                item.alt_valr_bat_arb
              }}
            </td>

<!--            29 april added-->
<!--            alt_kraken_comp_arb: [],-->
            <td :class="{red: item.altCOMP < item.kraken_comp, green: item.altCOMP > item.kraken_comp}">{{
                item.alt_kraken_comp_arb
              }}
            </td>
<!--            alt_kraken_dai_arb: [],-->
            <td :class="{red: item.altDAI < item.kraken_dai, green: item.altDAI > item.kraken_dai}">{{
                item.alt_kraken_dai_arb
              }}
            </td>
<!--            alt_kraken_usdt_arb: [],-->
            <td :class="{red: item.altUSDT < item.kraken_usdt, green: item.altUSDT > item.kraken_usdt}">{{
                item.alt_kraken_usdt_arb
              }}
            </td>
<!--            alt_kraken_bat_arb: [],-->
            <td :class="{red: item.altBAT < item.kraken_bat, green: item.altBAT > item.kraken_bat}">{{
                item.alt_kraken_bat_arb
              }}
            </td>
<!--            kraken_valr_doge_arb: [],-->
            <td :class="{red: item.kraken_bat < item.valr_bat, green: item.kraken_bat > item.valr_bat}">{{
                item.kraken_valr_doge_arb
              }}
            </td>
<!--            kraken_valr_trx_arb: [],-->
            <td :class="{red: item.kraken_trx < item.valr_trx, green: item.kraken_trx > item.valr_trx}">{{
                item.kraken_valr_trx_arb
              }}
            </td>
<!--            kraken_valr_ada_arb: [],-->
            <td :class="{red: item.kraken_ada < item.valr_ada, green: item.kraken_ada > item.valr_ada}">{{
                item.kraken_valr_ada_arb
              }}
            </td>
<!--            kraken_valr_xlm_arb: [],-->
            <td :class="{red: item.kraken_xlm < item.valr_xlm, green: item.kraken_xlm > item.valr_xlm}">{{
                item.kraken_valr_xlm_arb
              }}
            </td>
<!--            kraken_valr_bat_arb: [],-->
            <td :class="{red: item.kraken_bat < item.valr_bat, green: item.kraken_bat > item.valr_bat}">{{
                item.kraken_valr_bat_arb
              }}
            </td>
<!--            kraken_valr_comp_arb: [],-->
            <td :class="{red: item.kraken_comp < item.valr_comp, green: item.kraken_comp > item.valr_comp}">{{
                item.kraken_valr_comp_arb
              }}
            </td>
<!--            kraken_valr_dai_arb: [],-->
            <td :class="{red: item.kraken_dai < item.valr_dai, green: item.kraken_dai > item.valr_dai}">{{
                item.kraken_valr_dai_arb
              }}
            </td>
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
      alt_kraken_doge_arb: [],
      // 28 april
      alt_kraken_comp_arb: [],
      alt_kraken_dai_arb: [],
      alt_kraken_usdt_arb: [],
      alt_kraken_bat_arb: [],
      kraken_valr_doge_arb: [],
      kraken_valr_trx_arb: [],
      kraken_valr_ada_arb: [],
      kraken_valr_xlm_arb: [],
      kraken_valr_bat_arb: [],
      kraken_valr_comp_arb: [],
      kraken_valr_dai_arb: [],

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
        this.alt_kraken_doge_arb.push(item.alt_kraken_doge_arb)
        // added on 28 april
        this.alt_kraken_comp_arb.push(item.alt_kraken_comp_arb)
        this.alt_kraken_dai_arb.push(item.alt_kraken_dai_arb)
        this.alt_kraken_usdt_arb.push(item.alt_kraken_usdt_arb)
        this.alt_kraken_bat_arb.push(item.alt_kraken_bat_arb)
        this.kraken_valr_doge_arb.push(item.kraken_valr_doge_arb)
        this.kraken_valr_trx_arb.push(item.kraken_valr_trx_arb)
        this.kraken_valr_ada_arb.push(item.kraken_valr_ada_arb)
        this.kraken_valr_xlm_arb.push(item.kraken_valr_xlm_arb)
        this.kraken_valr_bat_arb.push(item.kraken_valr_bat_arb)
        this.kraken_valr_comp_arb.push(item.kraken_valr_comp_arb)
        this.kraken_valr_dai_arb.push(item.kraken_valr_dai_arb)

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