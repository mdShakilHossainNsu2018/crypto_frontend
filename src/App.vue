<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
<!--      hidden-xs-and-down-->
<!--      hidden-sm-and-up-->
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
                  alt="Crypto Logo"
                  class="shrink mr-2"
                  contain
                  :src="require('./assets/11.png')"
                  transition="scale-transition"
                  width="10rem"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-for="item in navItems" :to="item.to" :key="item.id"  text>
          {{item.name}}
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({

    navItems: [
      {id:1, name: "Home", to: '/'},
      {id:2, name: "Start", to: '/start'},
      {id:3, name: "Arbitrage Calculator", to: '/crypto'},
      {id:4, name: "Products", to: '/products'},
      {id:5, name: "Blog", to: '/blog'},
      {id:6, name: "Careers", to: '/careers'},
      {id:7, name: "Contact", to: '/contact'},
    ]

    //
  }),
};
</script>
