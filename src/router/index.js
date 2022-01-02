import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Statistics from '../views/Statistics.vue'
import Result from '../views/Result.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
]

const router = new VueRouter({
  routes
})

export default router
