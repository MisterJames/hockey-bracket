import { createRouter, createWebHistory } from 'vue-router'
import BracketSetup from '@/components/BracketSetup.vue'
import Dashboard from '@/views/Dashboard.vue';
import PrintView from '@/views/PrintView.vue';
import LeaderbodPrintView from '@/views/LeaderBoardPrintView.vue';
import { useBracketStore } from '@/store/bracketStore'
import ParticipantPicks from '@/views/ParticipantPicks.vue'; // we'll create this

const routes = [
  { path: '/', name: 'Home', component: Dashboard },
  { path: '/setup', name: 'Setup', component: BracketSetup },
  { path: '/picks/:id', name: 'Picks', component: ParticipantPicks, props: true },
  { path: '/leaderboard', name: 'Leaderboard', component: LeaderbodPrintView },
  { path: '/print', name: 'Print', component: PrintView },
];


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
