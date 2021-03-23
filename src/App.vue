<template>
  <v-app>
    <v-app-bar
        app
        height="81px"
    >
      <!--      hidden-xs-and-down-->
      <!--      hidden-sm-and-up-->
      <div class="d-flex align-center" style="margin-left: 10rem;">
        <a href="http://ovexbroker.co.za/">
          <v-img
              alt="Crypto Logo"
              class="mr-16"
              :width="258"
              src="http://ovexbroker.co.za/wp-content/uploads/2021/03/Asset-21blackee-300x73.png"
              transition="scale-transition"
          />
        </a>
      </div>


      <v-progress-linear
          :active="getLoadingState"
          :indeterminate="getLoadingState"
          absolute
          bottom
          color="red lighten-2"
      ></v-progress-linear>


      <div>

        <!--        http://ovexbroker.co.za/-->

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >

        <a :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" href="http://ovexbroker.co.za/">
          Home
        </a>
        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >

        <a :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" href="http://ovexbroker.co.za/start/how-to-start-2/">
          Start Arbitrage
        </a>
        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >

        <router-link :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" to="/crypto"
        >
          Arbitrage Calculator
        </router-link>
        </v-hover>
        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >
          <router-link :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" to="/products">
            Products
          </router-link>
        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >
          <a :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" href="http://ovexbroker.co.za/blog/">
            Blog
          </a>
        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >
          <router-link :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" to="/top-crypto-list">
            Crypto Ranks
          </router-link>
        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >

          <a
              :class="{ 'main-header-text': !hover,
                'main-header-box': hover }"
              href="http://ovexbroker.co.za/contact/"

          >
            Contact
          </a>

        </v-hover>

        <v-hover
            v-slot="{ hover }"
            open-delay="200"
        >
          <router-link :class="{ 'main-header-text': !hover,
                'main-header-box': hover }" text v-if="!isAuthenticated" to="/login"

          >Login
          </router-link>

        </v-hover>

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
            <v-list-item to="/dashboard">
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </v-app-bar>

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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');

.main-header-text {
  text-decoration: none;
  color: #5791fe !important;
  font-size: 18px !important;
  font-weight: 300 !important;
  padding: .5rem;
  /*padding-left: .2rem !important;*/
  /*padding-right: .2rem !important;*/
  /*padding-top: .5rem !important;*/
  margin-right: 1rem;
  font-family: 'Roboto Slab', serif !important;
}

.active .main-header-text:hover {
  color: black !important;
}

.main-header-box {
  text-decoration: none;
  color: #ff9a00 !important;
  font-size: 18px !important;
  font-weight: 300 !important;
  /*padding-left: .2rem !important;*/
  /*padding-right: .2rem !important;*/
  /*padding-top: .5rem !important;*/
  padding: .5rem;
  margin-right: 1rem;
  box-sizing: border-box !important;
  border: 5px solid #ff9a00 !important;
  font-family: 'Roboto Slab', serif !important;
  transition-timing-function: cubic-bezier(0.58, 0.3, 0.005, 1) !important;
  transition: 0.3s;
  transition-property: all;
  transition-duration: 0.3s;
  transition-delay: 0s;
}

.router-link-active{
  text-decoration: none;
  color: #ff9a00 !important;
  font-size: 18px !important;
  font-weight: 300 !important;
  padding: .5rem;
  /*padding-left: .2rem !important;*/
  /*padding-right: .2rem !important;*/
  /*padding-top: .5rem !important;*/
  margin-right: 1rem;
  box-sizing: border-box !important;
  border: 5px solid #ff9a00 !important;
  font-family: 'Roboto Slab', serif !important;
}

</style>

