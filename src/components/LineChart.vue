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
                    labels: this.timestampsData,
                    datasets: [{
                        label: 'arb(%) dataset',
                        backgroundColor: '#0B0238',
                        // borderColor: 'rgb(255, 99, 132)',
                        borderColor: '#0B0238',
                        data: this.arbsData
                    }]
                },

                // Configuration options go here
                options: {}
            });
        }
    }
</script>

<style scoped>

</style>