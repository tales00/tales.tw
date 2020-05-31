/* eslint-disable */
import Vue from 'vue'
const browser_pattern = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  puffin: /\bPuffin/i,
  miui: /\bMiuiBrowser\//i,
  instagram: /\bInstagram/i,
  chrome: /Chrome\/[.0-9]*( Mobile)?/,
  kinza: /Kinza/,
  safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
  ie: /IEMobile|MSIEMobile/,
  firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
  edge: /Edge/,
  edgeMobile: /EdgA/,
};

const IAB_rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari\/)', 'Android.*(wv|\.0\.0\.0)'].join('|');
const IAB_apps = ['messenger','facebook','twitter','line','wechat','instagram'];

const _env = {
  install: function(Vue) {
    Vue.prototype.$env = {
      ua: navigator.userAgent,      
      get browser() { return Object.keys(browser_pattern).filter(brsName=>this.ua.match(browser_pattern[brsName])).join(',') || 'undetected' ; },
      get isStandalone() { return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://'); },
      get isTouchAble() { return ( 'ontouchstart' in window ) || ( (navigator.maxTouchPoints||navigator.msMaxTouchPoints) > 0 ); },
      get isIOS() { return /(iPad|iPhone)/i.test(this.ua) || false ; },
      get isAndroid() { return /android/i.test(this.ua) || false ; },
      get isMobile() { return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false ; },
      get isDesktop() { return !this.isMobile; },
      get isWV() { return new RegExp(`(${IAB_rules})`, 'ig').test(this.ua) || false },
      get isIAB() { return new RegExp(`(${IAB_apps.join('|')})`).test(this.browser); },
      get isHybrid() { return !this.isStandalone && (this.isWV || this.IAB); },
      get isOnline() { return navigator.onLine; },
  
      whenOnline(fn, options={passive:true}) { window.addEventListener('online', fn, options); },
      whenOffline(fn, options={passive:true}) { window.addEventListener('offline', fn, options); },
    }
  }
}

Vue.use(_env)