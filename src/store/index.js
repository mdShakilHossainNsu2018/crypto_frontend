import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './user';
import blog from './blog';
import payment from './payment';
import telegram from './telegram';
import baseUrl from './baseUrl';
import loadingState from './loadingState';


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user,
    blog,
    payment,
    telegram,
    baseUrl,
    loadingState,
  }
})

export default store
