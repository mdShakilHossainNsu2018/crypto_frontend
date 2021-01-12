<template>
    <div>
        <LineChart v-if="timestamps.length > 1 && arbs.length > 1" :arbsData="arbs" :timestampsData="timestamps" />

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
        data () {
            return {

                cryptoData: [],
                arbs: [],
                timestamps: [],


            }
        },
        mounted () {
        this.getCryptoData()

        },
        methods: {

            getCryptoData() {
                this.$axios.get('http://localhost:8000/api/crypto/').then(res => {
                    this.cryptoData = res.data
                    console.log(this.cryptoData)
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.setdata()
                })
            },

            setdata(){
                this.cryptoData.forEach(item => {
                    this.arbs.push(item.arb)
                    this.timestamps.push( moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a'))
                    // this.timestamps.push(item.timestamp)
                })

                console.log(this.arbs)
                console.log(this.timestamps)
            }


        }

    }
</script>

<style >

    .line-chart{
        height: 150px;
        /*margin:  150px auto;*/
    }

</style>