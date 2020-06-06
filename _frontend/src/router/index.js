
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/about.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/blog.vue')
    },
    {
      path: '/illust',
      name: 'illust',
      component: () => import('@/views/illust.vue')
    },
    // default
    {
      path: '*',
      redirect: '/'
    }
  ]
})
