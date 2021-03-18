<template>
    <div>

      <v-container>
        <h1>TopCryptoList</h1>
        <v-card class="text-center">
            <v-row>
                <v-col>
                    <h2>Logo</h2>
                </v-col>
                <v-col><h2>Name</h2></v-col>
                <v-col><h2>Market Capital</h2></v-col>
                <v-col><h2>Price</h2></v-col>
                <v-col><h2>Rank</h2></v-col>
            </v-row>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <div v-for="item in cryptoData" :key="item.id">
                <v-row>
                    <v-col>
                        <v-list-item-avatar>
                            <v-img :src="item.image"></v-img>
                        </v-list-item-avatar>
                    </v-col>
                    <v-col>
                        <h3>{{item.name}}</h3>
                    </v-col>
                    <v-col>
                        <h3>{{item.market_cap}}</h3>
                    </v-col>
                    <v-col>
                        <h3>{{item.price}}</h3>
                    </v-col>
                    <v-col>
                        <h3>{{item.rank}}</h3>
                    </v-col>

                </v-row>
                <v-divider></v-divider>
            </div>


            <!--            <div v-for="item in cryptoData" :key="item.id">-->
            <!--               -->
            <!--                <h3>{{item.name}}</h3>-->


            <!--            </div>-->
        </v-card>

      <!--    ...mapGetters('loadingState', [ 'getLoadingState']),-->

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

      </v-container>

      <Footer/>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import Footer from "@/components/Footer";

    export default {
        name: "TopCryptoList",
      components: {Footer},
      created() {
            this.getCryptoData()
            this.interval = setInterval(this.getCryptoData, 1000 * 60 * 5)
        },

        destroyed() {
            clearInterval(this.interval)
        },

        data() {
            return {
                cryptoData: [],
                interval: null,
            }
        },

        computed: {
            ...mapGetters('baseUrl', ['getBaseUrl']),
          ...mapGetters('loadingState', [ 'getLoadingState']),
            // shortedCryptoData: function(){
            //
            //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            //     return this.cryptoData.sort((a, b) => {
            //         return parseInt(a.rate) - parseInt(b.rate);
            //     })
            // }
        },

        methods: {

          ...mapActions('loadingState', ['setLoadingState']),
          ...mapActions('user', ['setSnackBarData']),

            shortData() {
                this.cryptoData = this.cryptoData.sort((a, b) => {
                    return a.rank - b.rank;
                })
            },
            getCryptoData() {
                this.setLoadingState(true)
                this.$axios.get(this.getBaseUrl + 'positions/').then(res => {

                    this.cryptoData = res.data


                    // console.log(this.cryptoData.sort((a, b) => { return parseInt(a.rate) - parseInt(b.rate)}))
                }).catch(err => {
                    console.log(err)
                  if (err.response){
                    this.setSnackBarData(err.response)
                    this.setSnackBarState(true)
                  }
                }).finally(() => {

                    this.shortData()
                  this.setLoadingState(false);
                })
            }
        }
    }
</script>

<style scoped>

</style>