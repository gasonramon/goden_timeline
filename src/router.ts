import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './/views/Home.vue'
import DeSchepping from './views/DeSchepping.vue'
import DeGodenTijd from './views/DeGodenTijd.vue'
import DeHeldenTijd from './views/DeHeldenTijd.vue'
import Victory from './views/Victory.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/schepping', component: DeSchepping},
  { path: '/godentijd', component: DeGodenTijd},
  { path: '/heldentijd', component: DeHeldenTijd},
  { path: '/victory', component: Victory},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router