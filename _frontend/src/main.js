import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'

// css
// import 'sanitize.css';
import './assets/css/tailwind.css'
import '@/scss/base.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
