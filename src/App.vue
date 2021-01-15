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
        <v-btn v-for="item in navItems" :to="item.to" :key="item.id" text>
          {{ item.name }}
        </v-btn>

        <v-btn v-if="!isAuthenticated" to="/login">Login</v-btn>

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
      {id: 1, name: "Home", to: '/'},
      {id: 2, name: "Start", to: '/start'},
      {id: 3, name: "Arbitrage Calculator", to: '/crypto'},
      {id: 4, name: "Products", to: '/products'},
      {id: 5, name: "Blog", to: '/blog'},
      {id: 6, name: "Careers", to: '/careers'},
      {id: 7, name: "Contact", to: '/contact'},
    ]

    //
  }),

  methods: {
    ...mapActions('user', ['init', 'logout']),
  },

  computed: {
    ...mapGetters('user', ['isAuthenticated']),
  },
};
</script>
