import Vue from 'vue'
import axios from 'axios'

// User相關的 api
const shopAPI = axios.create();
shopAPI.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
shopAPI.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
// console.log('api base url', process.env.VUE_APP_API_BASE_URL);
// console.log('api base url', shopAPI.defaults.baseURL);

//
// https://api.tales.tw/fetch/meta/v1/
const getShopList = () => shopAPI.get(`/getShopList`).then(res => res.data);

self.$api = {
  getShopList,
};

Vue.use({
  install(Vue) {
    Vue.prototype.$api = self.$api;
  }
})