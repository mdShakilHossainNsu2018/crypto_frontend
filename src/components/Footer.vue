<template>

  <div>
    <!--    error message-->

    <v-snackbar
        v-model="getSnackbarState"
        :multi-line="true"
    >
      {{ getSnackbarData }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

<!--    error message section end-->


    <v-footer
        class="footer"
        padless
    >


      <v-row
          justify="center"
          no-gutters
      >
        <v-col>
          <v-img max-width="200" class="ml-3 my-10" :src="require('../assets/4.png')"></v-img>
        </v-col>
        <v-col class="my-7" v-for="item in footerItem" :key="item.id">
          <h1 class="ml-4" style="color:white;">{{ item.category }}</h1>


          <div v-if="item.category !== 'COMMUNITY'">
            <v-btn

                v-for="subItem in item.child"
                :key="subItem.id"
                color="white"
                text
                rounded
                class="my-2"
            >
              {{ subItem.name }}
            </v-btn>
          </div>

          <div v-if="item.category === 'COMMUNITY'">
            <v-btn

                v-for="subItem in item.child"
                :key="subItem.id"
                color="white"
                text
                rounded
                target="_blank"
                :href="subItem.to"
                class="my-2"
            >
              {{ subItem.name }}
            </v-btn>
          </div>

          <!--                <router-link v-for="subItem in item.child" :key="subItem.id" :to="subItem.to">-->
          <!--                    <h3 style="color:white;"  >{{subItem.name}}</h3>-->

          <!--                </router-link>-->
        </v-col>
        <!--            <v-col cols="12" sm="4"></v-col>-->
        <!--            <v-col cols="12" sm="4"></v-col>-->
        <!--            <v-col cols="12" sm="4"></v-col>-->
      </v-row>
    </v-footer>

  </div>
</template>

<script>

// import {mapGetters} from 'vuex';

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Footer",

  data: () => ({

    footerItem: [
      {
        id: 1, category: 'COMPANY',
        child: [
          {id: 1, name: 'About Us', to: '/about'},
          {id: 2, name: 'Careers', to: '/career'},
        ]
      },
      {
        id: 2, category: 'SERVICES',
        child: [
          // todo: to not set yet.
          {id: 1, name: 'Ovex Broker', to: '/about'},
          {id: 2, name: 'Arbitrage Messages', to: '/career'},
          {id: 3, name: '10M Allowance Applications', to: '/career'},
          {id: 4, name: 'Buying Crypto', to: '/career'},
        ]
      },
      {
        id: 3, category: 'LEGAL',
        child: [
          // todo: to not set yet.
          {id: 1, name: 'Terms and Conditions', to: '/about'},
          {id: 2, name: 'Arbitrage Service', to: '/career'},
          {id: 3, name: 'Interest Account', to: '/career'},
        ]
      },
      {
        id: 4, category: 'COMMUNITY',
        child: [
          {id: 1, name: 'Twitter', to: 'https://twitter.com/BrokerOvex'},
          {id: 2, name: 'Telegram', to: 'https://t.me/ovexbroker'},
          {id: 3, name: 'Facebook', to: 'https://www.facebook.com/groups/2522292798079906'},
        ]
      },
    ]
  }),

  methods: {
    ...mapActions('user', ['setSnackBarData']),
  },

  computed: {
    ...mapGetters('user', ['getSnackbarData']),

    getSnackbarState: {
      get() {
        return this.$store.getters["user/getSnackbarState"]
      },
      set(value) {

        this.$store.dispatch('user/setSnackBarState', value)
      }
    },
  }

}
</script>

<style scoped>
.footer {
  background-color: transparent;
  background-image: linear-gradient(180deg, rgba(35, 47, 73, 1) 0%, rgb(39 117 243) 100%);
  }
</style>