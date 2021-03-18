import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CryptoView from "@/views/CryptoView";
import TopCryptoList from "@/views/TopCryptoList";
import Product from "@/views/Product";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Dashboard from "@/views/Dashboard";
import Blog from "@/views/Blog";
import BlogDetail from "@/views/BlogDetail";
import Start from "@/views/Start";
import Contact from "@/views/Contact";
import PaymentComplete from "@/views/PaymentComplete";
import store from "@/store";

Vue.use(VueRouter)

let checkAuth = (to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.token) next({name: 'Login'})
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/start',
    name: 'Start',
    component: Start,

  },

  {
    path: '/contact',
    name: 'Contact',
    component: Contact,

  },

  {
    path: '/crypto',
    name: 'Crypto',
    component: CryptoView,
    beforeEnter: checkAuth,
  },

  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    beforeEnter: checkAuth,
  },

  {
    path: '/blog/:blogId/:blogTitle',
    name: 'BlogDetail',
    component: BlogDetail,
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
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: checkAuth,
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
