<template>
  <div>
    <canvas width="500" height="250" id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "LineChart",
  props: {
    arbsData: Array,
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
          label: 'arb(%) dataset',
          backgroundColor: 'transparent',
          pointBackgroundColor: '#0B0238',
          // backgroundImage: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%),
          // borderColor: 'rgb(255, 99, 132)',
          borderColor: '#0B0238',
          data: this.arbsData.reverse(),
          responsive: true,

        }]
      },

      // Configuration options go here
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Timestamps'
            },
            ticks: {
              // beginAtZero: true,
              // stepSize: 0.5, //<-- set this
              // sampleSize:10,
              // forces step size to be 5 units
              // stepSize: 10 // <----- This prop sets the stepSize
            }

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
              callback: function (value){
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