import { createRouter, createWebHistory } from 'vue-router'
import BracketSetup from '@/components/BracketSetup.vue'
import BracketView from '@/views/BracketView.vue'
import { useBracketStore } from '@/store/bracketStore'

const routes = [
  { path: '/', name:"Home", component: BracketView },
  { path: '/setup', name:"Setup" , component: BracketSetup },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useBracketStore()
  const isConfigured = store.isBracketConfigured

  console.log('[Route Guard] to:', to.path, '| isBracketConfigured:', isConfigured)

  if (!isConfigured && to.path !== '/setup') {
    return next('/setup')
  }

  next()
})


export default router
