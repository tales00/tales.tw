
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
      meta: {
        isIntro: true,
        sectionName: '',
      },
      component: () => import('@/views/profile.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {}
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      meta: { },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        scrollToViewTop: true,
        sectionName: 'profile',
      },
    },
    {
      path: '/murmur',
      name: 'murmur',
      meta: {
        scrollToViewTop: true,
        sectionName: 'murmur',
      },
      component: () => import('@/views/murmur.vue')
    },
    {
      path: '/illust',
      name: 'illust',
      meta: {
        scrollToViewTop: true,
        sectionName: 'illust',
      },
      component: () => import('@/views/illust.vue')
    },
    {
      path: '/illust/pixiv/:illustId',
      name: 'showPixivIllust',
      meta: {
        sectionName: 'illust',
      },
      component: () => import('@/views/illust.vue')
    },
    // default
    {
      path: '*',
      redirect: '/'
    }
  ]
})
