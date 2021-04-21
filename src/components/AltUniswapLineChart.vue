<template>
  <div>
    <canvas width="500" height="250" id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "AltUniswapLineChart",

  props: {
    arbETHData: Array,
    arbCOMPData: Array,
    arbUSDTData: Array,
    arbDAIData: Array,
    timestampsData: Array,
    arbBATData: Array,
    alt_valr_doge_arbData: Array,
    alt_valr_trx_arbData: Array,
    alt_valr_xrp_arbData: Array,
    alt_valr_ada_arbData: Array,
    alt_valr_bat_arbData: Array,
    alt_kraken_doge_arbData: Array,

  },
  mounted() {
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.timestampsData.reverse(),
        datasets: [{
          label: 'ETH(%) dataset',
          backgroundColor: 'transparent',
          pointBackgroundColor: '#ec407a',
          pointRadius: 1,
          pointHoverRadius: 1,
          // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
          // borderColor: 'rgb(255, 99, 132)',
          borderColor: '#ec407a',
          data: this.arbETHData.reverse(),

        },
          {
            label: 'COMP(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#42a5f5',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#42a5f5',
            data: this.arbCOMPData.reverse(),

          },

          {
            label: 'DAI(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#26a69a',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#26a69a',
            data: this.arbDAIData.reverse(),

          },

          {
            label: 'USDT(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ff5722',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#ff5722',
            data: this.arbUSDTData.reverse(),
          },

            // added

        //   arbBAT: [],
          {
            label: 'BAT(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#fdd835',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#fdd835',
            data: this.arbBATData.reverse(),
          },
          // alt_valr_doge_arb: [],
          {
            label: 'alt valr DOGE(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#4b2c20',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#4b2c20',
            data: this.alt_valr_doge_arbData.reverse(),
          },
          {
            label: 'alt kraken DOGE(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#808000',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#808000',
            data: this.alt_kraken_doge_arbData.reverse(),
          },
          // alt_valr_trx_arb: [],
          {
            label: 'alt valr TRX(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#aa00ff',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#aa00ff',
            data: this.alt_valr_trx_arbData.reverse(),
          },
          // alt_valr_xrp_arb: [],
          {
            label: 'alt valr XRP(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#00600f',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#00600f',
            data: this.alt_valr_xrp_arbData.reverse(),
          },
          // alt_valr_ada_arb: [],
          {
            label: 'alt valr ADA(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#1a237e',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#1a237e',
            data: this.alt_valr_ada_arbData.reverse(),
          },
          // alt_valr_bat_arb: [],
          {
            label: 'alt valr BAT(%) dataset',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#84ffff',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#84ffff',
            data: this.alt_valr_bat_arbData.reverse(),
          },

          ]
      },

      // Configuration options go here
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Timestamps'
            },

          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Percentage of arbitrages'
            },
            ticks: {
              // min: 50,
              // max: 100,
              callback: function (value) {
                return value + "%"
              },

              // forces step size to be 5 units
              // stepSize: 2 // <----- This prop sets the stepSize
            }
          }]
        },

      }
    });
  }
}
</script>

<style scoped>

</style>