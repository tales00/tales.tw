import Vue from 'vue'
import Vuex from 'vuex'
// import lang from './_lang'
import plurk from './_plurk'
import pixiv from './_pixiv'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    plurk,
    pixiv
  }
})
