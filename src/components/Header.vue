<template>
  <div class="main-nav">
    <div
        class="navbar  elementor-kit-5 " style="height:81px !important;">
      <header>
        <div class="elementor-941"
        >

          <section
              class="d-flex justify-space-around ">


            <a
                href="http://ovexbroker.co.za/">
              <v-img class="hfe-site-logo-img mt-2"


                   :width="258"
                   src="../assets/uploads/2021/03/Asset-21blackee-300x73.png"
                   alt="Asset 21blackee"/>
            </a>
            <div
                class="elementor-element elementor-element-4a985d1"

                data-widget_type="navigation-menu.default">
              <div class="elementor-widget-container" style="margin-top: 1.5rem !important;">
                <div
                    class=" hfe-layout-horizontal hfe-nav-menu-layout horizontal hfe-pointer__framed hfe-animation__corners"
                    data-layout="horizontal">
                  <nav class="hfe-nav-menu__layout-horizontal ">
                    <ul class="hfe-nav-menu">

                      <!--                    <li id="menu-item-910"-->
                      <!--                        class="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">-->
                      <!--                      <a href="contact/index.html" class="hfe-menu-item">Contact</a>-->
                      <!--                    </li>-->

                      <li
                          class="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                        <a href="http://ovexbroker.co.za/" class="hfe-menu-item">Home</a></li>
                      <li id="menu-item-914"
                          class="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                        <a href="http://ovexbroker.co.za/start/how-to-start-2/"
                           class="hfe-menu-item">Start Arbitrage</a></li>

                      <li
                          :class="[currentPage.includes('/crypto')? activeClass : '']"
                          class="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu"

                      >
                        <router-link to="/crypto"
                                     class="hfe-menu-item">Arbitrage Calculator
                        </router-link>
                      </li>

                      <li id="menu-item-1088"
                          :class="[currentPage.includes('/products')? activeClass : '']"
                          class="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
                        <router-link to="/products"
                                     class="hfe-menu-item">Products
                        </router-link>
                      </li>
                      <li id="menu-item-909"
                          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children parent hfe-has-submenu hfe-creative-menu">
                        <div class="hfe-has-submenu-container"><a href="http://ovexbroker.co.za/blog/"
                                                                  class="hfe-menu-item">Blog<span
                            class='hfe-menu-toggle sub-arrow hfe-menu-child-0'><i
                            class='fa'></i></span></a></div>
                        <ul class="sub-menu">
                          <li id="menu-item-920"
                              class="menu-item menu-item-type-post_type menu-item-object-post hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/ovex-arbitrage-reviews/"
                               class="hfe-sub-menu-item">Ovex Arbitrage Reviews</a>
                          </li>
                          <li id="menu-item-919"
                              class="menu-item menu-item-type-post_type menu-item-object-post hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/crypto-arbitrage-south-africa/"
                               class="hfe-sub-menu-item">Crypto Arbitrage South
                              Africa</a></li>
                          <li id="menu-item-918"
                              class="menu-item menu-item-type-post_type menu-item-object-post hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/ovex-arbitrage-service-explained/"
                               class="hfe-sub-menu-item">Ovex Arbitrage Service
                              Explained</a></li>
                          <li id="menu-item-917"
                              class="menu-item menu-item-type-post_type menu-item-object-post hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/ovex-arbitrage-calculator/"
                               class="hfe-sub-menu-item">Ovex Arbitrage
                              Calculator</a></li>
                          <li id="menu-item-911"
                              class="menu-item menu-item-type-post_type menu-item-object-page hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/fia-increase-service/"
                               class="hfe-sub-menu-item">FIA Increase Service</a>
                          </li>
                          <li id="menu-item-916"
                              class="menu-item menu-item-type-post_type menu-item-object-post hfe-creative-menu">
                            <a href="http://ovexbroker.co.za/getting-started-with-ovex-arbitrage/"
                               class="hfe-sub-menu-item">Getting Started with Ovex
                              Arbitrage</a></li>
                        </ul>
                      </li>
                      <li id="menu-item-1087"
                          :class="[currentPage.includes('top-crypto-list')? activeClass : '']"
                          class="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
                        <router-link to="/top-crypto-list"
                                     class="hfe-menu-item"
                        >Crypto Ranks
                        </router-link>
                      </li>
                      <li id="menu-item-910"
                          class="menu-item menu-item-type-post_type menu-item-object-page parent hfe-creative-menu">
                        <a href="http://ovexbroker.co.za/contact/" class="hfe-menu-item">Contact</a>
                      </li>
                      <li id="menu-item-1089"
                          v-if="!isAuthenticated"
                          :class="[currentPage.includes('/login')? activeClass : '']"
                          class="menu-item menu-item-type-custom menu-item-object-custom parent hfe-creative-menu">
                        <router-link to="/login"
                                     class="hfe-menu-item">Login
                        </router-link>
                      </li>

                      <!--                    <li>-->

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
                      <!--                    </li>-->
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

          </section>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Header",
  data() {
    return {
      activeClass: 'current-menu-item'
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    currentPage() {
      return this.$route.path;
    }
  },

  methods: {
    ...mapActions('user', ['init', 'logout']),
  }
}
</script>

