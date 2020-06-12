
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
      path: '/profile',
      name: 'profile',
      meta: {
        scrollToViewTop: true,
        sectionName: 'profile',
      },
      component: () => import('@/views/profile.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      meta: {
        scrollToViewTop: true,
        sectionName: 'blog',
      },
      component: () => import('@/views/blog.vue')
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
