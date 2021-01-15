<template>
  <div class="home">
  <HomeHeader/>
mid
    <Footer/>

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import HomeHeader from "@/components/HomeHeader";

export default {
  name: 'Home',
  data(){
    return{
      socket: null
    }
  },
  components: {
    HomeHeader,
  Footer,
  },

  mounted() {

  },

  created: function(){
    this.socket = new WebSocket('ws://localhost:8000/ws/chat/testroom/');
    this.socket.onopen = function(event){
      console.log("ws connected...")

      console.log(event)
    }

    this.socket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      console.log(data)
    }

    this.socket.onclose = function() {
      console.error('Chat socket closed unexpectedly');
    }
  }
}
</script>
