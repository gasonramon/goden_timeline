import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'
import DeSchepping from './components/DeSchepping.vue'
import DeGodenTijd from './components/DeGodenTijd.vue'
import DeHeldenTijd from './components/DeHeldenTijd.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/schepping', component: DeSchepping},
  { path: '/godentijd', component: DeGodenTijd},
  { path: '/heldentijd', component: DeHeldenTijd}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router