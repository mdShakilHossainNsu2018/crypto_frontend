<template>
  <div class="home">

    <v-container fluid>
      <HomeHeader/>
      <SecondSection/>
      <ThirdSection/>
      <FourthSection/>
      <FifthSecion/>
      <LastSection/>
    </v-container>
    <Footer/>

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import HomeHeader from "@/components/Home/HomeHeader";
import LastSection from "@/components/Home/LastSection";
import SecondSection from "@/components/Home/SecondSection";
import ThirdSection from "@/components/Home/ThirdSection";
import FourthSection from "@/components/Home/FourthSection";
import FifthSecion from "@/components/Home/FifthSecion";

export default {
  name: 'Home',
  data() {
    return {
      socket: null
    }
  },
  components: {
    FifthSecion,
    FourthSection,
    ThirdSection,
    SecondSection,
    LastSection,
    HomeHeader,
    Footer,
  },

  mounted() {

  },

  created: function () {
    // http://164.90.135.73:8000/api/
    // this.socket = new WebSocket('wss://backend.ovexbroker.co.za/ws/chat/testroom/');
    // this.socket.onopen = function (event) {
    //   console.log("ws connected...")
    //
    //   console.log(event)
    // }
    //
    // this.socket.onmessage = function (e) {
    //   const data = JSON.parse(e.data);
    //   console.log(data)
    // }
    //
    // this.socket.onclose = function () {
    //   console.error('Chat socket closed unexpectedly');
    // }
  }
}
</script>
