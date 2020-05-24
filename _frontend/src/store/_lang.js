import Vue from 'vue'
import en from './dict/dict_en'
import zh from './dict/dict_zh'
import ja from './dict/dict_ja'

export default {
  state: {
    is: 'zh',
    fallback: 'en',
    dict: {
      en, zh, ja
    }
  },
  getters: {
    currentLang(state) {
      const {is:settedLang, fallback} = state;
      return state.dict[settedLang]? settedLang : fallback;
    },
    dict: (state) => ({key, fill}) => {
      const {is:settedLang, fallback, dict} = state;
      const lang = settedLang || fallback;
      const entry = dict[lang][key] || dict[fallback][key] || false;
      return (typeof entry === 'function')? entry(fill) : entry;
    },
  },
  mutations: {
    setLang(state, lang) {
      Vue.set(state, 'is', lang);
    }
  }
};