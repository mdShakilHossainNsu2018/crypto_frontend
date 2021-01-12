<template>
  <div class="home">
  <h1>Home page</h1>


  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      socket: null
    }
  },
  components: {

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
