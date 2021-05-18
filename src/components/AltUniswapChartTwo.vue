<template>
  <div>
    <canvas width="500" height="250" id="myChartTwo"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "AltUniswapChartTwo",

  props: {
    btc_percentageData: Array,
    eth_percentageData: Array,
    ada_percentageData: Array,
    usdt_percentageData: Array,
    comp_percentageData: Array,
    dai_percentageData: Array,
    trx_percentageData: Array,
    xrp_percentageData: Array,
    bat_percentageData: Array,
    doge_percentageData: Array,
    timestampsData: Array,

  },
  mounted() {
    let ctxTwo = document.getElementById('myChartTwo').getContext('2d');
    new Chart(ctxTwo, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.timestampsData.reverse(),
        datasets: [
          //   btc_percentage: Array,
          {
            label: 'BTC(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ec407a',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#ec407a',
            data: this.btc_percentageData.reverse(),

          },
          // eth_percentage: Array,
          {
            label: 'ETH(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#42a5f5',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#42a5f5',
            data: this.eth_percentageData.reverse(),

          },
          // ada_percentage: Array,
          {
            label: 'ADA(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#26a69a',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#26a69a',
            data: this.ada_percentageData.reverse(),

          },
          // usdt_percentage: Array,
          {
            label: 'USDT(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ff5722',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#ff5722',
            data: this.usdt_percentageData.reverse(),

          },
          // comp_percentage: Array,
          {
            label: 'COMP(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#1a237e',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#1a237e',
            data: this.comp_percentageData.reverse(),

          },
          // dai_percentage: Array,
          {
            label: 'DAI(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#00600f',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#00600f',
            data: this.dai_percentageData.reverse(),

          },
          // trx_percentage: Array,
          {
            label: 'TRX(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#aa00ff',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#aa00ff',
            data: this.trx_percentageData.reverse(),

          },
          // xrp_percentage: Array,
          {
            label: 'XRP(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#808000',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#808000',
            data: this.xrp_percentageData.reverse(),

          },
          // bat_percentage: Array,
          {
            label: 'BAT(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#4b2c20',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#4b2c20',
            data: this.bat_percentageData.reverse(),

          },
          // doge_percentage: Array,
          {
            label: 'DOGE(%)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#fdd835',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#fdd835',
            data: this.doge_percentageData.reverse(),

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