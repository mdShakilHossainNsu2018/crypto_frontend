<template>
  <div>
    <canvas width="500" height="250" id="ethGasLineChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "EthGasLineChart",
  props: {
    safeGasPriceData: Array,
    proposeGasPriceData: Array,
    fastGasPriceData: Array,
    ethGasTimestampData: Array,
  },
  mounted() {
    let ethGasctx = document.getElementById('ethGasLineChart').getContext('2d');
    new Chart(ethGasctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: this.ethGasTimestampData.reverse(),
        datasets: [
        // safeGasPriceData: Array,
          {
            label: 'safeGasPrice (gwei)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ec407a',
            pointRadius: 1,
            pointHoverRadius: 1,
            borderColor: '#ec407a',
            data: this.safeGasPriceData.reverse(),

          },
          // proposeGasPriceData: Array,
          {
            label: 'proposeGasPrice (gwei)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#42a5f5',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#42a5f5',
            data: this.proposeGasPriceData.reverse(),

          },
          // fastGasPriceData: Array,
          {
            label: 'fastGasPrice (gwei)',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#26a69a',
            pointRadius: 1,
            pointHoverRadius: 1,
            // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
            // borderColor: 'rgb(255, 99, 132)',
            borderColor: '#26a69a',
            data: this.fastGasPriceData.reverse(),

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
              labelString: 'ETH Gas Price (gwei)'
            },
            ticks: {
              // min: 50,
              // max: 100,
              callback: function (value) {
                return value + " gwei"
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