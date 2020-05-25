import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})
Vue.use(Router)
export default router