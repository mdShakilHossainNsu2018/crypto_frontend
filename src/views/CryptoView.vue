<template>
  <div>
    <v-container>
      <h1>Arbitrage Calculator</h1>

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

      <LineChart v-if="timestamps.length > 1 && arbs.length > 1" :arbsData="arbs" :timestampsData="timestamps"/>
    </v-container>
    <Footer/>
  </div>
</template>
<script>

import LineChart from "@/components/LineChart";
import Footer from "@/components/Footer";

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

    }
  },
  mounted() {
    this.getCryptoData()

  },
  computed: {
    amountRemaining(){
      return parseFloat(this.startingAmount) - parseFloat(this.bankFee);
    },

    amountInEuro(){
      const data = this.cryptoData[0] || {};
      return this.amountRemaining / data.eur_to_zar;
    },

    krakenBitcoinPrice(){
      const data = this.cryptoData[0] || {};
      return this.amountInEuro / data.kraken_eur_ask;
    },

    remainingBitcoinInLuno(){
      const BitcoinTransferFeeToLuno = 0.00025;
      return this.krakenBitcoinPrice - BitcoinTransferFeeToLuno
    },

    bitcoinRemainingAfterFee(){
      const LunoBitcoinSellingFee = .10 / 100;
      return this.remainingBitcoinInLuno - LunoBitcoinSellingFee;
    },
    lunoBitcoinBuyingValueInZAR(){
      const data = this.cryptoData[0] || {};
      return this.bitcoinRemainingAfterFee * data.luno_zar_ask;
    },

    avg(){
      return (this.lunoBitcoinBuyingValueInZAR + parseFloat(this.startingAmount))/2;
    },

    sub(){
      return this.lunoBitcoinBuyingValueInZAR - parseFloat(this.startingAmount)
    },

    arbCalculation: function() {
      

      return ((this.sub / this.avg) * 100).toPrecision(4);
    }
  },
  methods: {

    getCryptoData() {
      this.$axios.get('http://localhost:8000/api/crypto/').then(res => {
        this.cryptoData = res.data
        // console.log(this.cryptoData)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.setdata()
      })
    },

    setdata() {
      this.cryptoData.forEach(item => {
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