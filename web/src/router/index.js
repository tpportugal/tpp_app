import Vue from 'vue'
import Router from 'vue-router'
import PWelcome from '@/components/pages/PWelcome'
import PRoutes from '@/components/pages/PRoutes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: PWelcome
    },
    {
      path: '/routes',
      name: 'Routes',
      component: PRoutes
    }
  ]
})
