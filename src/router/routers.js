import index from '@/pages/index/index.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: index
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/about/about.vue')
  }
]