<style scoped lang="scss">

.main-nav::v-deep {
  //@import '../assets/uploads/elementor/css/post-549d3.css?ver=1615916426';
  @import '../assets/uploads/elementor/css/post-549d3.scss';

  //@import '../assets/header-footer-elementor/inc/widgets-css/frontend00e2.css?ver=1.5.7';

  @import '../assets/header-footer-elementor/inc/widgets-css/frontend00e2';
  //@import "../assets/uploads/elementor/css/_post-941ab52.css?ver=1616075739";

  @import "../assets/uploads/elementor/css/post-941ab52";

  //@import "../assets/themes/hello-elementor/style.min254d.css?ver=2.3.1";

  @import "../assets/themes/hello-elementor/style.min254d";
}

/*@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap');*/
/*<link rel='stylesheet' id='elementor-frontend-css'*/
/*href='wp-content/plugins/elementor/assets/css/frontend.minaeb9.css?ver=3.1.4' type='text/css' media='all' />*/
/*@import '../assets/elementor/assets/css/frontend.minaeb9.css?ver=3.1.4';*/
/*                                                                                                           <link rel='stylesheet' id='elementor-post-5-css'*/
/*href='wp-content/uploads/elementor/css/post-549d3.css?ver=1615916426' type='text/css' media='all' />*/

/*@import '../assets/uploads/elementor/css/post-549d3.css?ver=1615916426';*/

/* <link rel='stylesheet' id='hfe-widgets-style-css'*/
/*href='wp-content/plugins/header-footer-elementor/inc/widgets-css/frontend00e2.css?ver=1.5.7' type='text/css'*/
/*media='all' />*/

/*@import '../assets/header-footer-elementor/inc/widgets-css/frontend00e2.css?ver=1.5.7';*/

/*<link rel='stylesheet' id='elementor-post-941-css'*/
/*href='wp-content/uploads/elementor/css/_post-941ab52.css?ver=1616075739' type='text/css' media='all' />*/

/*@import "../assets/uploads/elementor/css/_post-941ab52.css?ver=1616075739";*/
/*
<link rel='stylesheet' id='hello-elementor-css' href='wp-content/themes/hello-elementor/style.min254d.css?ver=2.3.1'*/
/*type='text/css' media='all' />*/

/*@import "../assets/themes/hello-elementor/style.min254d.css?ver=2.3.1";*/


/*                             <link rel='stylesheet' id='google-fonts-1-css'*/
/*href='https://fonts.googleapis.com/css?family=Roboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CWork+Sans%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&amp;ver=5.7'*/
/*type='text/css' media='all' />*/


.navbar {
  /*overflow: hidden;*/
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  width: 100%;

  z-index: 1000;
}

.v-btn {
  background-color: #f5f5f5 !important;
  border: none !important;
}


</style>