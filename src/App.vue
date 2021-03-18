<template>
  <v-app>
    <v-container>
    <v-app-bar
        app
    >
      <!--      hidden-xs-and-down-->
      <!--      hidden-sm-and-up-->
      <div class="d-flex align-center">
        <a href="http://ovexbroker.co.za/">
          <v-img
              alt="Crypto Logo"
              class="shrink mr-2"
              contain
              :src="require('./assets/10.png')"
              transition="scale-transition"
              width="10rem"
          />
        </a>
      </div>

      <v-spacer></v-spacer>

      <v-progress-linear
          :active="getLoadingState"
          :indeterminate="getLoadingState"
          absolute
          bottom
          color="red lighten-2"
      ></v-progress-linear>


      <v-toolbar-items>

<!--        http://ovexbroker.co.za/-->

        <v-btn  href="http://ovexbroker.co.za/" text>
          Home
        </v-btn>

<!--        http://ovexbroker.co.za/start/how-to-start-2/-->

        <v-btn  href="http://ovexbroker.co.za/start/how-to-start-2/" text>
          Start
        </v-btn>

<!--        {id: 3, name: "Arbitrage Calculator", to: '/crypto'},-->

        <v-btn  to="/crypto"  text>
          Arbitrage Calculator
        </v-btn>

<!--        {id: 4, name: "Products", to: '/products'},-->
        <v-btn  to="/products"  text>
          Products
        </v-btn>

<!--        {id: 5, name: "Blog", to: '/blog'},-->
        <v-btn  href="http://ovexbroker.co.za/blog/" text>
          Blog
        </v-btn>

<!--        {id: 7, name: "Rank", to: '/top-crypto-list'},-->
        <v-btn  to="/top-crypto-list" text>
          Rank
        </v-btn>
<!--        http://ovexbroker.co.za/contact/-->

        <v-btn  href="http://ovexbroker.co.za/contact/" text>
          Contact
        </v-btn>

        <v-btn text v-if="!isAuthenticated" to="/login">Login</v-btn>

        <v-menu offset-y v-if="isAuthenticated">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                icon
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!--            <v-list-item-->
            <!--                v-for="(item, index) in items"-->
            <!--                :key="index"-->
            <!--            >-->
            <!--              <v-list-item-title>{{ item.title }}</v-list-item-title>-->
            <!--            </v-list-item>-->
            <v-list-item to="/dashboard">
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

    </v-app-bar>

    </v-container>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'App',

  mounted() {
    this.init()
  },

  components: {},

  data: () => ({

    navItems: [
      // {id: 1, name: "Home", to: 'http://ovexbroker.co.za/'},
      // {id: 2, name: "Start", to: '/start'},
      // {id: 3, name: "Arbitrage Calculator", to: '/crypto'},
      // {id: 4, name: "Products", to: '/products'},
      // {id: 5, name: "Blog", to: '/blog'},
      // {id: 6, name: "Careers", to: '/careers'},
      // {id: 7, name: "Rank", to: '/top-crypto-list'},
      {id: 8, name: "Contact", to: '/contact'},
    ]

    //
  }),

  methods: {
    ...mapActions('user', ['init', 'logout']),
  },

  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters('loadingState', ['getLoadingState']),
  },
};
</script>
