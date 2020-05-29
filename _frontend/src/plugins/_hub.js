import Vue from 'vue'

Vue.use({
  install(Vue) {
    Vue.prototype.$EH = new Vue({})
  }
})