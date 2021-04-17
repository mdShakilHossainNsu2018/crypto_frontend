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
          }]
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