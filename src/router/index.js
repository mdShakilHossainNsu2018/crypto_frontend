import Vue from 'vue'
import VueRouter from 'vue-router'
import CryptoView from "@/views/CryptoView";
import TopCryptoList from "@/views/TopCryptoList";
import Product from "@/views/Product";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Dashboard from "@/views/Dashboard";
import PaymentComplete from "@/views/PaymentComplete";
import store from "@/store";
import ResetPassword from "@/views/ResetPassword";
import ResetConfirm from "@/views/ResetConfirm";
import SignUpConfirm from "@/views/SignUpConfirm";
import ConfirmEmail from "@/views/ConfirmEmail";
import ResetEmailConfirm from "@/views/ResetEmailConfirm";

Vue.use(VueRouter)

let checkAuth = (to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.token) next({name: 'Login'})
  else next()
}

const routes = [

  {
    path: '/crypto',
    name: 'Crypto',
    component: CryptoView,
    beforeEnter: checkAuth,
  },
  {
    path: '/top-crypto-list',
    name: 'TopCryptoList',
    component: TopCryptoList
  },

  {
    path: '/payment-complete',
    name: 'PaymentComplete',
    component: PaymentComplete,
    beforeEnter: checkAuth,
  },

  {
    path: '/products',
    name: 'Product',
    component: Product,

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },

  {
    path: '/register',
    name: 'Register',
    component: Register,

  },

  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,

  },
  {
    path: '/password/reset/confirm/:uid/:token/',
    name: 'ResetConfirm',
    component: ResetConfirm,

  },

  {
    path: '/reset-email-confirm',
    name: 'ResetEmailConfirm',
    component: ResetEmailConfirm,

  },

  {
    path: '/signup-confirm',
    name: 'SignUpConfirm',
    component: SignUpConfirm,

  },

  {
    path: '/verify-email/:token',
    name: 'ConfirmEmail',
    component: ConfirmEmail,

  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkAuth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
